# Bogus News

A front-end app built with React.js which is served by my RESTful API, details of which can be found in my GitHub repository [here](https://github.com/alvincentinio/ncnews). Bogus News is a reddit-style website which allows users to post articles and comments in different topics and also vote these articles and comments up and down. Users can also create new topics and new users can be added to the database.

The hosted ncnews API is hosted on Heroku [here](https://alcrewe-news.herokuapp.com/api)

This front-end app is hosted on netlify [here](https://bogusnews.netlify.com/)

### Installing

Clone this repository:

```
git clone https://github.com/alvincentinio/bogusnews.git
```

Install the package dependencies:

```
npm install
```

Start the development server:

```
npm start
```

The app should now open in a new browser window. Alternatively please enter this in the browser

```
http://localhost:3000/

```

## Built With

- [ReactJs](https://reactjs.org/) - A JavaScript library for building user interfaces
- [Reach Router](https://reach.tech/router) - Enables routing and linking within a ReactJs app
- [axios](https://github.com/axios/axios) - Make http requests from node.js
- [react-chartjs-2](https://github.com/jerairrest/react-chartjs-2) - React wrapper for Chart.js 2
- [React-moment](https://www.npmjs.com/package/react-moment) - Parse, validate, manipulate, and display dates and times in JavaScript

## Deployment on Netlify

Redirects
Add a file, \_redirects (no file extension) to your public directory. This file should contain the redirect rule: /\* /index.html 200. This is telling Netlify "if a request comes in to any endpoint on our base url - serve our index.html page and give a 200 status". We put this in the public directory to ensure that Webpack includes this file in the production build of the app.

Create a Build Version

```
npm run build
```

This script uses Webpack and Babel to "bundle" your code into a few uglified files that can be read by most modern browsers. Take a look inside - but don't change anything.

Create a Netlify Account
Install Netfify's CLI

```
npm install netlify-cli -g
```

Deploy a Draft Version

```
netlify deploy
```

- Authorise Netlify with GitHub, following the prompts in the browser.
- Select Create & configure a new site.
- Provide your choice of site name.
- Select your personal account.
- Provide a deploy path. This needs to point to your build directory and should be ./build.

Your draft version should now be deployed on a url, e.g. https://5c13ab16055b9be1725868e6--your-site-name.netlify.com. Test it out, make sure that everything is working as expected.

Deploy a Production Version

```
netlify deploy --prod
```

Specify your build path again. This will deploy the site to your actual url: https://your-site-name.netlify.com.

## Authors

- **Alistair Crewe**

## Acknowledgments

- Thanks to all the staff at Northcoders.
