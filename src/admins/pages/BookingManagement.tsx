// "use client"

// import { useState, useEffect } from "react"
// import NavbarAdmin from "../../components/NavbarAdmin"
// import Seat from "../../components/Seat"
// import SeatLegend from "../../components/SeatLegend"
// import ScheduleControls from "../../components/ScheduleControls"
// import ScreenHeader from "../../components/ScreenHeader"
// import "../styles/BookingManagement.css"
// import { mockMovies, mockCinemas, mockSeats } from "../../data/mockData"
// import { generateMockSeats } from "../../data/generateMockSeats"

// interface AdminSeatData {
//   id: string
//   row: string
//   number: number
//   status: "available" | "sold" // For Seat component
//   actualStatus: "available" | "reserved" | "sold" // Internal tracking
//   username: string
// }

// const BookingManagement = () => {
//   const [selectedMovie, setSelectedMovie] = useState("")
//   const [selectedLocation, setSelectedLocation] = useState("")
//   const [selectedDate, setSelectedDate] = useState("")
//   const [selectedTime, setSelectedTime] = useState("")
//   const [seats, setSeats] = useState<AdminSeatData[][]>([])
//   const [selectedSeat, setSelectedSeat] = useState<{ row: number; col: number } | null>(null)
//   const [showDetails, setShowDetails] = useState(false)

//   // Initialize seats based on selection
//   useEffect(() => {
//     if (selectedMovie && selectedLocation && selectedDate && selectedTime) {
//       setShowDetails(true)
//       // Find matching screening or generate new seats
//       const screening = mockSeats.find(
//         (s) =>
//           s.movieId.toString() === selectedMovie &&
//           s.cinema === selectedLocation &&
//           s.date === selectedDate &&
//           s.time === selectedTime,
//       )

//       const movie = mockMovies.find((m) => m.id.toString() === selectedMovie)

//       const seatData =
//         screening?.seats ||
//         generateMockSeats(
//           Number.parseInt(selectedMovie),
//           selectedLocation,
//           selectedDate,
//           selectedTime,
//           Math.floor(Math.random() * 10), // Random sold seats
//         ).seats

//       // Update the seat generation in useEffect
//       const formattedSeats = Array.from({ length: 5 }, (_, i) =>
//         Array.from({ length: 10 }, (_, j) => {
//           const seatId = `seat-${i}-${j}`
//           const existingSeat = seatData.find((s) => s.id === seatId)
//           return {
//             id: seatId,
//             row: `Row ${i + 1}`,
//             number: j + 1,
//             status: existingSeat?.status === "sold" ? ("sold" as const) : ("available" as const),
//             actualStatus:
//               existingSeat?.status === "sold"
//                 ? ("sold" as const)
//                 : Math.random() > 0.8
//                   ? ("reserved" as const)
//                   : ("available" as const),
//             username: Math.random() > 0.8 ? "user@example.com" : "",
//           }
//         }),
//       )
//       setSeats(formattedSeats)
//     } else {
//       setShowDetails(false)
//     }
//   }, [selectedMovie, selectedLocation, selectedDate, selectedTime])

//   const handleSeatClick = (rowIndex: number, colIndex: number) => {
//     const seat = seats[rowIndex][colIndex]

//     setSelectedSeat((prev) =>
//       prev?.row === rowIndex && prev?.col === colIndex ? null : { row: rowIndex, col: colIndex },
//     )

//     if (seat.actualStatus === "reserved") {
//       if (window.confirm(`Remove reservation for ${seat.username || "unknown user"}?`)) {
//         const newSeats = [...seats]
//         newSeats[rowIndex][colIndex] = {
//           ...seat,
//           status: "available",
//           actualStatus: "available",
//           username: "",
//         }
//         setSeats(newSeats)
//       }
//     } else if (seat.actualStatus === "available") {
//       // Mark as sold (in real app, would have payment flow)
//       const newSeats = [...seats]
//       newSeats[rowIndex][colIndex] = {
//         ...seat,
//         status: "sold",
//         actualStatus: "sold",
//         username: "admin@system.com",
//       }
//       setSeats(newSeats)
//     }
//   }

//   const toSeatProps = (seat: AdminSeatData) => ({
//     id: seat.id,
//     row: seat.row,
//     number: seat.number,
//     status: seat.status,
//   })

//   const getBookingStats = () => {
//     let available = 0
//     let reserved = 0
//     let sold = 0

//     seats.forEach((row) => {
//       row.forEach((seat) => {
//         if (seat.actualStatus === "available") available++
//         else if (seat.actualStatus === "reserved") reserved++
//         else if (seat.actualStatus === "sold") sold++
//       })
//     })

//     const total = available + reserved + sold
//     const occupancyRate = total > 0 ? Math.round(((reserved + sold) / total) * 100) : 0

//     return { available, reserved, sold, total, occupancyRate }
//   }

//   const movie = selectedMovie ? mockMovies.find((m) => m.id.toString() === selectedMovie) : null

//   return (
//     <div className="booking-management">
//       <NavbarAdmin />

//       <div className="admin-container">
//         <h1 className="admin-title">Booking Management</h1>

//         <ScheduleControls
//           selectedMovie={selectedMovie}
//           setSelectedMovie={setSelectedMovie}
//           selectedLocation={selectedLocation}
//           setSelectedLocation={setSelectedLocation}
//           selectedDate={selectedDate}
//           setSelectedDate={setSelectedDate}
//           selectedTime={selectedTime}
//           setSelectedTime={setSelectedTime}
//           movies={mockMovies}
//           cinemas={mockCinemas}
//         />

//         {showDetails && movie && (
//           <>
//             <ScreenHeader movieTitle={movie.title} cinema={selectedLocation} date={selectedDate} time={selectedTime} />

//             <div className="screen-label">Screen</div>

//             <div className="seat-layout">
//               {seats.map((row, rowIndex) => (
//                 <div key={`row-${rowIndex}`} className="seat-row">
//                   <div className="row-label">{row[0].row}</div>
//                   {row.map((seat, colIndex) => (
//                     <div key={seat.id} className="seat-container">
//                       <Seat
//                         seat={toSeatProps(seat)}
//                         isSelected={selectedSeat?.row === rowIndex && selectedSeat?.col === colIndex}
//                         onClick={() => handleSeatClick(rowIndex, colIndex)}
//                       />
//                       {seat.actualStatus === "reserved" && (
//                         <span className="reserved-badge" title={`Reserved by ${seat.username}`}>
//                           R
//                         </span>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               ))}
//             </div>

//             <SeatLegend />

//             {/* Booking Statistics */}
//             {seats.length > 0 && (
//               <div className="booking-stats">
//                 <h3>Booking Statistics</h3>
//                 <div className="stats-grid">
//                   {(() => {
//                     const { available, reserved, sold, total, occupancyRate } = getBookingStats()
//                     return (
//                       <>
//                         <div className="stat-item">
//                           <span className="stat-label">Available:</span>
//                           <span className="stat-value">{available}</span>
//                         </div>
//                         <div className="stat-item">
//                           <span className="stat-label">Reserved:</span>
//                           <span className="stat-value">{reserved}</span>
//                         </div>
//                         <div className="stat-item">
//                           <span className="stat-label">Sold:</span>
//                           <span className="stat-value">{sold}</span>
//                         </div>
//                         <div className="stat-item">
//                           <span className="stat-label">Total Seats:</span>
//                           <span className="stat-value">{total}</span>
//                         </div>
//                         <div className="stat-item">
//                           <span className="stat-label">Occupancy Rate:</span>
//                           <span className="stat-value">{occupancyRate}%</span>
//                         </div>
//                       </>
//                     )
//                   })()}
//                 </div>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   )
// }

// export default BookingManagement
