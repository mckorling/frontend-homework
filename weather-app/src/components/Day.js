import "../styles/Day.css";

const Day = ({ date, temp, description }) => {
  return (
    <div className="oneDay">
      <p id="date">{date}</p>
      <p>{temp}&deg;</p>
      <p>{description}</p>
    </div>
  );
};

export default Day;
