/////////////////  FACEBOOK LOGIN  ///////////////////////////

var loggedInStatus = "false"
var LocalStorageUID = localStorage.getItem("uid")
var LocalStoragePicture = localStorage.getItem("profilePicture")
var LocalStorageCoverPicture = localStorage.getItem("coverPicture")
var LocalStorageFirstName = localStorage.getItem("first_name")
var LocalStorageLastName = localStorage.getItem("last_name")
var LocalStorageGender = localStorage.getItem("gender")


window.fbAsyncInit = function () {
    FB.init({
        appId: '178277322928048',
        xfbml: true,
        version: 'v2.11'
    });
    FB.AppEvents.logPageView();



    FB.getLoginStatus(function (response) {
        if (response.status === 'connected') {
            $("#login").hide()
            $("#logout").show()
            loggedInStatus = true;

            var uid = response.authResponse.userID;
            var accessToken = response.authResponse.accessToken;
            localStorage.setItem("uid", uid);
            console.log("FACEBOOK UID IS:", uid)

        } else if (response.status === 'not_authorized') {

        } else {

        }
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

$("#login").on("click", function () {
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
            
            setTimeout(function(){ location.reload()}, 1500);

        } else {

        }
    })

})


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







$( document ).ready(function() {
    if (LocalStorageUID === null) {
        $("#logout").hide()
        $("#joinButton").hide()
        $("#createButton").hide()
        $("#dashboardButton").hide()
    
    
    } else {
    
    
        $("#login").hide()
        $("#loginButton").hide()
        $("#logout").show()
        $("#joinButton").show()
        $("#createButton").show()
        $("#dashboardButton").show()
        
        var welcomeString = "Welcome, " + localStorage.getItem("firstName") +" "+ localStorage.getItem("lastName")+"!";
        $("#header-subtext").text(welcomeString)
    }
});

////////////////////////////////////////////////////////////////////////////





$(window).scroll(function () {
    if ($(this).scrollTop() < 500) {
        console.log("Less than 500")
    }
    if ($(this).scrollTop() > 700) {
        $(".first-image").animate({
            'opacity': '0'
        }, 1000);
    }
    if ($(this).scrollTop() > 800) {
        $(".second-image").animate({
            'opacity': '0'
        }, 1000);
    }
    if ($(this).scrollTop() > 900) {
        $(".third-image").animate({
            'opacity': '0'
        }, 1000);
    }

    if ($(this).scrollTop() > 900) {
        $(".fourth-image").animate({
            'opacity': '0'
        }, 1000);
    }



    if ($(this).scrollTop() < 700) {
        $(".image-first").fadeIn("slow")
    }
    if ($(this).scrollTop() < 800) {
        $(".second-image").fadeIn("slow")
    }
    if ($(this).scrollTop() < 900) {
        $(".third-image").fadeIn("slow")
    }
    if ($(this).scrollTop() < 650) {
        $(".fourth-image").fadeIn("slow")
    }

});

$("#join-existing").hide()


$("#joinExisting").on("click", function () {
    $("#join-existing").toggle(1000)
})