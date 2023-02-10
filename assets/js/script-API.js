
const options = {
	method: 'GET',
	headers: {
		'content-type': 'application/json'
	}
};

fetch('https://api.spoonacular.com/food/restaurants/search?apiKey=b2c2967dc5fd4b899471d38bc9f73a16&lat=40.7128&lng=-74.0060&distance=30', options)
	.then(response => response.json())
	.then(response => console.log(response))
  .catch(err => console.error(err));