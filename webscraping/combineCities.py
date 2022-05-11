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
    #cityList.append(obj)
    cityList.append([city, country, lat, long, airport])

  #name = city + " ["+country+"]"
  #dict[name] = {
  #  "lng" : long,
  #  "lat" : lat,
  #}
  #if(len(airport) > 0):
  #  dict[name]["airport"] = airport


print(cityList[0])

newList = []
for obj in cityList:
  check = True
  for obj2 in newList:
    if(obj[0] == obj2[0] and obj[1] == obj2[1] and obj[2] != obj2[2]):
      check = False
  if(check == True):
    s = "{ city: \"" + obj[0] +"\", country: \""+obj[1]+"\", lat:"+str(obj[2])+" , lng:"+str(obj[3])+" , AITA: ["
    for aita in obj[4]:
      s += "\""+aita + "\","
    s += "]},\n" 
    newList.append(s)


#cityList.sort()

f = open("cityInfoDB2.js","w", encoding='utf-8')
f.write(''.join(newList))
f.close() 