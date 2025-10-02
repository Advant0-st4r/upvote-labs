// src/components/ui/Button.tsx
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
}

const Button: React.FC<ButtonProps> = ({ children, variant = "default", ...props }) => {
  const base = "px-6 py-3 rounded-lg font-semibold transition duration-200";
  const styles =
    variant === "default"
      ? `${base} bg-blue-600 text-white hover:bg-blue-700`
      : `${base} border border-blue-600 text-blue-600 hover:bg-blue-50`;

  return (
    <button className={styles} {...props}>
      {children}
    </button>
  );
};

export default Button;
