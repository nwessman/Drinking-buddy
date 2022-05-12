import pandas as pd
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
import json
data= pd.read_csv("worldcities.csv", usecols=["city","country","lat", "lng"])
cities = json.loads(data.to_json(orient='records'))
# print(cities)
f = open("citiesAndCountries.txt", "w", encoding='utf-8')
f.write(json.dumps(cities))
f.close()

