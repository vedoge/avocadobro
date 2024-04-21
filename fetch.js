async function fetchNutrientData(apiKey, foodQuery) {
  const baseUrl = "https://api.nal.usda.gov/fdc/v1/foods/search";
  const params = new URLSearchParams({
    query: foodQuery,
    dataType: 'Branded',
    pageSize: 25,
    pageNumber: 1,
    sortBy: 'dataType.keyword',
    sortOrder: 'asc',
    api_key: apiKey
  });

  const url = `${baseUrl}?${params.toString()}`;
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return data; 
    } else {
      throw new Error(`HTTP error status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error fetching data: ', error);
  }
}
