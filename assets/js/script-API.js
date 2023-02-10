var zipcode = "30024";
var cuisine = ""
var budget = ""
var min-rating = ""

var requestLatLonURL = "http://api.openweathermap.org/geo/1.0/zip?zip=" + zipcode + ",US&appid=d37301983be8abf2d2f02d5906d87205";

function getLatLong ()  {
    fetch(requestLatLonURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var lat = data.lat
      var long = data.lon
      console.log(lat, long);
    });
}

getLatLong ()



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
