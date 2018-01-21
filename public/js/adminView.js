//###################################################################//
// GRABBING ITEMS FROM LOCAL STORAGE AND SETTING THEM AS VARIABLES

var profilePicture = localStorage.getItem("profilePicture")
var localStorageFirstName = localStorage.getItem("firstName")
var localStorageLastName = localStorage.getItem("lastName")
var FacebookID = localStorage.getItem("uid")
var userRole = localStorage.getItem("role")
//###################################################################//

$("#errorMessage").hide();


//###################################################################//
//CODE TO ADD THE CARD LIST OF FAMILY MEMBERS

if(userRole=== "Child"){
  console.log("UNAUTHORIZED")
  $("#errorMessage").show();
  $("#main-content").hide()
}else{

$.get("/api/users/" + FacebookID, function (data) {
  var familyID = data.FamilyUuid

  userRole = data.role

  // Nested GET request to get the list of family members
  $.get("/api/families/" + familyID, function (data) {
    console.log(data)

    if (userRole === "Child"){
      console.log("UNAUTHORIZED")
    }else{

    for (i = 0; i < data.length; i++) {


      /// adding user cards ///
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

      var button1 = $('<button type="button" class="btn btn-success change-points" data-toggle="modal" data-target="#cashOutModal" data-id=' + data[i].Fbid + '>Cash Out</button>')
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





      ////// adding chores with "in progress status" //////

      for (k = 0; k < data[i].Chores.length; k++) {
        console.log(data[i].Chores[k].chore)

        if(data[i].Chores[k].status === "in progress"){

      //  <div class="row newChore">
      //     <div class="col-12 text-center chore-name text-secondary">Alexander Walz</div>
      //     <div class="col-12 text-center chore-description">"Take Out The Trash"</div>
      //     <div class="col-6 text-right"><button type="button" class="btn btn-outline-danger">Reject</button></div>
      //     <div class="col-6 text-left"><button type="button" class="btn btn-outline-success">Accept</button></div>
      // </div>

          var row = $("<div>")
              row.addClass("row newChore")

          var col1 = $("<div>")
              col1.addClass("col-12 text-center chore-name text-secondary")
              col1.text(data[i].name)

          var col2 = $("<div>")
              col2.addClass("col-12 text-center chore-description")
              col2.text(data[i].Chores[k].chore)

          var col3 = $("<div>")
              col3.addClass("col-6 text-right")
          var recjectButton = $('<button type="button" class="btn btn-outline-danger reject-button" data-chore='+data[i].Chores[k].id+' data-user='+data[i].Fbid+'>Reject</button>')
              col3.append(recjectButton)

          var col4 = $("<div>")
              col4.addClass("col-6 text-left")
          var acceptButton = $('<button type="button" class="btn btn-outline-success accept-button" data-chore='+data[i].Chores[k].id+' data-user='+data[i].Fbid+' data-points='+data[i].Chores[k].chore_value+'>Accept</button>')
              col4.append(acceptButton)


              row.append(col1)
              row.append(col2)
              row.append(col3)
              row.append(col4)

              $("#chores").append(row)
        } 

      }




    }
  }

  });

});
}

//#############################################################//
var newID;
var newPointsID;

//#############################################################//
// Adding Correct Content to MODAL

$("#admin-users").on('click', '.change-role', function () {
  var dataId = $(this).data("id")
  console.log(dataId)
  console.log(this)
  newID = dataId
  updateSaveButton()
});

$("#admin-users").on('click', '.change-points', function () {
  var dataId = $(this).data("id")
  console.log(dataId)
  console.log(this)
  newPointsID = dataId
  $.get("/api/users/" + dataId, function (data) {
    console.log(data)
    $("#userPoints").text(data.points_banked)
    var dollarAmmount = data.points_banked/ 100
    $("#userDollar").text(dollarAmmount)

    $('.count').each(function () {
      $(this).prop('Counter',0).animate({
          Counter: $(this).text()
      }, {
          duration: 1000,
          easing: 'swing',
          step: function (now) {
              $(this).text(Math.ceil(now));
          }
      });
  });

  });

  updateCashButton()
});


$(".newRoleSubmit").on("click", function () {

  var Fbid = $(this).attr("data")
  console.log(Fbid)
  var NewRole = $("#newUserRole").val()

  var updatedUser = {
    role: NewRole
  };

if(Fbid === FacebookID){

  var error = $('<div class="alert alert-danger" role="alert">')
  error.text("Cannot Update Your Own Profile.")
  console.log("No Can Do!")
  $("#error-message").append(error)

  setTimeout(function(){
    $("#error-message").fadeOut(1000)
  }, 2000);
}else{
  $.ajax({
      method: "PUT",
      url: "/api/users/" + Fbid,
      data: updatedUser
    })
    .done(function () {
      
      window.location.href = "/admin";
    });
  }

})


var updateSaveButton = function () {

  $(".newRoleSubmit").attr("data", newID)
}

var updateCashButton = function () {

  $(".newPointsSubmit").attr("data", newPointsID)
  console.log(this)
}


var cashSuccess = function (Fbid) {
  var updatedUser = {
    points_banked: 0
  };

  $.ajax({
      method: "PUT",
      url: "/api/users/" + Fbid,
      data: updatedUser
    })
    .done(function () {
      var successMessage = $("<div>")
      successMessage.addClass("alert alert-success")
      successMessage.attr("role", "alert")
      successMessage.text("Successfully Cashed Out!")
      $("#message").append(successMessage)
      $("#userPoints").text(0)
      $("#userDollar").text(0)

      setTimeout(function(){
        window.location.href = "/admin";
      }, 2500);
      
    });

};

// ###################
// PAYPAL BUTTON
 // Render the PayPal button
$("#admin-users").on("click", ".change-points", function(){
  var cashoutValue;
  var Fbid = $(this).data("id");
  $.get("/api/users/"+Fbid, function(data) {
   console.log(data)
   cashoutValue = (data.points_banked) / 100;
   console.log(cashoutValue);
   $(".newPointsSubmit").empty();
   paypal.Button.render({
    
    // Set your environment

    env: 'sandbox', // sandbox | production

    // Specify the style of the button

    style: {
        label: 'paypal',
        size:  'medium',    // small | medium | large | responsive
        shape: 'rect',     // pill | rect
        color: 'blue',     // gold | blue | silver | black
        tagline: false    
    },

    // PayPal Client IDs - replace with your own
    // Create a PayPal app: https://developer.paypal.com/developer/applications/create

    client: {
        sandbox:    'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R',
        production: 'ARX7ir1mBdEA37QQnpt2sJKHFH9-IUzuXWeb-vXD4XDg79CXpXj8d-IB4xD2AJc6xcLZBWSXFVq0CFPU'
    },

    payment: function(data, actions) {
        return actions.payment.create({
            payment: {
                transactions: [
                    {
                        amount: { total: cashoutValue, currency: 'USD' }
                    }
                ]
            }
        });
    },

    onAuthorize: function(data, actions) {
        return actions.payment.execute().then(function() {
            cashSuccess(Fbid);
        });
    }

}, '#paypal-button-container');


});
});

//####################################################//
// Reject Button Click Event

$("#chores").on("click", ".reject-button", function(){
  $(this).parent('div').parent('div').addClass('fadeMe');
console.log(this)
  var newStatus = {
    status: "not started"
  }

  var Fbid = $(this).attr("data-user")
  var Dbid = $(this).attr("data-chore")

  console.log(Fbid)
  console.log(Dbid)

  $.ajax("/api/chores/" + Fbid + "/" + Dbid, {
    type: "PUT",
    data: newStatus
  }).then(
    function () {
      console.log("updated chore status");
      //location.reload();
      $(".fadeMe").hide()
    }
  );

})

//####################################################//
//####################################################//

var newPoints;

//####################################################//
// Accept Button Click Event

$("#chores").on("click", ".accept-button", function () {
  $(this).parent('div').parent('div').addClass('fadeMe');
  pointValue = $(this).attr("data-points")
  console.log("New Points")
  console.log(pointValue)
  var currentPoints;
  var Fbid = $(this).attr("data-user")
  var Dbid = $(this).attr("data-chore")

  $.get("/api/users/" + Fbid, function (userData) {
    currentPoints = userData.points_banked

  }).done(function () {

    console.log("Second New Points")
    console.log(pointValue)

    var num1 = parseInt(currentPoints)
    var num2 = parseInt(pointValue)  //<!--ERROR IS HERE -->
    console.log("num1")
    console.log(num1)
    console.log("num2")
    console.log(num2)  //<!--ERROR IS HERE -->

    var value = num1 + num2
    var finalValue = parseInt(value)

    console.log("finalValue")
    console.log(finalValue)

    var newStatus = {
      status: "complete"
    }

    var newPoints = {
      points_banked: finalValue
    }

    console.log(Fbid)
    console.log(Dbid)

    $.ajax("/api/users/" + Fbid, {
      type: "PUT",
      data: newPoints
    }).then(
      function () {
        console.log("updated chore status and points");
        //location.reload();
        $(".fadeMe").hide()
      }
      );



      $.ajax("/api/chores/" + Fbid + "/" + Dbid, {
        type: "PUT",
        data: newStatus
      }).then(
        function () {
          console.log("updated chore status");
        })

  })
})

//####################################################//
//####################################################//

