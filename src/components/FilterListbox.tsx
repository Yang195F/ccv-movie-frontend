"use client"

import type React from "react"

interface FilterListboxProps {
  onFilterChange: (filter: string) => void
}

const FilterListbox: React.FC<FilterListboxProps> = ({ onFilterChange }) => {
  return (
    <select className="filter-listbox" onChange={(e) => onFilterChange(e.target.value)} defaultValue="today">
      <option value="today">Today</option>
      <option value="upcoming">Upcoming</option>
      <option value="outdated">Out-dated</option>
    </select>
  )
}

export default FilterListbox
