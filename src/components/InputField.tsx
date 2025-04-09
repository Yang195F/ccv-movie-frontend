import React from 'react'
import "../admins/styles/components_styles.css";

interface InputFieldProps {
    label: string;
    type: string;
    value: string;
    onChange: (value: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({ label, type, value, onChange }) => {
    return (
        <div className="input-group">
            <label className="label">{label}</label>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="input"
            />
        </div>
    );
};

export default InputField;