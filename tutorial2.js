// var myGuestList = ["Angela", "Jack", "Pan", "James", "Lara", "Jason"];
// var userName = prompt("Enter Your Name");

// // Convert the entered name and guest list names to lowercase
// userName = userName.toLowerCase();
// var lowerCaseGuestList = myGuestList.map(function(name) {
//   return name.toLowerCase();
// });

// if (lowerCaseGuestList.includes(userName)) {
//   alert("Welcome, my guest!");
// } else {
//   alert("Sorry, you are not invited.");
// }


// Method 2:

var myGuestList = ["Angela", "Jack", "Pan", "James", "Lara", "Jason"];
var userName = prompt("Enter Your Name");

// Convert the entered name to lowercase
userName = userName.toLowerCase();

var isInvited = false;

for (var i = 0; i < myGuestList.length; i++) {
  // Convert the current guest name to lowercase for case-insensitive comparison
  var currentGuest = myGuestList[i].toLowerCase();

  if (currentGuest === userName) {
    isInvited = true;
    break; // Exit the loop early if a match is found
  }
}

if (isInvited) {
  alert("Welcome, my guest!");
} else {
  alert("Sorry, you are not invited.");
}