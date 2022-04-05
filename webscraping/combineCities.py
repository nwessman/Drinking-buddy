import json

f = open("output.txt", "r", encoding='utf-8')
airports = json.loads(f.read())
f.close()


f = open("cityoutput.txt", "r", encoding='utf-8')
cities = json.loads(f.read())
f.close()

output = "{"


for cityInfo in cities:
  city = cityInfo["city"]
  long = cityInfo["lng"]
  lat = cityInfo["lat"]
  airport = []
  for airportInfo in airports:
    for airportCity in airportInfo["Cities"]:
      if(city.strip() == airportCity.strip()):
        airport.append(airportInfo["AITA"])
  output +=  '"'+city+'":{'
  output += '"lat" : "' + str(lat) + '",'
  output += '"lng" : "' + str(long) + '"'
  if(len(airport) > 0):
    output += ',"airport" : ['
    for index, value in enumerate(airport):
      output += '"'+value+'"'
      if(index < len(airport) - 1):
        output += ','
    output += ']'
  output += "},"

  #print("city: " + city + " long: " + str(long) + " lat: " + str(lat) + " airport: " + str(airport))


for key in airports:
  #print(str(key["Cities"]))
  for city in key["Cities"]:
    #print(city)
    if("Tokyo" == city.strip()):
      print("Hit!: " + str(key))

output = output[:-1]
output += "}" 


f = open("combinedOutput.txt","w", encoding='utf-8')
f.write(output)
f.close() 