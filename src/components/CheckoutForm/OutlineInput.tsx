import { UseFormRegister, Path } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import React, { HTMLInputTypeAttribute, useState } from "react";
import EyeButton from "../Animation/EyeButton";

interface OutlineInputType {
  label: string;
  name: Path<any>;
  error?: any;
  type?: HTMLInputTypeAttribute;
  register: UseFormRegister<any>;
}

const OutlineInput = ({
  label,
  name,
  error,
  register,
  type = "text",
}: OutlineInputType): React.ReactElement => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex w-full flex-col gap-2 pb-2">
      <label htmlFor={name} className="font-semibold first-letter:capitalize">
        {label}
      </label>
      <div className="relative w-full rounded-lg border-2 border-transparent bg-gray-50 p-3 focus-within:border-black">
        <input
          type={showPassword ? "text" : type}
          id={name}
          {...register(name)}
          className={`min-h-[1.5rem] ${
            type === "password" ? "w-[90%]" : "w-full"
          } bg-transparent focus:outline-none`}
        />
        {type === "password" && (
          <EyeButton
            isEyeClosed={showPassword}
            onClick={toggleShowPassword}
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
