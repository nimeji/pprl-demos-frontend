
# Installation
> cd react \
> npm install


The API URLs are read from environment variables and can be set in an .env file.

`react/.env`
```
REACT_APP_BLOOMFILTER_API = 'https://run.mocky.io/v3/1acd51c3-9f61-4e9a-a235-51986d59d137'
REACT_APP_PPIRL_API = 'ppirl.nimeji.com/api/ppirl'
```

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Available Scripts

In the project directory, you can run:

### `npm run start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.

### `npm run deploy`

Deploys the Application to github pages.

# Docker
You can use the included Dockerfile and docker-compose.yml to run a dockerized version of the app
> docker-compose up

The API URLs can be configured inside `docker-compose.yml`.
Alternatively you can use `docker run` with the `-e` parameter and set the APIs that way.