import ZipForm from "./ZipForm";
import ToggleDisplay from "./ToggleDisplay";

const CityInformation = ({ weather, handleSubmission }) => {
  return (
    <section>
      <h2>Current weather in... {weather.location}</h2>
      <ul>
        <li>{weather.description}</li>
        <li>Current Temperature: {weather.temp}</li>
        <li>Today's High: {weather.temp_high}</li>
        <li>Today's Low: {weather.temp_low}</li>
      </ul>
      <ZipForm handleSubmission={handleSubmission}></ZipForm>
      <ToggleDisplay weather={weather}></ToggleDisplay>
    </section>
  );
};

export default CityInformation;
