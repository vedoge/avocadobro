import requests

def fetch_nutrient_data(api_key, food_query):
    base_url = "https://api.nal.usda.gov/fdc/v1/foods/search"
    params = {
        "query": food_query,
        'dataType': 'Branded',
        'pageSize': 25,
        'pageNumber': 2,
        'sortBy': 'dataType.keyword',
        'sortOrder': 'asc',
        'brandOwner': 'Kar Nut Products Company',
        "api_key": api_key
    }
    response = requests.get(base_url, params=params)
    if response.status_code == 200:
        return response.json()
    else:
        return None

def extract_nutrients(food_data):
    if food_data and 'foods' in food_data:
        for food in food_data['foods']:
            print(f"Description: {food['description']}")
            for nutrient in food['foodNutrients']:
                if nutrient['nutrientName'] in ['Carbohydrate, by difference', 'Total Sugars', 'Fiber, total dietary']:
                    print(f"{nutrient['nutrientName']}: {nutrient['value']} {nutrient['unitName']}")
            print("-" * 50)

api_key = 'lDuSAPE57aS7jR78F5VNgXC0ETYI7CbPj9qfvCqH'
food_query = 'cheddar cheese'
food_data = fetch_nutrient_data(api_key, food_query)
extract_nutrients(food_data)
