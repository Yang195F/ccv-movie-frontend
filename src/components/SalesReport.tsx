import type React from "react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import "../admins/styles/salesReport.css"

// This data could be moved to mockData.ts
const data = [
  { month: "Jan", income: 12000 },
  { month: "Feb", income: 9000 },
  { month: "Mar", income: 15000 },
  { month: "Apr", income: 8000 },
]

const SalesReport: React.FC = () => {
  return (
    <div className="sales-report-container">
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="income" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default SalesReport