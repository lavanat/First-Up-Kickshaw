// Workflow:

// When the submit button on index html is clicked:
// Graham - Validate that zipcode is only 5 digits and not down whether or not the other three dropdowns have values (these fields are not required)
// Graham - If all the info is right, go to the results page

// On the results page:

// Graham - Put a modal here to ask if they are hungry & handle modal decisions (yes/no)

// Lavanya - Save their search settings to local storage and make sure settings in the form are not cleared (prevent default?)
// Lavanya - Display the search option as a button on the page

// Lavanya - Get the data from the API
// Lavanya - Loop through the data from API and set the value of each field in the restaurant group from HTML

// Event listener when the submit button is clicked

// Variables
var zipcodeInput
var cuisineInput
var ratingInput
var priceInput
var submitBtn
var modalEl

let popup = document.getElementById('popup')
function openPopup(){
popup.claslist.add('open-popup')
}
function closePopup(){
    popup.claslist.remove('open-popup')
    }
