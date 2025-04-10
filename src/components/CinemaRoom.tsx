import React from 'react';

interface CinemaRoomProps {
  selectedRoom: string;
  setSelectedRoom: (room: string) => void;
}

const CinemaRoom: React.FC<CinemaRoomProps> = ({ selectedRoom, setSelectedRoom }) => {
  const rooms = ['Room 1', 'Room 2', 'Room 3', 'Room 4'];

  return (
    <div className="cinema-room">
      <label>Cinema Room:</label>
      <div className="room-options">
        {rooms.map((room) => (
          <button
            key={room}
            className={`room-option ${selectedRoom === room ? 'selected' : ''}`}
            onClick={() => setSelectedRoom(room)}
          >
            {room}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CinemaRoom;