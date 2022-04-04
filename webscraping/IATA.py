import requests
from bs4 import BeautifulSoup
import re
import json

alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

base_URL = "https://en.wikipedia.org/wiki/List_of_airports_by_IATA_airport_code:_"

f = open("output.txt","w", encoding='utf-8')


output = '{\n"Airports":['

for letter in alphabet:
  URL = base_URL + letter
  page = requests.get(URL)

  soup = BeautifulSoup(page.content, "html.parser")

  table = soup.find("table", {"class":"wikitable sortable"})
  table_body = table.find('tbody')
  rows = table_body.find_all('tr')

  

  for row in rows:
    columns = row.find_all('td')
    if(len(columns) >= 4):
      output += '{ \n'
      output += '"AITA":"' + re.sub("[\(\[].*?[\)\]]", "", columns[0].text.strip()) + '",\n'
      output += '"Airport":"' +  re.sub("[\(\[].*?[\)\]]", "", columns[2].text.strip()).replace('"',"'") + '",\n'
      dest = re.sub("[\(\[].*?[\)\]]", "", columns[3].text.strip()).split(",")
      output += '"Cities":['
      for index, value in enumerate(dest):
        if(index == len(dest) - 1):
          break
        output += '"'+ value +'"'
        if(index < len(dest) - 2):
          output += ','
      output += '],\n'
      output += '"Country":"' + dest[len(dest)-1] + '"\n'
      output += '},'

output = output[:-1]
output += ']\n}'
f.write(output)
f.close() 