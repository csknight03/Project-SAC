//###################################################################//
// GRABBING ITEMS FROM LOCAL STORAGE AND SETTING THEM AS VARIABLES

var profilePicture = localStorage.getItem("profilePicture")
var localStorageFirstName= localStorage.getItem("firstName")
var localStorageLastName = localStorage.getItem("lastName")
var FacebookID = localStorage.getItem("uid")
//###################################################################//


//###################################################################//
// FUNCTION THAT DYNAMICALLY CHANGES THE DOM CONTENTS

var getNewUser = function(id){

  $("#individualChores").empty()

    $.get("/api/users/"+id, function(data) {
        console.log(data)
        var name = data.name
        var gender = data.gender
        var points_banked = data.points_banked
        var points_available = data.points_available
        var picture_url = data.picture_url
        var Fbid = data.Fbid
        var role = data.role

        localStorage.setItem("role", role)

        if(role === "Child"){
          console.log("You are a Child")
          $(".admin-buttons").hide()
        }

        var dollarAmmount = points_banked / 100;
        $("#chores-submit").attr("data", Fbid)
        $("#current-profile-name").text(name)
        $(".userPointValue").text(points_banked)
        $(".userDollarValue").text(dollarAmmount)
        $(".modal-name").text(name)

         //Function that counts UP all the points
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
      ////////////////////////////////////////
      //looping through all the chores


  //     <li>
  //     <input id="cb1" name="cb1" type="checkbox">
  //     <label for="cb1">Efficiently unleash information</label>
  // </li>



      for (j=0; j<data.Chores.length; j++){

    
          var li = $("<li>")
          li.attr("data",data.Chores[j].id)


          // we will use this "data-id" to match to the Fbid so that users can only check off their own tasks
          // if users Fbid that is in local storage === this.data("id").val() -- then allow the API call to update the chore status.  
          // If not, hide the checkbox or something along those lines.

          li.attr("data-id",data.Fbid)


          var input = $("<input>")
          input.attr("name", "cb"+data.Chores[j].id)
          input.attr("id","cb"+data.Chores[j].id)
          input.attr("type", "checkbox")
  
          var label = $("<label>")
          label.attr("for", "cb"+data.Chores[j].id)
          label.text(data.Chores[j].chore)
          
          li.append(input)
          li.append(label)
          // createSVGEl(li) TRYING TO FIGURE OUT HOW TO MAKE THE SBG ANIMATION WORK ON OUR DYNAMICALLY CREATED CHORES. THIS DIDN'T WORK BUT I SWEAR I'M CLOSE
  
          $("#individualChores").append(li)

      }

    });
  }

// starts the function by adding the logged in user info first
getNewUser(FacebookID)

//###################################################################//



//###################################################################//
//GRABBING THE USER FACEBOOK ID SO THAT I CAN FIND THE FAMILY ID

$.get("/api/users/"+FacebookID, function(data) {
    var familyID = data.FamilyUuid
    console.log("FAMILY ID IS:",familyID)

    // Nested GET request to get the list of family members
    $.get("/api/families/"+familyID, function(data) {
        console.log(data)
        
        for(i=0; i<data.length; i++){

            var div = $("<div>")
            div.addClass("col-12 text-center new-user-request")
            div.attr("data", data[i].Fbid)

            var a = $("<a>")

            var img = $("<img>")
            img.attr("src", data[i].picture_url)
            img.addClass("first-image family-image-dashboard")

            if(data[i].gender === "male"){
              img.addClass("male")
            }else if( data[i].gender === "female"){
              img.addClass("female")
            }
            
            a.append(img)
            div.append(a)

            $("#familyPictures").append(div)

            var option = $("<option>")
            option.text(data[i].name)

            $("#choreAssign").append(option)

        }
    
      });

  });

//#############################################################//





//#############################################################//
//CLICK EVENT THAT CHANGES THE DOM WITH THE NEW USER INFO
  $("#familyPictures").on('click', '.new-user-request', function(){
    var newFacebookId = $(this).attr("data")
    getNewUser(newFacebookId)
  });

  //#############################################################//
  //#############################################################//




  //############################################################//
  //COUNTER UP STUFFS

//   $('.count').each(function () {
//     $(this).prop('Counter',0).animate({
//         Counter: $(this).text()
//     }, {
//         duration: 4000,
//         easing: 'swing',
//         step: function (now) {
//             $(this).text(Math.ceil(now));
//         }
//     });
// });
   //############################################################//


//############################################################//
// ADDING CHORES TO SPECIFIC USERS
$("#chores-submit").on("click", function(){
  var newFBID = $(this).attr("data")

var currentTime = new Date();

  var newChore = {
    chore: $("#choreMessage").val(),
    UserFbid: newFBID,
    date_entered: currentTime,
    status: "not started",
    chore_value: $("#chorePoints").val(),
  }
var points = $("#chorePoints").val()
  console.log(points)

  if(points === ""){
    console.log("EMPTY POINT VALUE")
    $("#chorePoints").addClass("error")
  }else if($("#choreMessage").val() === ""){
    $("#chorePoints").removeClass("error")
    $("#choreMessage").addClass("error")
  }else{

        $.ajax("/api/chores/", {
          type: "POST",
          data: newChore
        }).then(
          function() {
            console.log("created new chore");
            location.reload()
          }
        );
      }
})

//############################################################//
// BADGES
// var displayBadges = function() {
//   console.log("This is the start of the displayBadges function");
//   var Fbid = $(this).data("id");
//   $.get("/api/users/"+Fbid, function(data) {
//     console.log(data)
//     var choresCompleted = data.completed_tasks;
//     console.log(choresCompleted);
//     if (choresCompleted == 5) {
//       $("#5").removeClass("d-none");
//       console.log("I've completed 5 tasks, the badge should be showing!");
//     }
//   });
// }

// displayBadges();

$("#familyPictures").on("click", ".new-user-request", function(){
  console.log("This is the start of the displayBadges function");
  var Fbid = $(this).attr("data");
  console.log(Fbid);
  $.get("/api/users/"+Fbid, function(data) {
    console.log(data)
    var choresCompleted = data.completed_tasks;
    console.log(choresCompleted);
    if (choresCompleted == 5) {
      $("#5").removeClass("d-none");
      console.log("I've completed 5 tasks, the badge should be showing!");
    } else {
      $("#5").addClass("d-none");
    }
  });
});
//############################################################//
// CHECKING CHECKBOXES INCREMENTS NUMBER OF COMPLETED TASKS
$(".cb").on("click", function(){
  var Fbid = $(this).data("id")
  var completeTask;
    $.get("/api/users/"+Fbid, function(data) {
      console.log(data)
      var choresCompleted = data.completed_tasks;
      choresCompleted++;
      
    });
    $.get("api/chores/"+id, function(data) {
      var id = data.val();
      console.log(id);
      var fbid = data-id.val();
      console.log(fbid);
      var status = data.status;
      console.log(status);
    });
});