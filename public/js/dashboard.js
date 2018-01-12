var profilePicture = localStorage.getItem("profilePicture")
var localStorageFirstName= localStorage.getItem("firstName")
var localStorageLastName = localStorage.getItem("lastName")

var myProfileName = localStorageFirstName + " " + localStorageLastName

console.log(profilePicture)

$("#my-profile-image").attr("src", profilePicture)
$("#current-profile-name").text(myProfileName)