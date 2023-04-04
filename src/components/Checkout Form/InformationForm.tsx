import React, { useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import OutlineInput from "./OutlineInput";
import SmallButton from "../SmallButton";
import { FormContext, InformationType } from "../../context/FormContext";
import { validationInformationSchema } from "../../constants/validate";

const InformationForm = (): React.ReactElement => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<InformationType>({
    resolver: yupResolver(validationInformationSchema),
  });

  const { formState, nextStep, setInformation } = useContext(FormContext);

  const formData = formState.information;

  const onSubmit = (data: InformationType) => {
    setInformation(data);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="name"
        control={control}
        defaultValue={formData.name}
        render={({ field, fieldState }) => (
          <OutlineInput
            label="name"
            field={field}
            fieldState={fieldState}
            error={errors.name}
            type="text"
          />
        )}
      />

      <Controller
        name="phone"
        control={control}
        defaultValue={formData.phone}
        render={({ field, fieldState }) => (
          <OutlineInput
            label="phone"
            field={field}
            fieldState={fieldState}
            error={errors.phone}
            type="text"
          />
        )}
      />

      <Controller
        name="email"
        control={control}
        defaultValue={formData.email}
        render={({ field, fieldState }) => (
          <OutlineInput
            label="email"
            field={field}
            fieldState={fieldState}
            error={errors.email}
            type="text"
          />
        )}
      />
      <div className="mt-4 flex w-full justify-end">
        <SmallButton name="Next" />
      </div>
    </form>
  );
};

export default InformationForm;
