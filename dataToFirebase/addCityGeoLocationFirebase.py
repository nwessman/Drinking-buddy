# import pandas as pd
# import firebase_admin
# from firebase_admin import credentials
# from firebase_admin import db
# import json

# data= pd.read_csv("worldcities.csv", usecols=["city", "lat", "lng"])
# cities = json.loads(data.to_json(orient='records'))


# # print(cities)

# f = open("cityoutput.txt", "w", encoding='utf-8')

# f.write(json.dumps(cities))
# f.close()
# # Fetch the service account key JSON file contents
# cred = credentials.Certificate('../webscraping/travelbuddy-700b8-firebase-adminsdk-rimpp-d82b8f7841.json')

# # Initialize the app with a custom auth variable, limiting the server's access
# firebase_admin.initialize_app(cred, {
#     'databaseURL': 'https://travelbuddy-700b8-default-rtdb.europe-west1.firebasedatabase.app',

# })

# # The app only has access as defined in the Security Rules
# ref = db.reference("Cities") #'travelbuddy-700b8-default-rtdb'

# ref.set(cities)