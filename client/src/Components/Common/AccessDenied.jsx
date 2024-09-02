import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

function AccessDenied() {
  const [cx, setCx] = useState(130);
  const [cy, setCy] = useState(65);
  const navigate = useNavigate();

  useEffect(() => {
    const root = document.documentElement;
    const eyef = document.getElementById("eyef");

    const handleMouseMove = (evt) => {
      let x = evt.clientX / window.innerWidth;
      let y = evt.clientY / window.innerHeight;

      root.style.setProperty("--mouse-x", x);
      root.style.setProperty("--mouse-y", y);

      setCx(115 + 30 * x);
      setCy(50 + 30 * y);
      eyef.setAttribute("cx", cx);
      eyef.setAttribute("cy", cy);
    };

    const handleTouchMove = (touchHandler) => {
      let x = touchHandler.touches[0].clientX / window.innerWidth;
      let y = touchHandler.touches[0].clientY / window.innerHeight;

      root.style.setProperty("--mouse-x", x);
      root.style.setProperty("--mouse-y", y);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("touchmove", handleTouchMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, [cx, cy]);

  const handleGoBack = (e) => {
    e.preventDefault();
    navigate(-1); // This will take the user back to the previous page
  };

  return (
    <div className="denied">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        id="robot-error"
        viewBox="0 0 260 118.9"
        role="img"
      >
        <defs>
          <clipPath id="white-clip">
            <circle id="white-eye" fill="#cacaca" cx="130" cy="65" r="20" />
          </clipPath>
          <text id="text-s" className="error-text" y="106">
            403
          </text>
        </defs>
        <path
          className="alarm"
          fill="#e62326"
          d="M120.9 19.6V9.1c0-5 4.1-9.1 9.1-9.1h0c5 0 9.1 4.1 9.1 9.1v10.6"
        />
        <use href="#text-s" x="-0.5px" y="-1px" fill="black" />
        <use href="#text-s" fill="#2b2b2b" />
        <g id="robot">
          <g id="eye-wrap">
            <use href="#white-eye" />
            <circle
              id="eyef"
              className="eye"
              clipPath="url(#white-clip)"
              fill="#000"
              stroke="#2aa7cc"
              strokeWidth="2"
              strokeMiterlimit="10"
              cx="130"
              cy="65"
              r="11"
            />
            <ellipse
              id="white-eye"
              fill="#2b2b2b"
              cx="130"
              cy="40"
              rx="18"
              ry="12"
            />
          </g>
          <circle className="lightblue" cx="105" cy="32" r="2.5" id="tornillo" />
          <use href="#tornillo" x="50" />
          <use href="#tornillo" x="50" y="60" />
          <use href="#tornillo" y="60" />
        </g>
      </svg>

      <h1 style={{color:"black", fontFamily:"fantasy", wordSpacing:"10px"}}>You are not allowed to enter here</h1>
      <h2  style={{color:"black ", fontFamily:"fantasy", wordSpacing:"10px"}}>
        Go{" "}
        <a href="" onClick={handleGoBack}>
          Back!
        </a>
      </h2>
    </div>
  );
}

export default AccessDenied;
