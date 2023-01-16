import { useState } from "react";

const Toggle = ({ field, value }) => {
  const [toggle, setToggle] = useState(true);
  const handleClick = () => {
    setToggle(!toggle);
  };
  return (
    <div>
      <button onClick={handleClick}>{field}</button>
      {toggle ? <p>{value}</p> : <p></p>}
    </div>
  );
};

export default Toggle;
