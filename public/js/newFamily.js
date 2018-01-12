$("#familyCode").hide()

function hover() {
    $(".button").on("mouseenter", function() {
      return $(this).addClass("hover");
    });
  }
  
  function hoverOff() {
    $(".button").on("mouseleave", function() {
      return $(this).removeClass("hover");
    });
  }
  
  function active() {
    $(".button").on("click", function() {
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


  $("#formSubmit").on("click",function(){

    var uuid = guid();
    $("#familyCode").show()

    $("#guidNumber").text(uuid)

    })

    

