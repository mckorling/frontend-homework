import Day from "./Day";
import "../styles/Forecast.css";

const Forecast = ({ weather }) => {
  const dayComponents = weather.map((day) => (
    <Day date={day.date} temp={day.temp} description={day.description}></Day>
  ));
  return (
    <div>
      <h2>7 Day Forecast</h2>
      <div className="week">{dayComponents}</div>
    </div>
  );
};

export default Forecast;
