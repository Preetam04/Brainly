import { LucideIcon } from "lucide-react";
import React from "react";

interface ButtonProps {
  text?: string;
  type: "default" | "outline";
  icon?: LucideIcon; // Icon component
  onClick?: () => void;
  classes?: string;
}

const Button: React.FC<ButtonProps> = ({
  text,
  type = "default",
  icon: Icon,
  onClick,
  classes,
}) => {
  const btnTypes = {
    default: "bg-primary text-white",
    outline: "text-primary bg-primary/25",
  };

  return (
    <button
      className={` text-md  font-medium w-full rounded-md py-2 px-4 ${btnTypes[type]} flex gap-2.5 items-center hover:scale-95 transition justify-center duration-200  min-w-fit ${classes}`}
      onClick={onClick}
    >
      {Icon ? <Icon className="inline " size={18} /> : ""}
      {text}
    </button>
  );
};

export default Button;
