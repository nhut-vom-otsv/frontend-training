import React from "react";
import { Path } from "react-hook-form";
import {
  AddressType,
  InformationType,
  PaymentType,
} from "../context/FormContext";

type FormField = {
  label: string;
  name: Path<InformationType | AddressType | PaymentType>;
};

export const useGetOrderFormFields = () => {
  const informationFormArray: FormField[] = [
    {
      label: "Full name",
      name: "name",
    },
    {
      label: "Phone number",
      name: "phoneNumber",
    },
    {
      label: "Personal email",
      name: "email",
    },
  ];

  const addressFormArray: FormField[] = [
    {
      label: "Full Address",
      name: "address",
    },
  ];

  const paymentFormArray: FormField[] = [
    {
      label: "card name",
      name: "cardOwner",
    },
    {
      label: "Card number",
      name: "cardNumber",
    },
    {
      label: "CVC",
      name: "cvc",
    },
    {
      label: "Expired date",
      name: "expiry",
    },
  ];

  return { informationFormArray, addressFormArray, paymentFormArray };
};
