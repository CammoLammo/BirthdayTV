// BirthdayTitle.js
import React from 'react';
import './BirthdayTitle.css';
import CountdownTimer from './CountdownTimer';

function BirthdayTitle({ name, startDateTime }) {
  console.log(startDateTime);
  startDateTime = new Date(startDateTime);
  console.log(startDateTime);
  const playtimeEnd = new Date(startDateTime.getTime() + 60 * 60 * 1000);
  const partyTimeEnd = new Date(startDateTime.getTime() + 2 * 60 * 60 * 1000);

  return (
    <div className="birthday-container">
      <div className="title-container">
        <h1 className="birthday-title">Happy Birthday</h1>
        <h1 className="birthday-title">{name}!</h1>
      </div>  
      <CountdownTimer targetDate={playtimeEnd} color="#EB4781" timerName="Play Time" endText={`Play Time Over Kids can no longer play`} earlyText={`Not Started please wait for party host`} earlyCutoff={ 60 } />
      <CountdownTimer targetDate={partyTimeEnd} color="#2CF6B3" timerName="Party Room" endText={`Party Time Over Head to desk to pay`} earlyText={`Set up time`} earlyCutoff= { 120 } />
    </div>
  );
}

export default BirthdayTitle;
