import Toggle from "./Toggle";

const ToggleDisplay = ({ toggleData }) => {
  return (
    <div>
      <h2>More Information</h2>
      <Toggle field="Wind Speed" value={toggleData.wind}></Toggle>
      <Toggle field="Pressure" value={toggleData.pressure}></Toggle>
      <Toggle field="Humidity" value={toggleData.humidity}></Toggle>
      <Toggle field="Sunrise" value={toggleData.sunrise}></Toggle>
      <Toggle field="Sunset" value={toggleData.sunset}></Toggle>
    </div>
  );
};

export default ToggleDisplay;
