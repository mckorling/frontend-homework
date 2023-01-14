import axios from "axios";
import "../styles/App.css";
import CityInformation from "./CityInformation";
import Forecast from "./Forecast";
import { useEffect, useState } from "react";

function App() {
  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

  const [weatherData, setWeatherData] = useState({});

  const getLocationInformation = (zip) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${API_KEY}&units=imperial`
      )
      .then((response) => {
        let data = response.data;
        setWeatherData({
          description: data["weather"][0]["main"],
          temp: data["main"]["temp"],
          temp_high: data["main"]["temp_max"],
          temp_low: data["main"]["temp_min"],
          location: data["name"],
          wind: data["wind"]["speed"],
          sunrise: data["sys"]["sunrise"],
          sunset: data["sys"]["sunset"],
          pressure: data["main"]["pressure"],
          humidity: data["main"]["humidity"],
        });
        console.log(weatherData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getLocationInformation("10036");
  }, []);

  return (
    <div className="App">
      <h1>Weather App</h1>
      <h2>{weatherData.location}</h2>
      <CityInformation weather={weatherData}></CityInformation>
      <Forecast></Forecast>
    </div>
  );
}

export default App;
