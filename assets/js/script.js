// Global Variables
var zipcode    
var price
var cuisine
var rating
var openButton = document.querySelector('#open')
var closeButton = document.querySelector('#close')
var btn = document.getElementById("submitBtn")

// When you open the page, load any saved buttons and hide the results container.
function init () {
    loadSearchButtons ();
    document.getElementById("results-container").style.display = "none"
}

init ()

// checks whether the zipcode is valid
function zipValidator () {
    zipcode = document.getElementById("zipcode").value;    
    price = document.getElementById("price").value;
    cuisine = document.getElementById("cuisine").value ; 
    rating = document.getElementById("rating").value;
    if (zipcode !== "") {
        var x = parseInt(zipcode);
        if ((isNaN(x)) || (x < 10000)) {
            document.getElementById("zipcodeError").textContent="Please Enter 5 Digit Zipcode"
        
        } else {
            saveToLocalStorage (zipcode,cuisine,price,rating);
        }
    }
}

// Function to save user's current search into LocalStorage. 
// Gets called when the submit button is clicked.
function saveToLocalStorage (zipcode,cuisine,budget,minRating) {
    var counter
    var pastSearches = {}
    if (localStorage.getItem("counter") === null) {
        counter = 1;
    } else {
        counter = parseInt(localStorage.getItem("counter")) + 1; 
    }
    localStorage.setItem("counter", counter);
    currentSearch = [zipcode, cuisine, budget, minRating];
    searchKey = "search" + counter;
    if (localStorage.getItem("pastSearches") === null) {
        pastSearches[searchKey] = currentSearch;
        localStorage.setItem("pastSearches",JSON.stringify(pastSearches));
    } else {
        pastSearches = JSON.parse(localStorage.getItem("pastSearches"));
        pastSearches[searchKey] = currentSearch;
        localStorage.setItem("pastSearches",JSON.stringify(pastSearches));
    }
    loadSearchButtons ();
    document.getElementById("results-container").style.display = "none"
    getLatLong (zipcode,cuisine,budget,minRating);

}

// Loads the search buttons when you open the page (index or results)
function loadSearchButtons () { 
    document.getElementById("past-searches").innerHTML = ""
    if (localStorage.getItem("pastSearches") !== null) {
        var searchHistory = document.getElementById("past-searches");
        var titleEl = document.createElement("h2");
        titleEl.textContent = "Previous Searches";
        searchHistory.append(titleEl);
        var pastSavedSearches = JSON.parse(localStorage.getItem("pastSearches"));
        var searchObj = Object.entries(pastSavedSearches);
        for (i=0; i < searchObj.length; i++) {
            var currentKey = searchObj[i][0]
            var currentSearch = searchObj[i][1]
            createSearchButton(currentKey,currentSearch)
        }
    }
}

// Creates a search button for a previously-saved search.
// Gets called within loadSearchButtons
function createSearchButton (searchKey,currentSearch) {
    var searchHistory = document.getElementById("past-searches");
    buttonText = currentSearch[1] + " food in " + currentSearch[0] + " with a budget under " + currentSearch[2] + " and a minimum rating of " + currentSearch[3]
    let newButton = document.createElement("button")
    newButton.id = searchKey;
    newButton.classList.add("searchButtons")
    newButton.textContent = buttonText;
    searchHistory.append(newButton);
}

// START OF API HANDLING CODE

// Use the openweathermap api to get the lattitude and longitude from the zipcode
// Gets called when the submit button is clicked or a previous search history is clicked
function getLatLong (zipcode,cuisine,budget,minRating)  {
    if (zipcode !== "") {
        var requestURL = "https://api.openweathermap.org/geo/1.0/zip?zip=" + zipcode + ",US&appid=d37301983be8abf2d2f02d5906d87205";
        fetch(requestURL)
        .then(function (response) {
        return response.json();
        })
        .then(function (data) {
        var lat = data.lat
        var lon = data.lon
        formatRestaurantURL (lat,lon,cuisine,budget,minRating)
        });
    } else {
        document.getElementById("results-container").style.display = "none"
        var errMess = document.createElement('div');
        errMess.textContent = "Please enter a valid zipcode to continue"
        document.body.appendChild(errMess)
    }
}

// take all of the user input parameters and format the URL string. Gets called from getLatLong
function formatRestaurantURL (lat,lon,cuisine,budget,minRating) {
    var formattedLat = "&lat=" + lat;
    var formattedLon = "&lng=" + lon;
    var apiKey = "b2c2967dc5fd4b899471d38bc9f73a16"
    var requestURL = "https://api.spoonacular.com/food/restaurants/search?apiKey="+ apiKey + formattedLat + formattedLon
    // only adds the following parameters if they exist
    if (cuisine !== "") {
        formattedCuisine = "&cuisine=" + cuisine;
        requestURL += formattedCuisine
    }
    if (budget !== "") {
        formattedBudget = "&budget=" + budget;
        requestURL += formattedBudget
    }
    if (minRating !== "") {
        formattedRating = "&min-rating=" + minRating;
        requestURL += formattedRating
    }
    RestaurantAPI (requestURL);
}

// Queries the spoonacular restaurant finder API to return the restaurant info and put it into results.html
// Gets called from formatRestaurantURL 
function RestaurantAPI (requestURL) {
    const options = {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        }
    };

    fetch(requestURL,options)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        const dataArray = data.restaurants.slice(0,10)
        for (var i = 0; i < dataArray.length; i++) {
            // had to do i+1 because we started each grouping at 1 instead of 0
            var nameID = "name-" + (i+1);
            var picID = "pic-" + (i+1);
            var addressID = "address-" + (i+1);
            var monID = "mon-" + (i+1);
            var tuesID = "tues-" + (i+1);
            var wedID = "wed-" + (i+1);
            var thurID = "thur-" + (i+1);
            var friID = "fri-" + (i+1);
            var satID = "sat-" + (i+1);
            var sunID = "sun-" + (i+1);

            // this section sets all of the text elements in results.html
            document.getElementById(nameID).textContent = data.restaurants[i].name;
            document.getElementById(picID).innerHTML = "<img src='" + data.restaurants[i].food_photos + "'>"
            document.getElementById(addressID).textContent = data.restaurants[i].address.street_addr + ", " + data.restaurants[i].address.city + ", " + data.restaurants[i].address.state;
            document.getElementById(monID).textContent = data.restaurants[i].local_hours.operational.Monday;
            document.getElementById(tuesID).textContent = data.restaurants[i].local_hours.operational.Tuesday;
            document.getElementById(wedID).textContent = data.restaurants[i].local_hours.operational.Wednesday;
            document.getElementById(thurID).textContent = data.restaurants[i].local_hours.operational.Thursday;
            document.getElementById(friID).textContent = data.restaurants[i].local_hours.operational.Friday;
            document.getElementById(satID).textContent = data.restaurants[i].local_hours.operational.Saturday;
            document.getElementById(sunID).textContent = data.restaurants[i].local_hours.operational.Sunday;
            document.getElementById("results-container").style.display = ""
        }

        // if there are not 10 results returned by the api, then hide the remaining cards
        if ((dataArray.length < 10) && (dataArray.length > 0)) {
            var dif = 10 - data.restaurants.length
            for (var i = (10 - dif + 1); i < 11; i++) {
                resultId = "results-" + i
                document.getElementById(resultId).style.display = "none"
            }
        }
    });

}

// Event listener when the submit button is clicked
btn.addEventListener("click", zipValidator)

// This is the code to handle when a previous search button is clicked. Had to add jquery to html file for this.
var searchContainer = $("#past-searches");
searchContainer.on("click", ".searchButtons", function(event) {
    var buttonID = $(this).attr("id");
    var searchParams = JSON.parse(localStorage.getItem("pastSearches"))[buttonID]
    var zipParam = searchParams[0];
    var cuisineParam = searchParams[1];
    var budgetParam = searchParams[2];
    var ratingParam = searchParams[3];
    // updating the values of the inputs so that the user knows what they clicked
    document.getElementById("zipcode").value = zipParam;
    document.getElementById("cuisine").value = cuisineParam;
    document.getElementById("rating").value = budgetParam;
    document.getElementById("price").value = ratingParam;

    getLatLong(zipParam,cuisineParam,budgetParam,ratingParam);
})


// Hungry? Modal
let popup = document.querySelector('.popup')
function openPopup(){
popup.classList.add('open-popup')
}
function closePopup(){
    popup.classList.remove('open-popup')
    }

openButton.addEventListener('click',openPopup)
closeButton.addEventListener('click',closePopup)