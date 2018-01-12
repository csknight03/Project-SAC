$("#familyCode").hide()

/////////////////////////// SUBMIT BUTTON STUFFS  ////////////////////////////////////////

// different functinos for the different states


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

hover();
hoverOff();
active();
/////////////////////////////////////////////////////////////////////////////////////




///////////////////////////  RANDOM GUID CREATION ///////////////////////////////////
function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}
////////////////////////////////////////////////////////////////////////////






//////////////////////////  FORM SUBMITION  ///////////////////////////////

// submits the form
// generates a random GUID
//handles errors for empty fields

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
            $("#backToHome").animate({ 'opacity': '1' }, 1000);
        } else {
            console.log("Empty email")
            $("#family-email").addClass("error")
            $("#family-email").attr("placeholder", "Please Enter A Valid Email");
            $(".button").removeClass("active");
        }
    } else {
        console.log("Empty Name")
        $("#family-name").addClass("error")
        $("#family-name").attr("placeholder", "Please Enter A Valid Name");
        $(".button").removeClass("active");
    }

})

///////////////////////////////////////////////////////////////////////////////////////////

function clipBoardCopy() {
    var copyText = document.getElementById("guidNumber");
    copyText.select();
    document.execCommand("Copy");
    alert("Copied the text: " + copyText.value);
  }

