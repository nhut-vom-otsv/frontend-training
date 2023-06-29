import { UseFormRegister, Path } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import React, { HTMLInputTypeAttribute, useState, HTMLProps } from "react";
import EyeButton from "../Animation/EyeButton";

interface OutlineInputType extends HTMLProps<HTMLInputElement> {
  label: string;
  name: Path<any>;
  error?: any;
  type?: HTMLInputTypeAttribute;
  register?: UseFormRegister<any>;
  disabled?: boolean;
  placeholder?: string;
}

const OutlineInput = ({
  label,
  name,
  error,
  register,
  type = "text",
  disabled = false,
  placeholder,
  ...rest
}: OutlineInputType): React.ReactElement => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className="flex w-full flex-col gap-2 pb-2">
      <label htmlFor={name} className="font-semibold capitalize">
        {label}
      </label>
      <div
        className={`relative w-full rounded-lg border-2 border-transparent ${
          disabled ? "bg-transparent p-1" : "bg-gray-50 p-3"
        } focus-within:border-black`}
      >
        <input
          {...register?.(name)}
          placeholder={placeholder}
          disabled={disabled}
          type={showPassword ? "text" : type}
          id={name}
          className={`min-h-[1.5rem] ${
            type === "password" ? "w-[90%]" : "w-full"
          } bg-transparent focus:outline-none`}
          {...rest}
        />
        {type === "password" && (
          <EyeButton
            isEyeClosed={showPassword}
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-1/2 right-3 aspect-square w-5 -translate-y-1/2 transform"
          />
        )}
      </div>

      {error && (
        <span className="text-sm italic text-red-400">
          <ErrorMessage errors={error} name={name} />
        </span>
      )}
    </div>
  );
};

export default OutlineInput;
