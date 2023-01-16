import { useState } from "react";

const ZipForm = ({ handleSubmission }) => {
  const [currentZip, setCurrentLoc] = useState("");
  const validateZip = (zip) => {
    if (zip.match(/[0-9]{5}/)) {
      return true;
    }
    return false;
  };

  const handleInput = (event) => {
    const inputElement = event.target;
    const value = inputElement.value;
    setCurrentLoc(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateZip(currentZip)) {
      handleSubmission(currentZip); // update today's current weather
      // Need to handle updating 7 day forecast
      console.log(currentZip);
    } else {
      console.log("INVALID ZIP CODE ENTERED");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Zip Code</label>
      <input type="text" onChange={handleInput}></input>
      <input type="submit"></input>
    </form>
  );
};

export default ZipForm;
