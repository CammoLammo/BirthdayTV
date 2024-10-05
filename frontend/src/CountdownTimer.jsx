// CountdownTimer.js
import React, { useState, useEffect } from 'react';
import './CountdownTimer.css';

const CountdownTimer = ({ targetDate, color,  timerName,  endText, earlyText, earlyCutoff }) => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const difference = targetDate - new Date(now.getTime());
    if (difference > 0) {
      const minutes = Math.floor(difference / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      return { minutes, seconds };
    } else {
      return { minutes: 0, seconds: 0 };
    }
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  let displayText;

  if (timeLeft.minutes === 0) {
    displayText = endText;
  } else if(timeLeft.minutes > earlyCutoff) {
    displayText = earlyText;
  }
  else {
    displayText = `${timeLeft.minutes} Minutes Left`
  }

  return (
    <div>
      <p className="timer-title" style={{ color }}>
        {timerName}
      </p>
      <p className="timer-text" style={{ color }}>
        {displayText}
      </p>
    </div>
  );
};

export default CountdownTimer;
