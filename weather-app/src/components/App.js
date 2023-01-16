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
          temp_high: data["main"]["temp_max"],
          temp_low: data["main"]["temp_min"],
          location: data["name"],
        });
        setToggleData({
          wind: data["wind"]["speed"],
          sunrise: data["sys"]["sunrise"],
          sunset: data["sys"]["sunset"],
          pressure: data["main"]["pressure"],
          humidity: data["main"]["humidity"],
        });
      })
      .catch((error) => {
        // make pop up alert for invalid zip code / no connection
        console.log(error);
      });
  };

  useEffect(() => {
    getLocationInformation("10036");
    // getForecast("10036");
    // display 7 day forecast
  }, []);

  // Add function to pull in and update the 7 day forecast
  // Want to show weather description, day's temp, for now
  // api.openweathermap.org/data/2.5/forecast/daily?lat=44.34&lon=10.99&cnt=7&appid=
  // `https://api.openweathermap.org/data/2.5/forecast/daily?zip=${zip},us&cnt=7&appid=${API_KEY}&units=imperial`
  const getForecast = (zip) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?zip=${zip},us&cnt=7&appid=${API_KEY}&units=imperial`
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
        // pass down forecast function
      ></CityInformation>
      <ZipForm handleSubmission={getLocationInformation}></ZipForm>
      <Forecast weather={weekForecastWeather}></Forecast>
      {/* pass in forecast data */}
    </div>
  );
}

export default App;
