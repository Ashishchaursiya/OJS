// import React from "react";

import { useState } from "react";

const Circle = ({ color,selecetedColor,key }) => {
  const [activeIndex, setActiveIndex] = useState(null);
   
    const circleStyle = {
      backgroundColor: color,
      display: "inline-block",
      width: "25px",
      height: "25px",
      borderRadius: "50%",
      margin:"2px"
    };
  
    return <div      className={`mycircle ${activeIndex === key ? 'myactive' : ''}`}    style={circleStyle} onClick={() =>{ selecetedColor(color);setActiveIndex(key)}}></div>;
  };
  
  export default Circle;
  