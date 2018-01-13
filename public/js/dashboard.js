//###################################################################//
// GRABBING ITEMS FROM LOCAL STORAGE AND SETTING THEM AS VARIABLES

var profilePicture = localStorage.getItem("profilePicture")
var localStorageFirstName= localStorage.getItem("firstName")
var localStorageLastName = localStorage.getItem("lastName")
//###################################################################//


//###################################################################//
// ADDING PROFILE PICTURE FROM LOCAL STORAGE TO THE FIRST ROUND IMAGE

var myProfileName = localStorageFirstName + " " + localStorageLastName
$("#my-profile-image").attr("src", profilePicture)
$("#current-profile-name").text(myProfileName)
//###################################################################//


