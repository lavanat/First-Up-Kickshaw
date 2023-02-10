var zipcode = "30024";
var cuisine = "italian"
var budget = 20
var minRating = 4.5


function getLatLong (zipcode)  {
    var requestURL = "http://api.openweathermap.org/geo/1.0/zip?zip=" + zipcode + ",US&appid=d37301983be8abf2d2f02d5906d87205";
    fetch(requestURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var lat = data.lat
      var lon = data.lon
      formatRestaurantURL (lat,lon)
    });
}

function formatRestaurantURL (lat,lon) {
    var formattedLat = "&lat=" + lat;
    var formattedLon = "&lng=" + lon;
    var requestURL = "https://api.spoonacular.com/food/restaurants/search?apiKey=2d16b5acc51c4165bb628b5ff87b47c8" + formattedLat + formattedLon
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

            document.getElementById(picID).textContent = data.restaurants[i].food_photos
            document.getElementById(addressID).textContent = data.restaurants[i].address.street_addr + ", " + data.restaurants[i].address.city + ", " + data.restaurants[i].address.state
            document.getElementById(monID).textContent = data.restaurants[i].local_hours.operational.Monday
            document.getElementById(tuesID).textContent = data.restaurants[i].local_hours.operational.Tuesday
            document.getElementById(wedID).textContent = data.restaurants[i].local_hours.operational.Wednesday
            document.getElementById(thurID).textContent = data.restaurants[i].local_hours.operational.Thursday
            document.getElementById(friID).textContent = data.restaurants[i].local_hours.operational.Friday
            document.getElementById(satID).textContent = data.restaurants[i].local_hours.operational.Saturday
            document.getElementById(sunID).textContent = data.restaurants[i].local_hours.operational.Sunday
        }
    });

}


getLatLong (zipcode)

// restaurant name: name-1 - data.restaurants[i].name
// restaurant pic: pic-1 - data.restaurants[i].food_photos
// restaurant address: address-1 : 
// data.restaurants[i].address.street_addr
// data.restaurants[i].address.city
// data.restaurants[i].address.state
// restaurant hours: mon-1, tues-1, wed-1, thur-1, fri-1, sat-1, sun-1:
// data.restaurants[i].local-hours.operational.Monday etc