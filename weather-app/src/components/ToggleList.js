import Toggle from "./Toggle";

const ToggleList = ({ toggleData }) => {
  const toggleComponenets = toggleData.map((toggle) => (
    <Toggle field={toggle.field} value={toggle.value}></Toggle>
  ));
  return (
    <div>
      <h2>More Information</h2>
      {toggleComponenets}
    </div>
  );
};

export default ToggleList;
