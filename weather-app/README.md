# Welcome to my weather app

## How to run this locally
1. Make sure that `yarn` is [installed](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable)
2. `cd` into `weather-app`
3. run `yarn install`
4. Add a .env file, then add an Open Weather API key as so: `REACT_APP_WEATHER_API_KEY=<API_KEY>`. This key must subscribe to One Call. If not, the 7 day forecast will not load.
5. run `yarn start`
6. Enjoy the simple, yet fully functioning weather app!

Note the sunrise and sunset times are based by user location. They will not adjust to show local time based on current zip code.
