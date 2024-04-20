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
  
	const url = `${baseUrl}?${params}`;
	console.log(`Fetching data from ${url}`);
	const response = await fetch(url);
  
	if (response.ok) {
	  const foodsData = await response.json();
  
	  const descriptions = foodsData.foods.map(food => food.description);
	  const closestDescription = descriptions.find(description =>
		description.toLowerCase().includes(partialDescription.toLowerCase())
	  );
  
	  if (closestDescription) {
		const targetFood = foodsData.foods.find(food => food.description === closestDescription);
		return targetFood;
	  } else {
		return null;
	  }
	} else {
	  return null;
	}
  }
  
  function extractNutrients(food) {
	if (food) {
	  console.log(`Description: ${food.description}`);
	  food.foodNutrients.forEach(nutrient => {
		if (['Carbohydrate, by difference', 'Total Sugars', 'Fiber, total dietary'].includes(nutrient.nutrientName)) {
		  console.log(`${nutrient.nutrientName}: ${nutrient.value} ${nutrient.unitName}`);
		}
	  });
	  console.log("-".repeat(50));
	} else {
	  console.log("No matching food found based on the description.");
	}
  }
  
  const apiKey = 'lDuSAPE57aS7jR78F5VNgXC0ETYI7CbPj9qfvCqH';
  const foodQuery = 'cheddar cheese';
  const partialDescription = "MILD CHEDDAR SHREDDED CHEESE";
  
  (async () => {
	const specificFood = await fetchNutrientData(apiKey, foodQuery, partialDescription);
	extractNutrients(specificFood);
  })();
  