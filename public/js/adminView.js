//###################################################################//
// GRABBING ITEMS FROM LOCAL STORAGE AND SETTING THEM AS VARIABLES

var profilePicture = localStorage.getItem("profilePicture")
var localStorageFirstName = localStorage.getItem("firstName")
var localStorageLastName = localStorage.getItem("lastName")
var FacebookID = localStorage.getItem("uid")
//###################################################################//


//###################################################################//
//CODE TO ADD THE CARD LIST OF FAMILY MEMBERS

$.get("/api/users/" + FacebookID, function (data) {
  var familyID = data.FamilyUuid
  console.log("FAMILY ID IS:", familyID)

  // Nested GET request to get the list of family members
  $.get("/api/families/" + familyID, function (data) {
    console.log(data)

    for (i = 0; i < data.length; i++) {

      var div = $("<div>")
      div.addClass("col-md-6")
      var card = $("<div>")
      card.addClass("card")
      var cardBody = $("<div>")
      cardBody.addClass("card-body text-center")
      var img = $("<img>")
      img.attr("src", data[i].picture_url)
      img.addClass("first-image family-image-dashboard text-center")


      cardBody.append(img)
      var cardBodyText = $("<h3>" + data[i].name + "</h3>)")
      cardBodyText.addClass("text-center name-title")

      cardBody.append(cardBodyText)

      var userRole = $("<p class='text-center text-secondary'>" + data[i].role + "</p>")
      cardBody.append(userRole)


      var row = $("<div>")
      row.addClass("row")

      var col1 = $("<div>")
      col1.addClass("col-sm-5")

      var col2 = $("<div>")
      col2.addClass("col-sm-5")

      var button1 = $('<button type="button" class="btn btn-success">Cash Out</button>')
      var button2 = $('<button type="button" class="btn btn-secondary change-role" data-toggle="modal" data-target="#exampleModal" data-id=' + data[i].Fbid + '>User Role</button>')



      button2.attr("data", data[i].Fbid)

      col1.append(button1)
      col2.append(button2)

      row.append(col1)
      row.append(col2)

      cardBody.append(row)
      div.append(card)
      card.append(cardBody)


      $("#admin-users").append(div)

    }

  });

});

//#############################################################//
var newID;

//#############################################################//
// Adding Correct Content to MODAL

$("#admin-users").on('click', '.change-role', function () {
  var dataId = $(this).data("id")
  console.log(dataId)
  console.log(this)
  newID = dataId
  updateSaveButton()
});


$(".newRoleSubmit").on("click", function () {

  var Fbid = $(this).attr("data")
  console.log(Fbid)
  var NewRole = $("#newUserRole").val()

  var updatedUser = {
    role: NewRole
  };


  $.ajax({
      method: "PUT",
      url: "/api/users/" + Fbid,
      data: updatedUser
    })
    .done(function () {
      window.location.href = "/admin";
    });

})


var updateSaveButton = function () {

  $(".newRoleSubmit").attr("data", newID)
}