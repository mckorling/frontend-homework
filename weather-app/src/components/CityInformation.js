import PropTypes from "prop-types";
import ZipForm from "./ZipForm";
import ToggleDisplay from "./ToggleDisplay";

const CityInformation = (props) => {
  return (
    <section>
      <h2>Current Weather... in "New York"</h2>
      <ul>
        <li>Sky</li>
        <li>Temp</li>
        <li>Location</li>
        <li>Today's high</li>
        <li>Today's low</li>
      </ul>
      <ZipForm></ZipForm>
      <ToggleDisplay></ToggleDisplay>
    </section>
  );
};

export default CityInformation;
