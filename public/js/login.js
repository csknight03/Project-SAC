//#######################################################################//
// ADDING ITEMS FROM LOCAL STORAGE TO GLOBAL VARIABLES
var LocalStorageUID = localStorage.getItem("uid")
var LocalStoragePicture = localStorage.getItem("profilePicture")
var LocalStorageCoverPicture = localStorage.getItem("coverPicture")
var LocalStorageFirstName = localStorage.getItem("first_name")
var LocalStorageLastName = localStorage.getItem("last_name")
var LocalStorageGender = localStorage.getItem("gender")
//#######################################################################//
//#######################################################################//



//#######################################################################//
// INITIATING FACEBOOK OAUTH LOGIN 

window.fbAsyncInit = function () {
    FB.init({
        appId: '178277322928048',
        xfbml: true,
        version: 'v2.11'
    });
    FB.AppEvents.logPageView();

    FB.getLoginStatus(function (response) {

    }, true);

};



(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

//#######################################################################//
//#######################################################################//



//#######################################################################//
// INITIATE FACEBOOK LOGIN WHEN #LOGINBUTTON IS CLICKED

$("#login").on("click", function () {

    //adding loading gif to the button after it's clicked
    $("#loginButton").empty()
    var loadingImage = $("<img>")
    loadingImage.addClass("loadingImage")
    loadingImage.attr("src", "../images/lg.wave-ball-preloader.gif")
    $("#loginButton").append(loadingImage)
    //////////////////////////////////////////////////////

    //STARTING FACEBOOK API CALLS TO GET USER INFORMATION
    FB.login(function (response) {
        console.log(response)
        var uid = response.authResponse.userID;
        console.log("Facebook UID:", uid)
        if (response.status === 'connected') {
            localStorage.setItem("uid", uid);

            FB.api('/me', {
                fields: 'last_name'
            }, function (response) {
                localStorage.setItem("lastName", response.last_name);
                LocalStorageLastName = localStorage.getItem("lastName")

            });
            FB.api('/me', {
                fields: 'first_name'
            }, function (response) {
                localStorage.setItem("firstName", response.first_name);
                LocalStorageFirstName = localStorage.getItem("firstName")

            });
            FB.api('/me', {
                fields: 'picture'
            }, function (response) {
                localStorage.setItem("profilePicture", response.picture.data.url);
                LocalStoragePicture = localStorage.getItem("profilePicture")

            });
            FB.api('/me', {
                fields: 'cover'
            }, function (response) {
                localStorage.setItem("coverPicture", response.cover.source);
                LocalStorageCoverPicture = localStorage.getItem("coverPicture")

            });
            FB.api('/me', {
                fields: 'gender'
            }, function (response) {
                localStorage.setItem("gender", response.gender);
                LocalStorageGender = localStorage.getItem("gender")

            });

            console.log("FIRST NAME", LocalStorageFirstName)
            console.log("UID", LocalStorageUID)

            setTimeout(function () {
                location.reload()
            }, 1500);

        } else {

        }
    })
    /////////////////////////////////////


})
//#######################################################################//
//#######################################################################//




//#######################################################################//
// FACEBOOK LOGOUT -- REMOVING ITEMS FROM LOCAL STORAGE
$("#logout").on("click", function () {
    localStorage.removeItem("uid");
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    localStorage.removeItem("profilePicture");
    localStorage.removeItem("coverPicture");
    localStorage.removeItem("gender");
    localStorage.removeItem("logged");

    location.reload()

    // FB.logout(function (response) {

    // });


})
//#######################################################################//
//#######################################################################//




//#######################################################################//
// LOGIC THAT CHECKS LOCAL STORAGE FIRST TO DETERMINE WHICH BUTTONS TO SHOW

$(document).ready(function () {
    //if LocalStorageUID (global variable we set at the beginnin) is empty, we know that the user is not logged in
    //so we hide the buttons like 'dashboard', 'join family', and 'create family.
    //we only show the 'login' button
    if (LocalStorageUID === null) {
        $("#logout").hide()
        $("#joinButton").hide()
        $("#createButton").hide()
        $("#dashboardButton").hide()


    // if LocalStorageUID has a value, we know the user is logged in and show the appropriate buttons
    } else {
        $("#login").hide()
        $("#loginButton").hide()
        $("#logout").show()
        $("#joinButton").show()
        $("#createButton").show()
        $("#dashboardButton").show()

        var welcomeString = "Welcome, " + localStorage.getItem("firstName") + " " + localStorage.getItem("lastName") + "!";
        $("#header-subtext").text(welcomeString)
    }

    var Fullname = localStorage.getItem("firstName") + " " + localStorage.getItem("lastName")

    var newUser = {
        name: Fullname,
        picture_url: LocalStoragePicture,
        points_banked: 0,
        points_available: 0,
        completed_tasks: 0,
        createdAt:"2018-01-07 15:06:27",
        updatedAt:"2018-01-07 15:06:27",
        Fbid: LocalStorageUID,
      };
  
      // Send the POST request.
      $.ajax("/api/users", {
        type: "POST",
        data: newUser
      }).then(
        function() {
          console.log("created new user");
        }
      );
});

//#######################################################################//
//#######################################################################//




//#######################################################################//
// SCROLL STUFF THAT HIDES THE PICTURES DEPENDING ON HOW MANY PIXELS YOU'VE SCROLLED DOWN

$(window).scroll(function () {
    // the < 850 here means 'less than 500px'


    if ($(this).scrollTop() > 400) {
        $(".first-image").animate({
            'opacity': '1'
        }, 1100);
    }
    if ($(this).scrollTop() >400) {
        $(".second-image").animate({
            'opacity': '1'
        }, 1400);
    }
    if ($(this).scrollTop() > 400) {
        $(".third-image").animate({
            'opacity': '1'
        }, 1400);
    }

    if ($(this).scrollTop() > 400) {
        $(".fourth-image").animate({
            'opacity': '1'
        }, 1100);
    }

    if ($(this).scrollTop() > 700) {
        $(".chore-quote-1").animate({
            'opacity': '1'
        }, 1100);
    }

    if ($(this).scrollTop() > 770) {
        $(".chore-quote-2").animate({
            'opacity': '1'
        }, 1100);
    }

    if ($(this).scrollTop() > 870) {
        $(".chore-quote-3").animate({
            'opacity': '1'
        }, 1100);
    }

    if ($(this).scrollTop() > 970) {
        $(".chore-quote-4").animate({
            'opacity': '1'
        }, 1100);
    }

    if ($(this).scrollTop() > 1270) {
        $(".points-text").animate({
            'opacity': '1'
        }, 1100);
    }


    // if ($(this).scrollTop() < 700) {
    //     $(".first-image").remoceClass("hidden")
    //     $(".first-image").addClass("shown")
    // }
    // if ($(this).scrollTop() < 800) {
    //     $(".second-image").fadeIn("slow")
    // }
    // if ($(this).scrollTop() < 900) {
    //     $(".third-image").fadeIn("slow")
    // }
    // if ($(this).scrollTop() < 650) {
    //     $(".fourth-image").fadeIn("slow")
    // }

});
//#######################################################################//
//#######################################################################//




//#######################################################################//
// HIDING THE FIELD WHERE YOU ENTER THE UNIQUE FAMILY CODE, UNTIL THE 'JOIN FAMILY' BUTTON IS CLICKED

$("#join-existing").hide()

$("#joinExisting").on("click", function () {
    $("#join-existing").toggle(1000)
})

//#######################################################################//
//#######################################################################//



//#######################################################################//
// UPDATING THE FAMILYUuID CODE FROM THE HOME PAGE
var wage = document.getElementById("joinCode");
wage.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
    var GUID = $("#joinCode").val()
    console.log("JOIN CODE IS: ", GUID)

    var updatedUser = {
        FamilyUuid: GUID
      };

      console.log(updatedUser)

    $.ajax({
      method: "PUT",
      url: "/api/users/"+LocalStorageUID,
      data: updatedUser
    })
    .done(function() {
      window.location.href = "/dashboard";
    });
    }
});

function validate(e) {
    var text = e.target.value;
    //validation of the input...
}

//#######################################################################//
//#######################################################################//

