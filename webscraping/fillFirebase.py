import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
import json

# Fetch the service account key JSON file contents
cred = credentials.Certificate('./travelbuddy-700b8-firebase-adminsdk-rimpp-d82b8f7841.json')

# Initialize the app with a custom auth variable, limiting the server's access
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://travelbuddy-700b8-default-rtdb.europe-west1.firebasedatabase.app',

})

# The app only has access as defined in the Security Rules
ref = db.reference() #'travelbuddy-700b8-default-rtdb'

f = open("combinedOutput.txt", "r", encoding='utf-8')

airports = json.loads(f.read())
f.close()

ref.set(airports)
