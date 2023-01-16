import ToggleDisplay from "./ToggleDisplay";

const CityInformation = ({ weather, toggleData, high, low }) => {
  return (
    <section>
      <h2>Current weather in... {weather.location}</h2>
      <ul>
        <li>Feeling... {weather.description}</li>
        <li>Current Temperature: {weather.temp}</li>
        <li>Today's High: {high}</li>
        <li>Today's Low: {low}</li>
      </ul>
      <ToggleDisplay toggleData={toggleData}></ToggleDisplay>
    </section>
  );
};

export default CityInformation;
