import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: string;
  size?: string;
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, variant, size, onClick, className }) => {
  return (
    <button className={`${variant} ${size} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
