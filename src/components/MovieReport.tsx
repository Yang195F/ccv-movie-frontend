import React from "react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import "../admins/styles/movieReport.css"

// This data could be moved to mockData.ts
const data = [
  { movie: "Bad Boys", tickets: 1200 },
  { movie: "The Martian", tickets: 900 },
  { movie: "Ghost Busters", tickets: 1500 },
]

const MovieReport: React.FC = () => {
  return (
    <div className="movie-report-container">
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <XAxis dataKey="movie" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="tickets" fill="#10b981" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default MovieReport