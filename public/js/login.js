/////////////////  FACEBOOK LOGIN  ///////////////////////////

var loggedInStatus = "false"
var LocalStorageUID = localStorage.getItem("uid")




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



if (LocalStorageUID === null) {
    $("#logout").hide()
    $("#joinButton").hide()
    $("#createButton").hide()


} else {
    $("#login").hide()
    $("#loginButton").hide()
    $("#logout").show()
    $("#joinButton").show()
    $("#createButton").show()
}

$("#login").on("click", function () {
    FB.login(function (response) {
        console.log(response)
        var uid = response.authResponse.userID;
        console.log("Facebook UID:", uid)
        if (response.status === 'connected') {
            localStorage.setItem("uid", uid);
        

              FB.api('/me', {fields: 'last_name'}, function(response) {
                console.log(response);
                localStorage.setItem("last_name", response.last_name);
              });

              FB.api('/me', {fields: 'first_name'}, function(response) {
                console.log(response);
                localStorage.setItem("first_name", response.first_name);
              });

              FB.api('/me', {fields: 'picture'}, function(response) {
                console.log(response);
                localStorage.setItem("profilePicture", response.picture.data.url);
              });

              FB.api('/me', {fields: 'cover'}, function(response) {
                console.log(response);
                localStorage.setItem("coverPicture", response.cover.source);
              });

              FB.api('/me', {fields: 'gender'}, function(response) {
                console.log(response);
                localStorage.setItem("gender", response.gender);
              });

              //location.reload()

        } else {}
    });
})


$("#logout").on("click", function () {
    localStorage.removeItem("uid");
    localStorage.removeItem("first_name");
    localStorage.removeItem("last_name");
    localStorage.removeItem("profilePicture");
    localStorage.removeItem("coverPicture");
    location.reload()
    // FB.logout(function (response) {
        
    // });

})

////////////////////////////////////////////////////////////////////////////





$(window).scroll(function () {
    if ($(this).scrollTop() < 500) {
        console.log("Less than 500")
    }
    if ($(this).scrollTop() > 700) {
        $(".first-image").animate({ 'opacity': '0' }, 1000);
    }
    if ($(this).scrollTop() > 800) {
        $(".second-image").animate({ 'opacity': '0' }, 1000);
    }
    if ($(this).scrollTop() > 900) {
        $(".third-image").animate({ 'opacity': '0' }, 1000);
    }

    if ($(this).scrollTop() > 900) {
        $(".fourth-image").animate({ 'opacity': '0' }, 1000);
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