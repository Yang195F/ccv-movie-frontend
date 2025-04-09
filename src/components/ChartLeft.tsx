import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import "../styles/chartLeft.css";

const data = [
  { month: "Jan", income: 12000 },
  { month: "Feb", income: 9000 },
  { month: "Mar", income: 15000 },
  { month: "Apr", income: 8000 },
];

const ChartLeft: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-lg font-semibold mb-4">🎟 Monthly Ticket Income</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="income" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartLeft;
