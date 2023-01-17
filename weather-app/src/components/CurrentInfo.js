import "../styles/CurrentInfo.css";

const CurrentInfo = ({ weather, high, low }) => {
  return (
    <section>
      <h2>
        {weather.description} in <span id="location">{weather.location}</span>
      </h2>
      <ul className="list">
        <li>Now: {weather.temp}&deg;</li>
        <li>High: {high}&deg;</li>
        <li>Low: {low}&deg;</li>
      </ul>
    </section>
  );
};

export default CurrentInfo;
