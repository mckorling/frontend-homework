import Toggle from "./Toggle";
import "../styles/ToggleList.css";

const ToggleList = ({ toggleData }) => {
  const toggleComponenets = toggleData.map((toggle) => (
    <Toggle field={toggle.field} value={toggle.value}></Toggle>
  ));
  return <div className="toggles">{toggleComponenets}</div>;
};

export default ToggleList;
