import axios from "axios";
import "../styles/App.css";
import CityInformation from "./CityInformation";
import Forecast from "./Forecast";

function App() {
  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

  const getLocationInformation = ({ zip }) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${API_KEY}`
      )
      .then((response) => {
        let data = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <CityInformation></CityInformation>
      <Forecast></Forecast>
    </div>
  );
}

export default App;
