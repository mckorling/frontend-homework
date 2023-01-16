import axios from "axios";
import "../styles/App.css";
import CityInformation from "./CityInformation";
import Forecast from "./Forecast";
import { useEffect, useState } from "react";
import ZipForm from "./ZipForm";
import ToggleList from "./ToggleList";

function App() {
  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

  const [currentWeather, setCurrentWeather] = useState({});
  const [weekForecastWeather, setForecastWeather] = useState([]);
  const [toggleData, setToggleData] = useState([]);
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
        const currentToggleData = [];
        currentToggleData.push({ field: "Wind", value: data["wind"]["speed"] });
        currentToggleData.push({
          field: "Pressure",
          value: data["main"]["pressure"],
        });
        currentToggleData.push({
          field: "Humidity",
          value: data["main"]["humidity"],
        });
        currentToggleData.push({
          field: "Sunrise",
          value: data["sys"]["sunrise"],
        });
        currentToggleData.push({
          field: "Sunset",
          value: data["sys"]["sunset"],
        });
        setToggleData(currentToggleData);

        getForecast(data["coord"]["lat"], data["coord"]["lon"]);
      })
      .catch((error) => {
        alert("Please enter a valid US zip code or check your connection");
        console.log(error);
      });
  };

  useEffect(() => {
    getLocationInformation("10036");
  }, []);

  const getForecast = (lat, lon) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,hourly,minutely,alerts&units=imperial&appid=${API_KEY}`
      )
      .then((response) => {
        let data = response.data.daily.slice(0, 7);

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
        // any alert is handled by first call in getLocationInformation
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
      ></CityInformation>
      <ToggleList toggleData={toggleData}></ToggleList>
      <ZipForm handleSubmission={getLocationInformation}></ZipForm>
      <Forecast weather={weekForecastWeather}></Forecast>
    </div>
  );
}

export default App;
