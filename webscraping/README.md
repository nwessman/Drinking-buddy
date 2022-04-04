# Webscrape AITA codes from Wikipedia :chicken:
We needed the AITA codes for each city/airport for Skyscanner API _Best Flights_ search. This adds a directory `webscraping` that contains the two scripts and a json (as txt).

* AITA.py - Script to webscrape all AITA codes from Wikipedia and then writes them as a JSON 
* fillFirebase.py - Script to fill our Firebase with the JSON provided from AITA
* output.txt - The output from AITA, contains all airports in JSON format.

**NOTE 1**
This only needs to be run once by site admin, which already **HAVE** been done. 

**NOTE 2**
The website does not use this code. This folder is just for showcasing and version tracking.

### How to use

1. From folder run: `python -m pip install requirements.txt`
2. Webscrape and write JSON: `python AITA.py`
3. Fill Firebase: `python fillFirebase.py`

