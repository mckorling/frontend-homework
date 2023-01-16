const Forecast = ({ weather }) => {
  return (
    <div>
      <p>Display 7 day forecast here</p>
      <p>Day 1</p>
      <p>{weather[0]["temp"]}</p>
    </div>
  );
};

export default Forecast;
