## Image search by Unsplash-API
Image search by Unsplash-API **(ISU)** is a simple web-based application. ISU allows users to search for images through Unsplash's provided API

## Feature
👉 Visit it <a href="https://shearching-photos.vercel.app/">here</a> to experience the application.
<br>

## Tech/framework used
This application uses **NextJs** which is a React Framework, uses **Tailwind** CSS framework to design and this project is written mainly in **Typescript** language.

## Installation

1. Go into the project root
2. `yarn`  to install the website's npm dependencies

### Setup ENV

First you need to add some environmental values. Create an environment variable named **.env.local** or **.env.development.local** for deployment. During deployment to the main product you can create a filename .env.production.local

Read more about nextJs environment variable <a href="https://nextjs.org/docs/basic-features/environment-variables">here</a>

To initialize Unsplash using your client ID:

```bash
REACT_APP_UNSPLASH_KEY=90d***********************************e682 // Your clientId here
REACT_APP_API_UNSPLASH=https://api.unsplash.com/
```
This must be done for any of the following functions to return results. Client IDs can be obtained by signing up for the
<a href="https://unsplash.com/developers">Unsplash REST API</a>

### Running locally
1. `yarn dev` to start the hot-reloading development server
2. open http://localhost:3000 to open the site in your favorite browser (default port is 3000)

### Build and running production 
1. `yarn build` to build and bundle all project
2. `yarn start` and opening http://localhost:3000 to open the project as production

## Tests
To test all component of this project type `yarn test`. User **Jest Testing Framework** to test behavior of all component. 
But in this version, I haven't done the testing with components yet, and i will try to do it in the next development


## License
2021 © [Sonduong]()