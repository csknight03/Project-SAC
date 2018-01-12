$("#familyCode").hide()

function hover() {
    $(".button").on("mouseenter", function () {
        return $(this).addClass("hover");
    });
}

function hoverOff() {
    $(".button").on("mouseleave", function () {
        return $(this).removeClass("hover");
    });
}

function active() {
    $(".button").on("click", function () {
        return $(this).addClass("active");
    });
}

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

hover();
hoverOff();
active();


$("#formSubmit").on("click", function () {

    var familyName = $("#family-name").val()
    var familyEmail = $("#family-email").val()


    console.log("Family Name:", familyName)
    console.log("Family Email:", familyEmail)

    if (familyName !== "") {
        $("#family-name").removeClass("error")
        if (familyEmail !== "") {

            $("#family-email").removeClass("error")
            var uuid = guid();
            $("#familyCode").show()
            $("#guidNumber").text(uuid)
        } else {
            console.log("Empty email")
            $("#family-email").addClass("error")
            $("#family-email").attr("placeholder", "Please Enter A Valid Email");
        }
    } else {
        console.log("Empty Name")
        $("#family-name").addClass("error")
        $("#family-name").attr("placeholder", "Please Enter A Valid Name");
    }

})