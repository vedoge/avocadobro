async function fetchNutrientData(apiKey, foodQuery, partialDescription) {
	const baseUrl = "https://api.nal.usda.gov/fdc/v1/foods/search";
	const params = new URLSearchParams({
	  query: foodQuery,
	  dataType: 'Branded',
	  pageSize: 25,
	  pageNumber: 2,
	  sortBy: 'dataType.keyword',
	  sortOrder: 'asc',
	  brandOwner: 'Kar Nut Products Company',
	  api_key: apiKey
	});
}

function getFoodData(api_key, params) {								//params is a key:value list
	/*
	const req = new XMLHttpRequest();
	const uri = "https://api.nal.usda.gov/fdc/v1/foods/search";
	req.open("GET", uri);									//open request
	paramstr = new URLSearchParams(params);
	reqstr = (uri.concat("?",`API_KEY=${api_key}`,"&",paramstr));				//process key:value list and send to server
	console.log(reqstr);									//the URI generated by this code can be correctly used when clicked in chromium but not otherwise
	//await promisedClick(document.addEventListener("click", null));			//wait for mouseclick in window
	req.send(reqstr);
	req.onload = () => {									//set up event listener (executes upon load)
		if (req.status == 200) {
			document.getElementById("output").innerHTML = req.response;		//spit out the response using DOM
		} 
		else {										//403 (Forbidden)
			console.log(`Error: ${req.status} \r\n ${req.response}`);		//spit out an error using the console
		}
	}; */
	const uri = "https://api.nal.usda.gov/fdc/v1/foods/search";
	paramstr = new URLSearchParams (params); 
	reqstr = uri.concat("?",`api_key=${api_key}`,"&",paramstr);
	console.log(reqstr);
	let response = "";
	fetch(reqstr,{method:"GET"}).then((req) => {
			response = req.json();
		}).catch((req) => {
			console.log(req.json());
		});
	console.log(response.json);
	//Need to select an entry from the provided JSON, extract its nutrient values, and store them as an object. 
}
let key = "ifCZAscHCiFT5kcgxyDgDv6KW3dHzgnUIsvvFP4W";
let parameter = {
	query: "cheddar cheese", 
	dataType: "Branded",
	pageSize: 25,
	pageNumber: 2,
	sortBy: "dataType.keyword",
	sortOrder: "asc",
	brandOwner: "Kar Nut Products Company"
};
getFoodData(key, parameter);
