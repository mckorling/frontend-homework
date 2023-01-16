const Day = ({ date, temp, description }) => {
  return (
    <div>
      <p>{date}</p>
      <p>{temp}</p>
      <p>{description}</p>
    </div>
  );
};

export default Day;
