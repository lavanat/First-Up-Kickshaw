// Workflow:

// When the submit button on index html is clicked:
// Graham - Validate that zipcode is only 5 digits and not down whether or not the other three dropdowns have values (these fields are not required)
// Graham - If all the info is right, go to the results page

// On the results page:

// Graham - Put a modal here to ask if they are hungry & handle modal decisions (yes/no)

// Lavanya - Save their search settings to local storage and make sure settings in the form are not cleared (prevent default?)
// Lavanya - Display the search option as a button on the page

// Event listener when the submit button is clicked

// Variables
var zipcodeInput
var cuisineInput
var ratingInput
var priceInput
var submitBtn
var modalEl
var openButton = document.querySelector('#open')
var closeButton = document.querySelector('#close')

let popup = document.querySelector('.popup')
function openPopup(){
popup.classList.add('open-popup')
}
function closePopup(){
    popup.classList.remove('open-popup')
    }

openButton.addEventListener('click',openPopup)
closeButton.addEventListener('click',closePopup)

var btn = document.querySelector("#btn")

function inputValidator () {
    var inputEl = document.querySelector("#zipcode").value;
    if (inputEl !== "") {
        var x = parseInt(inputEl);
        if (isNaN(x)) {
            console.log("Not a number")
        
        } else {
            console.log("This works")
        }
    }
}

btn.addEventListener("click", inputValidator)
