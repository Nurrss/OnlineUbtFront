import React, { useState, useEffect } from 'react';

export const TimerComponent = ({ initialTime }) => {
  const [remainingTime, setRemainingTime] = useState(parseTime(initialTime));

  function parseTime(timeString) {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  }

  function formatTime(seconds) {
    const formattedHours = Math.floor(seconds / 3600);
    const formattedMinutes = Math.floor((seconds % 3600) / 60);
    const formattedSeconds = seconds % 60;
    return `${formattedHours}:${formattedMinutes < 10 ? '0' : ''}${formattedMinutes}:${formattedSeconds < 10 ? '0' : ''}${formattedSeconds}`;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => Math.max(0, prevTime - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <p>{formatTime(remainingTime)}</p>
    </div>
  );
};
