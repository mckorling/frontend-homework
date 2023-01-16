import axios from "axios";
import "../styles/App.css";
import CityInformation from "./CityInformation";
import Forecast from "./Forecast";
import { useEffect, useState } from "react";
import ZipForm from "./ZipForm";

function App() {
  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

  const [currentWeather, setCurrentWeather] = useState({});
  const [weekForecastWeather, setForecastWeather] = useState([]);
  const [toggleData, setToggleData] = useState({});
  const [dayHigh, setDayHigh] = useState(0.0);
  const [dayLow, setDayLow] = useState(0.0);

  const getLocationInformation = (zip) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${API_KEY}&units=imperial`
      )
      .then((response) => {
        let data = response.data;
        setCurrentWeather({
          description: data["weather"][0]["main"],
          temp: data["main"]["temp"],
          location: data["name"],
        });
        setToggleData({
          wind: data["wind"]["speed"],
          sunrise: data["sys"]["sunrise"],
          sunset: data["sys"]["sunset"],
          pressure: data["main"]["pressure"],
          humidity: data["main"]["humidity"],
        });
        getForecast(data["coord"]["lat"], data["coord"]["lon"]);
      })
      .catch((error) => {
        // make pop up alert for invalid zip code / no connection
        console.log(error);
      });
  };

  useEffect(() => {
    getLocationInformation("10036");
  }, []);

  const getForecast = (lat, lon) => {
    console.log(`in getForecast and lat and lon are: ${lat}, ${lon}`);
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,hourly,minutely,alerts&units=imperial&appid=${API_KEY}`
      )
      .then((response) => {
        let data = response.data.daily.slice(0, 7);
        console.log(data);
        const weather = [];
        for (let oneDay of data) {
          weather.push({
            date: oneDay["dt"],
            temp: oneDay["temp"]["day"],
            description: oneDay["weather"]["main"],
          });
        }
        setForecastWeather(weather);
        setDayHigh(data[0]["temp"]["max"]);
        setDayLow(data[0]["temp"]["min"]);
      })
      .catch((error) => {
        console.log(error);
        // make pop up for invalid zip code/no connection
      });
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <CityInformation
        weather={currentWeather}
        toggleData={toggleData}
        low={dayLow}
        high={dayHigh}
        // pass down forecast function
      ></CityInformation>
      <p>day high: {dayHigh}</p>
      <p>day low: {dayLow}</p>
      <ZipForm handleSubmission={getLocationInformation}></ZipForm>
      <Forecast weather={weekForecastWeather}></Forecast>
    </div>
  );
}

export default App;
