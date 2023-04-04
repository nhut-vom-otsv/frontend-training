import React, { useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import SmallButton from "../SmallButton";
import OutlineInput from "./OutlineInput";
import { FormContext, PaymentType } from "../../context/FormContext";
import { validationPaymentSchema } from "../../constants/validate";

const PaymentForm = (): React.ReactElement => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentType>({ resolver: yupResolver(validationPaymentSchema) });

  const { formState, nextStep, previousStep, setPayment } =
    useContext(FormContext);

  const formData = formState.payment;

  const onSubmit = (data: PaymentType) => {
    setPayment(data);
    nextStep();
  };

  return (
    <form>
      <Controller
        name="owner"
        control={control}
        defaultValue={formData.owner}
        render={({ field, fieldState }) => (
          <OutlineInput
            label="card owner"
            field={field}
            fieldState={fieldState}
            error={errors.owner}
            type="text"
          />
        )}
      />
      <div className="grid-cols-2 gap-5 md:grid">
        <Controller
          name="cardNumber"
          control={control}
          defaultValue={formData.cardNumber}
          render={({ field, fieldState }) => (
            <OutlineInput
              label="card number"
              field={field}
              fieldState={fieldState}
              error={errors.cardNumber}
              type="text"
            />
          )}
        />

        <Controller
          name="cvc"
          control={control}
          defaultValue={formData.cvc}
          render={({ field, fieldState }) => (
            <OutlineInput
              label="CVC"
              field={field}
              fieldState={fieldState}
              error={errors.cvc}
              type="text"
            />
          )}
        />
      </div>

      <div className="mt-4 flex w-full justify-between">
        <SmallButton name="Back" onClick={previousStep} />
        <SmallButton name="Next" onClick={handleSubmit(onSubmit)} />
      </div>
    </form>
  );
};

export default PaymentForm;
