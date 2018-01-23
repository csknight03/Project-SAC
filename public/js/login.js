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

window.fbAsyncInit = function() {
    FB.init({
        appId: '178277322928048',
        xfbml: true,
        version: 'v2.11'
    });
    FB.AppEvents.logPageView();

    FB.getLoginStatus(function(response) {

    }, true);

};



(function(d, s, id) {
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

$("#login").on("click", function() {

        //adding loading gif to the button after it's clicked
        $("#loginButton").empty()
        var loadingImage = $("<img>")
        loadingImage.addClass("loadingImage")
        loadingImage.attr("src", "../images/lg.wave-ball-preloader.gif")
        $("#loginButton").append(loadingImage)
            //////////////////////////////////////////////////////

        //STARTING FACEBOOK API CALLS TO GET USER INFORMATION
        FB.login(function(response) {
                console.log(response)
                var uid = response.authResponse.userID;
                console.log("Facebook UID:", uid)
                if (response.status === 'connected') {
                    localStorage.setItem("uid", uid);

                    FB.api('/me', {
                        fields: 'last_name'
                    }, function(response) {
                        localStorage.setItem("lastName", response.last_name);
                        LocalStorageLastName = localStorage.getItem("lastName")

                    });
                    FB.api('/me', {
                        fields: 'first_name'
                    }, function(response) {
                        localStorage.setItem("firstName", response.first_name);
                        LocalStorageFirstName = localStorage.getItem("firstName")

                    });
                    FB.api('/me', {
                        fields: 'cover',
                    }, function(response) {
                        console.log(response)
                        localStorage.setItem("profilePicture", response.cover.source);
                        LocalStoragePicture = localStorage.getItem("profilePicture")

                    });

                    // FB.api('/me', {
                    //     fields: 'cover',
                    // }, function(response) {
                    //     console.log("PHOTOS")
                    //     console.log(response)
                    //     localStorage.setItem("coverPicture", response.cover.source);
                    //     LocalStorageCoverPicture = localStorage.getItem("coverPicture")

                    // });


                    FB.api('/me', {
                        fields: 'gender'
                    }, function(response) {
                        localStorage.setItem("gender", response.gender);
                        LocalStorageGender = localStorage.getItem("gender")

                    });


                    setTimeout(function() {
                        location.reload()
                    }, 1500);

                } else {

                }
            }, { auth_type: 'reauthenticate' })
            /////////////////////////////////////


    })
    //#######################################################################//
    //#######################################################################//




//#######################################################################//
// FACEBOOK LOGOUT -- REMOVING ITEMS FROM LOCAL STORAGE
$("#logout").on("click", function() {
        localStorage.removeItem("uid");
        localStorage.removeItem("firstName");
        localStorage.removeItem("lastName");
        localStorage.removeItem("profilePicture");
        localStorage.removeItem("coverPicture");
        localStorage.removeItem("gender");
        localStorage.removeItem("logged");



        FB.logout(function(response) {
            console.log("This is the logout response")
            console.log(response)
        });
        location.reload()

    })
    //#######################################################################//
    //#######################################################################//




//#######################################################################//
// LOGIC THAT CHECKS LOCAL STORAGE FIRST TO DETERMINE WHICH BUTTONS TO SHOW

$(document).ready(function() {
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
        createdAt: "2018-01-07 15:06:27",
        updatedAt: "2018-01-07 15:06:27",
        Fbid: LocalStorageUID,
        gender: LocalStorageGender
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

$(window).scroll(function() {
    // the < 850 here means 'less than 500px'

    if ($(this).scrollTop() < 190) {
        $("#login-page").removeClass("blur1")
    }
    if ($(this).scrollTop() > 190) {
        $("#login-page").addClass("blur1")
    }

    if ($(this).scrollTop() < 230) {
        $("#login-page").removeClass("blur2")
    }
    if ($(this).scrollTop() > 230) {
        $("#login-page").addClass("blur2")
    }
    if ($(this).scrollTop() < 240) {
        $("#login-page").removeClass("blur3")
    }
    if ($(this).scrollTop() > 240) {
        $("#login-page").addClass("blur3")
    }

    if ($(this).scrollTop() < 250) {
        $("#login-page").removeClass("blur4")
    }
    if ($(this).scrollTop() > 250) {
        $("#login-page").addClass("blur4")
    }


    if ($(this).scrollTop() < 260) {
        $("#login-page").removeClass("blur5")
    }
    if ($(this).scrollTop() > 260) {
        $("#login-page").addClass("blur5")
    }

    if ($(this).scrollTop() > 400) {
        $(".first-image").animate({
            'opacity': '1'
        }, 1100);
    }
    if ($(this).scrollTop() > 400) {
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




});
//#######################################################################//
//#######################################################################//




//#######################################################################//
// HIDING THE FIELD WHERE YOU ENTER THE UNIQUE FAMILY CODE, UNTIL THE 'JOIN FAMILY' BUTTON IS CLICKED

$("#join-existing").hide()

$("#joinExisting").on("click", function() {
    $("#join-existing").toggle(1000)
})

//#######################################################################//
//#######################################################################//



//#######################################################################//
// UPDATING THE FAMILYUuID CODE FROM THE HOME PAGE
var wage = document.getElementById("joinCode");
wage.addEventListener("keydown", function(e) {
    if (e.keyCode === 13) { //checks whether the pressed key is "Enter"
        var GUID = $("#joinCode").val()
        console.log("JOIN CODE IS: ", GUID)

        var updatedUser = {
            FamilyUuid: GUID
        };

        console.log(updatedUser)

        $.ajax({
                method: "PUT",
                url: "/api/users/" + LocalStorageUID,
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


//#######################################################################//
// TEXT FADING

$(window).scroll(function() {
    $(".website-title").css("opacity", 1 - $(window).scrollTop() / 250);
});
$(window).scroll(function() {
    $(".Header-title--home").css("opacity", 1 - $(window).scrollTop() / 250);
});

$(window).scroll(function() {
    $(".first-section").css("opacity", 0 + $(window).scrollTop() / 450);
});

$(window).scroll(function() {
    $(".second-section").css("opacity", 0 + $(window).scrollTop() / 450);
});


// ###########################################################################
// BUTTON FADING

$(window).scroll(function() {
    $("#createButton").css("opacity", 1 - $(window).scrollTop() / 450);
});
$(window).scroll(function() {
    $("#createButton").css("opacity", 1 - $(window).scrollTop() / 450);
});

$(window).scroll(function() {
    $("#joinButton").css("opacity", 1 - $(window).scrollTop() / 450);
});
$(window).scroll(function() {
    $("#joinButton").css("opacity", 1 - $(window).scrollTop() / 450);
});

$(window).scroll(function() {
    $("#dashboardButton").css("opacity", 1 - $(window).scrollTop() / 450);
});
$(window).scroll(function() {
    $("#dashboardButton").css("opacity", 1 - $(window).scrollTop() / 450);
});