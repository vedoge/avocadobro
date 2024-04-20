import requests

url = "https://api.nal.usda.gov/fdc/v1/foods/search"
params = {
    'query': 'cheddar cheese',
    'dataType': 'Branded',
    'pageSize': 25,
    'pageNumber': 2,
    'sortBy': 'dataType.keyword',
    'sortOrder': 'asc',
    'brandOwner': 'Kar Nut Products Company',
    'api_key': 'lDuSAPE57aS7jR78F5VNgXC0ETYI7CbPj9qfvCqH'
}

def calculate_mock_gi(carbs, sugars, fiber):
    # Simplified calculation
    base_gi = 50
    gi = base_gi + (sugars * 2) - fiber
    return gi

def fetch_data():
    response = requests.get(url, params=params)
    if response.status_code == 200:
        data = response.json()
        for food in data['foods']:
            description = food['description']
            carbs = sugars = fiber = 0

            for nutrient in food['foodNutrients']:
                if nutrient['nutrientName'] == 'Carbohydrate, by difference':
                    carbs = nutrient['value']
                elif nutrient['nutrientName'] == 'Total Sugars':
                    sugars = nutrient['value']
                elif nutrient['nutrientName'] == 'Fiber, total dietary':
                    fiber = nutrient['value']

            gi = calculate_mock_gi(carbs, sugars, fiber)
            print(f"Estimated GI for {description} with Carbs: {carbs}g, Sugars: {sugars}g, and Fiber: {fiber}g is {gi}")
    else:
        print("Failed to fetch data from API:", response.status_code)


fetch_data()
