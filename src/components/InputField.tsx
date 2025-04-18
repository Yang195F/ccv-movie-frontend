"use client"

import type React from "react"
import { useState } from "react"
import "../users/styles/components_styles.css"

interface InputFieldProps {
  label: string
  type: string
  value: string
  onChange: (value: string) => void
}

const InputField: React.FC<InputFieldProps> = ({ label, type, value, onChange }) => {
  const [focused, setFocused] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const isPasswordField = type === "password"
  const inputType = isPasswordField ? (showPassword ? "text" : "password") : type

  return (
    <div className={`input-group ${focused || value ? "focused" : ""}`}>
      <label className="input-label">{label}</label>
      <div className="input-wrapper">
        <input
          type={inputType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="input-field"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        {isPasswordField && (
          <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "👁️" : "👁️‍🗨️"}
          </button>
        )}
      </div>
    </div>
  )
}

export default InputField
