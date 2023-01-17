import { useState } from "react";

const ZipForm = ({ handleSubmission }) => {
  const [currentZip, setCurrentLoc] = useState("");

  const validateZip = (zip) => {
    if (zip.length === 5 && zip.match(/[0-9]/)) {
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
      handleSubmission(currentZip);
    } else {
      console.log("INVALID ZIP CODE ENTERED");
      alert("You must enter a 5-digit US zip code");
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
