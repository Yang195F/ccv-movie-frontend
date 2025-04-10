// SeatLegend.tsx
const SeatLegend = () => {
  return (
    <div className="seat-legend">
      <div className="legend-item">
        <div className="legend-box legend-available" />
        <span>Available</span>
      </div>
      <div className="legend-item">
        <div className="legend-box legend-selected" />
        <span>Selected</span>
      </div>
      <div className="legend-item">
        <div className="legend-box legend-sold" />
        <span>Sold</span>
      </div>
    </div>
  );
};

export default SeatLegend;
