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
              duration: 2000,
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
          var input = $("<input>")
          input.attr("name", "cb"+data.Chores[j].id)
          input.attr("id","cb"+data.Chores[j].id)
          input.attr("type", "checkbox")
  
          var label = $("<lable>")
          label.attr("for", "cb"+data.Chores[j].id)
          label.text(data.Chores[j].chore)
          
          li.append(input)
          li.append(label)
  
          $("#individualChores").append(li)




       // $("<style>").text('.ac-custom input[type="checkbox"], .ac-custom input[type="radio"], .ac-custom label::before {background-color: #CE5848;} .ac-custom li {margin: 0 auto; padding: .2em 0; position: relative;}.ac-custom input[type="checkbox"]:checked + label, .ac-custom input[type="radio"]:checked + label {color: #CE5848;}label {display: inline-block;}.ac-custom label {display: inline-block;position: relative;font-size: 1.5em;padding-left: 80px;cursor: pointer;-webkit-transition: color 0.3s; transition: color 0.3s;}').appendTo("head");




      }

      // <li><input name="cb1" id="cb1" type="checkbox"><lable for="cb1">test post</lable></li>

      // <li><input id="cb1" name="cb1" type="checkbox"><label for="cb1">Efficiently unleash information</label></li>

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
//############################################################//