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

    $.get("/api/users/"+id, function(data) {
        console.log(data)
        var name = data.name
        var gender = data.gender
        var points_banked = data.points_banked
        var points_available = data.points_available
        var picture_url = data.picture_url
        var Fbid = data.Fbid

        var dollarAmmount = points_banked / 100;

        $("#current-profile-name").text(name)
        $(".userPointValue").text(points_banked)
        $(".userDollarValue").text(dollarAmmount)

         //Function that counts UP all the points
        $('.count').each(function () {
          $(this).prop('Counter',0).animate({
              Counter: $(this).text()
          }, {
              duration: 4000,
              easing: 'swing',
              step: function (now) {
                  $(this).text(Math.ceil(now));
              }
          });
      });
      ////////////////////////////////////////

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