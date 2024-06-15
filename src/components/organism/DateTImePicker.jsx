// DateTimePicker.js
import React from 'react';
import { DatePicker, TimePicker } from 'antd';
import moment from 'moment'; // Import moment for date and time manipulation

const DateTimePicker = ({ value, onChange }) => {
  const handleDateChange = (date) => {
    const combinedDateTime = moment(date).set({
      hour: value ? value.hour() : 0,
      minute: value ? value.minute() : 0,
    });

    onChange(combinedDateTime);
  };

  // Handle time change
  const handleTimeChange = (time) => {
    // Combine the selected time with the existing date
    const combinedDateTime = moment(value).set({
      hour: time.hour(),
      minute: time.minute(),
    });

    onChange(combinedDateTime);
  };

  return (
    <div>
      <DatePicker
        value={value}
        onChange={handleDateChange}
        showTime // Show time picker within the date picker
        format="YYYY-MM-DD HH:mm" // Customize the display format
      />
      <TimePicker
        value={value}
        onChange={handleTimeChange}
        format="HH:mm" // Customize the time format
      />
    </div>
  );
};

export default DateTimePicker;
