import requests
import difflib

def fetch_nutrient_data(api_key, food_query, partial_description):
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
        foods_data = response.json().get('foods', [])

        descriptions = [food['description'] for food in foods_data]
        closest_description = difflib.get_close_matches(partial_description, descriptions, n=1, cutoff=0.3)
        if closest_description:
            target_food = next(food for food in foods_data if food['description'] == closest_description[0])
            return target_food
        else:
            return None
    else:
        return None

def extract_nutrients(food):
    if food:
        print(f"Description: {food['description']}")
        for nutrient in food['foodNutrients']:
            if nutrient['nutrientName'] in ['Carbohydrate, by difference', 'Total Sugars', 'Fiber, total dietary']:
                print(f"{nutrient['nutrientName']}: {nutrient['value']} {nutrient['unitName']}")
        print("-" * 50)
    else:
        print("No matching food found based on the description.")

api_key = 'lDuSAPE57aS7jR78F5VNgXC0ETYI7CbPj9qfvCqH'
food_query = 'cheddar cheese'
partial_description = "MILD CHEDDAR SHREDDED CHEESE"

specific_food = fetch_nutrient_data(api_key, food_query, partial_description)
extract_nutrients(specific_food)
