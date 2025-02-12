import axios from "axios";
import "../styles/App.css";
import CurrentInfo from "./CurrentInfo";
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

  useEffect(() => {
    getLocationInformation("10036");
  }, []);

  const getLocationInformation = (zip) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${API_KEY}&units=imperial`
      )
      .then((response) => {
        let data = response.data;
        let description = data["weather"][0]["description"];
        description =
          description.charAt(0).toUpperCase() + description.slice(1);
        setCurrentWeather({
          description: description,
          temp: data["main"]["temp"],
          location: data["name"],
        });
        const currentToggleData = [];
        currentToggleData.push({
          field: "Wind",
          value: `${data["wind"]["speed"]} mph`,
        });
        currentToggleData.push({
          field: "Pressure",
          value: `${data["main"]["pressure"]} hPa`,
        });
        currentToggleData.push({
          field: "Humidity",
          value: `${data["main"]["humidity"]}%`,
        });
        currentToggleData.push({
          field: "Sunrise",
          value: getTime(data["sys"]["sunrise"]),
        });
        currentToggleData.push({
          field: "Sunset",
          value: getTime(data["sys"]["sunset"]),
        });
        setToggleData(currentToggleData);

        getForecast(data["coord"]["lat"], data["coord"]["lon"]);
      })
      .catch((error) => {
        alert("Please enter a valid US zip code or check your connection");
        console.log(error);
      });
  };

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
            date: getDay(oneDay["dt"]),
            temp: oneDay["temp"]["day"],
            description: oneDay["weather"][0]["main"],
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

  const getDay = (time) => {
    const date = new Date(time * 1000);
    const day = date.toDateString();
    return day.slice(0, 3);
  };

  const getTime = (time) => {
    const date = new Date(time * 1000);
    const convertedTime = date.toLocaleTimeString();
    return convertedTime;
  };

  return (
    <div className="App">
      <h1>Weather</h1>
      <CurrentInfo
        weather={currentWeather}
        toggleData={toggleData}
        low={dayLow}
        high={dayHigh}
      ></CurrentInfo>
      <ToggleList toggleData={toggleData}></ToggleList>
      <Forecast weather={weekForecastWeather}></Forecast>
      <ZipForm handleSubmission={getLocationInformation}></ZipForm>
    </div>
  );
}

export default App;
