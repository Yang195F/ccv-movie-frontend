import React from "react";

interface TicketPricesProps {
  ticketPriceAdult: string;
  ticketPriceChild: string;
  ticketPriceOKU: string;
  setTicketPriceAdult: React.Dispatch<React.SetStateAction<string>>;
  setTicketPriceChild: React.Dispatch<React.SetStateAction<string>>;
  setTicketPriceOKU: React.Dispatch<React.SetStateAction<string>>;
}

const TicketPrices: React.FC<TicketPricesProps> = ({
  ticketPriceAdult,
  ticketPriceChild,
  ticketPriceOKU,
  setTicketPriceAdult,
  setTicketPriceChild,
  setTicketPriceOKU,
}) => {
  return (
    <div className="ticket-prices">
      <label>Ticket Price :</label>
      <div>
        <label>Adult:</label>
        <input type="text" value={ticketPriceAdult} onChange={(e) => setTicketPriceAdult(e.target.value)} />
      </div>
      <div>
        <label>Child:</label>
        <input type="text" value={ticketPriceChild} onChange={(e) => setTicketPriceChild(e.target.value)} />
      </div>
      <div>
        <label>OKU:</label>
        <input type="text" value={ticketPriceOKU} onChange={(e) => setTicketPriceOKU(e.target.value)} />
      </div>
    </div>
  );
};

export default TicketPrices;
