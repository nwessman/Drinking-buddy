import json

f = open("output.txt", "r", encoding='utf-8')
airports = json.loads(f.read())
f.close()


f = open("citiesAndCountries.txt", "r", encoding='utf-8')
cities = json.loads(f.read())
f.close()


dict = {}

for cityInfo in cities:
  city = cityInfo["city"].replace('.', '').replace('/','').lower()
  long = cityInfo["lng"]
  lat = cityInfo["lat"]
  country = cityInfo["country"].replace('.', '').replace('/','').lower()
  airport = []
  for airportInfo in airports["Airports"]:
    for airportCity in airportInfo["Cities"]:
      if(city.strip() == airportCity.strip().lower() and country.strip() == airportInfo["Country"].strip().lower()):
        airport.append(airportInfo["AITA"])

  name = city + " ["+country+"]"
  dict[name] = {
    "lng" : long,
    "lat" : lat,
  }
  if(len(airport) > 0):
    dict[name]["airport"] = airport

f = open("citiesCountriesAitaOutput.json","w", encoding='utf-8')
f.write(json.dumps(dict, indent = 3))
f.close() 