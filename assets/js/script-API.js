var zipcode = "30024";
var cuisine = "italian"
var budget = 20
var minRating = 4.5

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
    createSearchButton(searchKey,currentSearch);
}

function createSearchButton (searchKey,currentSearch) {
    var searchHistory = document.getElementById("past-searches");
    buttonText = currentSearch[1] + " food in " + currentSearch[0] + " with a budget under " + currentSearch[2] + " and a minimum rating of " + currentSearch[3]
    let newButton = document.createElement("button")
    newButton.id = searchKey;
    newButton.classList.add("searchButtons")
    newButton.textContent = buttonText;
    searchHistory.append(newButton);
}

function loadSearchButtons () {
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

// Use the openweathermap api to get the lattitude and longitude from the zipcode
function getLatLong (zipcode,cuisine,budget,minRating)  {
    if (zipcode !== "") {
        var requestURL = "http://api.openweathermap.org/geo/1.0/zip?zip=" + zipcode + ",US&appid=d37301983be8abf2d2f02d5906d87205";
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

// take all of the user input parameters and format the URL string
function formatRestaurantURL (lat,lon,cuisine,budget,minRating) {
    var formattedLat = "&lat=" + lat;
    var formattedLon = "&lng=" + lon;
    var apiKey = "2d16b5acc51c4165bb628b5ff87b47c8"
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

// Calls the spoonacular restaurant finder API to return the restaurant info and put it into results.html 
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
        for (var i = 0; i < data.restaurants.length; i++) {
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
        }

        // if there are not 10 results returned by the api, then hide the remaining cards
        if (data.restaurants.length < 10) {
            var dif = 10 - data.restaurants.length
            for (var i = (10 - dif + 1); i < 11; i++) {
                resultId = "results-" + i
                document.getElementById(resultId).style.display = "none"
            }
        }
    });

}

// This is the function that starts the api calls. 
// Uncomment the following line if you want to test this code! 
// Warning: We only have 50 api calls a day so if you use a live server, we will quickly reach the limit. Use sparingly!
// getLatLong (zipcode)