import json

f = open("output.txt", "r", encoding='utf-8')
airports = json.loads(f.read())
f.close()


f = open("cityoutput.txt", "r", encoding='utf-8')
cities = json.loads(f.read())
f.close()


dict = {}

for cityInfo in cities:
  city = cityInfo["city"].replace('.', '').replace('/','')
  long = cityInfo["lng"]
  lat = cityInfo["lat"]
  airport = []
  for airportInfo in airports:
    for airportCity in airportInfo["Cities"]:
      if(city.strip() == airportCity.strip()):
        airport.append(airportInfo["AITA"])

  dict[city] = {
    "lng" : long,
    "lat" : lat,
  }
  if(len(airport) > 0):
    dict[city]["airport"] = airport

f = open("combinedOutput.json","w", encoding='utf-8')
f.write(json.dumps(dict, indent = 3))
f.close() 