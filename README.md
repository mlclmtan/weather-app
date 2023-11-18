# Weather App [![Netlify Status](https://api.netlify.com/api/v1/badges/f919c4db-4654-4a7b-a596-a9d3ca81f507/deploy-status)](https://app.netlify.com/sites/malcolm-weather/deploys)
This project is a weather application built with React and Material UI. It uses the Context API for state management and provides a dark and light theme. The main features include a search bar to find weather information for different locations including locate my location, a weather card that displays the current weather information, and a history list that keeps track of the searched locations. The application also uses the notistack library for notifications.

## Features
- Search bar to find weather information for different locations
- Weather card that displays the current weather information
- History list that keeps track of the searched locations
- Dark and light theme
- Notifications using notistack library

## Live Demo
[View app here](https://weather.malcolmtan.click/)

<img src="https://github.com/mlclmtan/weather-app/blob/main/public/Desktop-Light.jpg" width="500"><img src="https://github.com/mlclmtan/weather-app/blob/main/public/Desktop-Dark.jpg" width="500">

<img src="https://github.com/mlclmtan/weather-app/blob/main/public/Mobile-Light.jpg" width="300"><img src="https://github.com/mlclmtan/weather-app/blob/main/public/Mobile-Dark.jpg" width="300">
## Future Improvements
#### Todo
- ✅Auto dark mode
- ✅autocomplete dropdown list of cities (debounced)
- ✅error code/message handling
- Manual toggle dark mode
- Minify / Purge CSS
- Hide api key, create backend proxy
- Refactor font family in theme
- Units conversion (metric/imperial)
- Refactor code
- Make search history persistent
- Set up development container of this react application
- Add loader at initial visit
#### Issue
- Inconsistent weather result using location coordinate from /geo endpoint

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
