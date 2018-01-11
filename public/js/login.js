$(window).scroll(function () {
    if ($(this).scrollTop() < 500) {
        console.log("Less than 500")
    }
    if ($(this).scrollTop() > 700) {
        $(".first-image").fadeOut("slow")
    }
    if ($(this).scrollTop() > 800) {
        $(".second-image").fadeOut("slow")
    }
    if ($(this).scrollTop() > 900) {
        $(".third-image").fadeOut("slow")
    }



    if ($(this).scrollTop() < 700) {
        $(".first-image").fadeIn("slow")
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


$("#joinExisting").on("click",function(){
    $("#join-existing").toggle(1000)
})