function promisedClick(listener) {
	return new Promise ( (resolve) => {
		document.removeEventListener("click", listener);
		resolve();
	});
}

function getFoodData(api_key, params) {								//params is a key:value list
	const req = new XMLHttpRequest();
	const uri = "https://api.nal.usda.gov/fdc/v1/foods/search";
	req.open("GET", uri);									//open request
	req.onload = () => {									//set up event listener (executes upon load)
		if (req.status == 200) {
			document.getElementById("output").innerHTML = req.response;		//spit out the response using DOM
		} 
		else {										//403 (Forbidden)
			console.log(`Error: ${req.status} \r\n ${req.response}`);		//spit out an error using the console
		}
	};
	paramstr = new URLSearchParams(params);
	reqstr = (uri.concat("?",`api_key=${api_key}`,"&",paramstr));	//process key:value list and send to server
	console.log(reqstr);
	//await promisedClick(document.addEventListener("click", null));				//wait for mouseclick in window
	req.send(reqstr);
	req.onreadystatechange = () => {
		console.log(req.response);
		console.log(req.responseText);
	};
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

