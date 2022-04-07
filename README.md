# Travel-buddy :earth_africa:	
## Mid project review 
### Short description of your project
The core idea is to create a web application that will help users to get a more enjoyable travel experience by creating a route of their flights as well as giving them options for hotel and activities.  

* These options will be created based on:
* The users’ current position &  where the user want to travel
* The users’ preference on which activities they prefer
* The users’ preference on budget for accommodation & flights

These options will together create a summary list of their chosen flight, hotel and activity.

### What you have done
We have created the layout for the app which currently has the ability to search for cities and will provide acommodations for the search. The api we used to find acommodations uses latitutes and longitudes to decide which acommodations to display. This created the need for us to translate user input (cities) to coordinates. We did this by webscrape a list of cities, their corresponding coordinates and which airports belong to that city. We then filled a Firebase Database with this information so we can do coordinate and airport look ups on only city name searches.

### What you still plan to do
Our app only shows acommodations on searches now. We are going to extend this to flights and activities as well. Our flight api is based on aiport AITA codes, that is why we also already have that in our database.
We also plan on having some sort of persistency by allowing users to log in and save their plans.

### Your project file structure (short description/purpose of each file)
```bash
├── public
│   ├── [Contains images and similiar]
├── src
│   ├── images
│   │   ├── [Contains images]
│   ├── react
│   │   ├── AcommodationPresenter.js
│   │   ├── ActivityPresenter.js
│   │   ├── FlightPresenter.js
│   │   ├── NavigationPresenter.js
│   │   ├── StartSearchPresenter.js
│   │   ├── show.js
│   ├── views
│   │   ├── AcommodationView.js
│   │   ├── ActivityView.js
│   │   ├── FlightView.js
│   │   ├── MenuItem.js
│   │   ├── NavigationView.js
│   │   ├── StartSearchView.js
│   │   ├── navigation.js
│   ├── App.js
│   ├── App.test.js
│   ├── TravelBuddyModel.js
│   ├── firebaseConfig.js
│   ├── geoSource.js
│   ├── resolvePromise.js
│   ├── 
├── public
│   ├──
└
```
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
