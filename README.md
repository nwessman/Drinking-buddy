# Travel-buddy :earth_africa:	
## Mid project review 

### Run project by

1. ```npm install```
2. ```npm start```

### Tips for testing the website
Choose larger cities Stockholm/Berlin for example and with short date span. Too large spans of dates won't return hotels. The flight API won't give results if the search is to far ahead in time (a month and more), make the search in close proximity to todays date.

### Short description of your project
The core idea is of the web application is that it will help users to get a more enjoyable travel experience by supplying available flights to their destination as well as giving them options for hotel and activities.  

The user search for where they want to fly from, where they want to fly to and for how long they will stay. They will then be presented with a list of accommodations for their stay, a list of flights and an activity view. The activity view presents the user with a map which can be filtered on the type of activity the user is most interested in right now. 

### What you have done
We have created the ability to search for cities and dates the trip should be during. 

####  The search functionality
The user searches on a city name and we have used a 3rd party component that will autocomplete the city and connect it to a country. We earlier had a problem where the user only searched with city name and because there are many cities that share name across different countries the user often got the wrong city. Our API for the flights need airport codes called AITA. Our accommodation API and our activity component needed coordinates in latitute and longitude to work. But the user only supplies the name of two cities and two dates. So our solution to get AITA codes was to webscrape Wikipedia to get a list of all AITA codes in the world and which cities they belong to. We also found a excel file that mapped cities to coordinates. We created scrips that combined both the AITA codes and the coordinates which gave us a list of almost 5000 cities. Our first solution was to create a Firebase Realtime Database that contained all our city information and then when the user pressed search we did a lookup in our firebase database for the city name and returned the AITA code and coordinates for that city. The problem here was that we had no way of differentiate in which country the city was so the user often got the wrong city.

The solution to this was that instead of having the city information in a firebase database we created a javascript file with the information as a list of objects and loaded it with the website. This file is smaller than most common images so it is a feasable solution. 



We have created the layout for the app which currently has the ability to search for cities and will provide acommodations for the search. The api we used to find acommodations uses latitutes and longitudes to decide which acommodations to display. This created the need for us to translate user input (cities) to coordinates. We did this by webscrape a list of cities, their corresponding coordinates and which airports belong to that city. We then filled a Firebase Database with this information so we can do coordinate and airport look ups on only city name searches.


### Your project file structure (short description/purpose of each file)
```bash
├── public
│   ├── [Contains images and similiar]
├── src
│   ├── images
│   │   ├── [Contains images]
│   ├── react
│   │   ├── AccommodationPresenter.js   // Present accommodation view
│   │   ├── ActivityPresenter.js        // Present activity view
│   │   ├── FlightPresenter.js          // Present flight view
│   │   ├── NavigationPresenter.js      // Present navigation view
│   │   ├── StartSearchPresenter.js     // Present search view
│   │   ├── show.js
│   ├── views
│   │   ├── AccommodationView.js        // Accommodation view
│   │   ├── ActivityView.js             // Activity view
│   │   ├── FlightView.js               // Flight view
│   │   ├── MenuItem.js                 // List of menu items 
│   │   ├── NavigationView.js           // Navigation view
│   │   ├── StartSearchView.js          // The search view
│   │   ├── navigation.js               // Makes search start view
│   ├── App.js                          // App
│   ├── TravelBuddyModel.js             // The apps model, containing application state and functions
│   ├── geoSource.js                    // Fetch from hotel api
│   ├── resolvePromise.js               // Resolve promise
│   ├── 
├── webscraping
│   ├── IATA.py                         // Scrapes Wikipedia for airport AITA codes
│   ├── addCityGeoLocationFirebase.py   // Fill firebase with coordinate data from CSV file
│   ├── combineCities.py                // Combines AITA and coordinate databases to one
│   ├── fillFirebase.py                 // Fills the firebase with the data created in the other files
└
```

### The minimum we expect that you have by deadline is:

:heavy_check_mark:	 That you have setup the basic framework code (e.g. the skeleton)

:heavy_check_mark:	 Have initial layout of your app

:heavy_check_mark:	 Showing the data from at least one API call


------------------------------------------


### Contribution rules

1. Create an Issue and/or assign yourself to the issue.
3. Create a Branch for that issue. Name the branch "#-name-of-issue" where # is issue number.
4. Push your commits to the branch.
5. Pull Request. Write "Resolves #%" where % is the number of the issue in the pull request comment, and a text explaining what you did.
6. Wait for code review.
7. Remove branch after merging.

**Naming conventions**

Issues should be named starting with: "Fix/Add"

Branches should be named: "#-name-of-issue" where # is the issue number.

-----------------------------------------------


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
