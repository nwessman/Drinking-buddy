import json

f = open("output.txt", "r", encoding='utf-8')
airports = json.loads(f.read())
f.close()


f = open("citiesAndCountries.txt", "r", encoding='utf-8')
cities = json.loads(f.read())
f.close()


cityList = []

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

  obj = "{ city: \"" + city +"\", country: \""+country+"\", lat:"+str(lat)+" , lng:"+str(long)+" , AITA: ["
  for aita in airport:
    obj += "\""+aita + "\","
  obj += "]},\n"
  if(len(airport) > 0):
    cityList.append(obj)
  #name = city + " ["+country+"]"
  #dict[name] = {
  #  "lng" : long,
  #  "lat" : lat,
  #}
  #if(len(airport) > 0):
  #  dict[name]["airport"] = airport

cityList.sort()
f = open("cityInfoDB.js","w", encoding='utf-8')
f.write(''.join(cityList))
f.close() 