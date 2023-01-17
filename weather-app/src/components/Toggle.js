import { useState } from "react";
import "../styles/Toggle.css";

const Toggle = ({ field, value }) => {
  const [toggle, setToggle] = useState(true);
  const handleClick = () => {
    setToggle(!toggle);
  };
  return (
    <div className="oneToggle">
      <button onClick={handleClick}>{field}</button>
      {toggle ? <p>{value}</p> : <p></p>}
    </div>
  );
};

export default Toggle;
