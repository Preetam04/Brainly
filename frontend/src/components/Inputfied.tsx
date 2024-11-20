import React from "react";
import { FieldError, UseFormRegister } from "react-hook-form";

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  placeholder: string;
}

const Inputfied: React.FC<FormFieldProps> = ({
  label,
  name,
  register,
  error,
  type,
  placeholder,
}) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium  text-gray-800/75"
      >
        {label}
      </label>
      <input
        type={type}
        id={name}
        {...register(name)}
        className="bg-gray-50 outline outline-1 outline-gray-300  text-sm rounded-lg  w-full p-2.5 focus-visible:outline-primary  "
        placeholder={placeholder}
        required
      />

      {error && <p className="text-sm pt-1 text-red-500">{error.message}</p>}
    </div>
  );
};

export default Inputfied;
