import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  placeholder: string;
  required?: boolean;
}

const InputField: React.FC<FormFieldProps> = ({
  label,
  name,
  register,
  error,
  type,
  placeholder,
  required = true,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value;
  //   const arrayValue = value.split(",").map((tag) => tag.trim()); // Split and trim tags
  //   register(name).onChange({
  //     target: { name, value: arrayValue }, // Pass array to React Hook Form
  //   });
  // };

  return (
    <div>
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium  text-gray-800/75"
      >
        {label}
      </label>
      <div className="w-full relative z-10">
        <input
          type={
            type === "password" ? (showPassword ? "text" : "password") : "text"
          }
          id={name}
          {...register(name)}
          className="bg-gray-50 outline outline-1 outline-gray-300  text-sm rounded-lg  w-full p-2.5 focus-visible:outline-primary  "
          placeholder={placeholder}
          required={required}
        />

        {type === "password" ? (
          <div
            className="absolute z-20 top-2.5 right-2 text-gray-500 cursor-pointer"
            onClick={() => {
              setShowPassword((prev) => !prev);
            }}
          >
            {!showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
          </div>
        ) : (
          ""
        )}
      </div>

      {error && <p className="text-sm pt-1 text-red-500">{error.message}</p>}
    </div>
  );
};

export default InputField;
