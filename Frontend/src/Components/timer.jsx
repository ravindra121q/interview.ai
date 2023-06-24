import React, { useState, useEffect } from "react";

export const Timer = ({ count, setCount }) => {
  const [seconds, setSeconds] = useState(120);

useEffect(() => {
  setSeconds(120);

  const timer = setInterval(() => {
    setSeconds((prevSeconds) => {
      if (prevSeconds === 0) {
        setCount((prevCount) => prevCount + 1);
        return 120;
      } else {
        return prevSeconds - 1;
      }
    });
  }, 1000);

  return () => {
    clearInterval(timer);
  };
}, [count, setCount]);


  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return <div>{formatTime(seconds)}</div>;
};
