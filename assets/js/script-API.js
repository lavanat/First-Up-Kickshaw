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
      getRestaurantApi (lat,lon)
    });
}

function getRestaurantApi (lat,lon) {
    var formattedLat = "&lat=" + lat;
    var formattedLon = "&lng=" + lon;
    var requestURL = "https://api.spoonacular.com/food/restaurants/search?apiKey=b2c2967dc5fd4b899471d38bc9f73a16" + formattedLat + formattedLon
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
    console.log(requestURL)
}

getLatLong (zipcode)

// const options = {
// 	method: 'GET',
// 	headers: {
// 		'content-type': 'application/json'
// 	}
// };

// fetch('https://api.spoonacular.com/food/restaurants/search?apiKey=b2c2967dc5fd4b899471d38bc9f73a16&lat=40.7128&lng=-74.0060&distance=30', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
//   .catch(err => console.error(err));
