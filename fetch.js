function getFoodData(api_key, params) {					//params is a key:value list
	const req = new XMLHttpRequest();
	req.open("GET", "https://api.nal.usda.gov/fdc/v1/foods/search");
	req.onload = () => {					//set up event listener (executes upon load)
		if (req.readyState == 4 && xhr.status == 200) {
			document.getElementById(output).innerHTML = req.response;		//spit out the response using DOM
		} 
		else {
			document.getElementById(output).innerHTML = `Error: ${req.status} \r\n ${req.response}`;
												//if error, spit it out using DOM
		}
	};
	req.send(concat((params) => new URLSearchParams(params),`&api_key=${api_key}`));	//process key:value list and send to server
}
let key = "ifCZAscHCiFT5kcgxyDgDv6KW3dHzgnUIsvvFP4W";
let parameter = {
	query: "shredded cheese", 
	dataType: "Branded",
	pageSize: 25,
	pageNumber: 2,
	sortBy: "dataType.keyword",
	sortOrder: "asc",
	brandOwner: "Kar Nut Products Company"
};
getFoodData(key, parameter);

