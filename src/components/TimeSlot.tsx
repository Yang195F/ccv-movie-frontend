import React from 'react';

interface TimeSlotProps {
  selectedTimeSlot: string;
  setSelectedTimeSlot: (timeSlot: string) => void;
}

const TimeSlot: React.FC<TimeSlotProps> = ({ selectedTimeSlot, setSelectedTimeSlot }) => {
  const timeSlots = [
    '00:00-03:00', '03:00-06:00', '06:00-09:00', '09:00-12:00',
    '12:00-15:00', '15:00-18:00', '18:00-21:00', '21:00-00:00'
  ];

  return (
    <div className="time-slot">
      <label>Time Slot:</label>
      <div className="time-options">
        {timeSlots.map((slot) => (
          <button
            key={slot}
            className={`time-option ${selectedTimeSlot === slot ? 'selected' : ''}`}
            onClick={() => setSelectedTimeSlot(slot)}
          >
            {slot}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimeSlot;