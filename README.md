# NC Knews

## Front end.

NC Knews is a news single page webapp, built with React. It pulls data from the NC Knews API to display articles, users and comments. Users can register to post articles and comments, and up/downvote them to express their opinion.

##Using the site
NC Knews front end is available as a live site at [this netlify link](https://nc-knews.netlify.com) and the repo is (this page) available [here](https://github.com/RobFairclough/NC-Knews).
The back-end API is available live at [this heroku link](https://ncknewsrob.herokuapp.com/api) and the repo is available [here](https://github.com/robfairclough/NC-News).
You don't need to log in to view articles or comments, but to post an article or comment, or vote on one you'll need to either create an account or log in to an existing one.
These are a few users that are pre-made to log in as.

```
  tickle122 : password
  grumpy19 : password
  happyamy2016 : password
  cooljmessy : password
```

To log in or register, navigate to the login page via the link in the header or the hamburger menu at the top-left of the page.

To register, click the register button below login, and enter your details. User passwords are stored as hashes encrypted with a JavaScript Web Token.

To log in, enter a username and password from above, or your newly created login information.

On success, you'll now be free to post your own articles (link in the hamburger menu) or comment/vote on existing ones. You can access these articles through the homepage or the articles section.

In the articles page, you can select a topic to filter only articles of that topic, or apply sort criteria or a limit.

When posting a new article, you must first select an existing topic or create a new one in the top half of the page. After that, you're free to enter your article's headline and body, and hit post! Following which your article will be live on the site and ready to view.

When viewing an article's page, you may want to read comments or leave one yourself! This is easily done in the comment section at the bottom. Voting is available on both the article and its comments.

## Getting started locally

To get your own local copy of the site running, first fork and clone this repo to your local machine.
After you've got the repo cloned, navigate to the repo folder in your terminal and run
`npm install`.

### Dependencies

The site is built with (at time of writing) the latest version of React, 16.8.0, and uses Hooks which are a feature of this version, so at a minimum you must be running React and React-DOM 16.8.0, and React-Scripts at ^2.1.3.

The site also has the following dependencies

```js
"@reach/router": "^1.2.1"
"axios": "^0.18.0"
```

To run the util function tests, you can simply run `npm test` and to run the integration tests on the website, you'll need the dev dependency Cypress at version 3.1.5 or above.
To run the integration tests, `npm install cypress` then use `npm run cy:open` and select the app.spec.js file in the Cypress window that opens.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Deployment

This version of the site is hosted live on Netlify. To host your own version on netlify, you can follow these steps:

1. Install the Netlify CLI by running `sudo npm i -g netlify`
2. Make sure you're in the local project folder
3. Run `netlify login` in your terminal to sign in to your Netlify account - or create one.
4. Run `netlify deploy` and follow the instructions in the CLI to host the site.
5. Done! You should now be able to view the live version of your site.

## Built with

[Create React App](https://github.com/facebook/create-react-app) - Used to bootstrap the app and streamline the creation process.
[Axios](https://www.npmjs.com/package/axios) - Used to send requests to the backend API
[Reach/Router](https://github.com/reach/router) - Used for routing the site
[Cypress](https://cypress.io) - Used for integration testing of the site.
[Jest](https://jestjs.io) - Test suite used for unit testing the utility functions

## Contributing

If you feel there's something missing, or that can be improved feel free to submit an issue, pull request or create your own fork.

## Authors

- Rob Fairclough _initial work_ - [Github](https://github.com/robfairclough)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

- Northcoders
