import Cards, { Focused } from "react-credit-cards-2";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useContext, useState } from "react";
import { useGetOrderFormFields, useNavigatePage } from "../hooks";
import OutlineInput from "./CheckoutForm/OutlineInput";
import SmallButton from "./SmallButton";
import GifLoading from "./GifLoading";
import Modal from "./Modal";
import { NotificationContext } from "../context/NotificationContext";
import { PaymentType, addPayment } from "../services";
import { validationPaymentSchema } from "../constants";
import {
  formatCVC,
  formatCardOwner,
  formatCreditNumber,
  formatExpirationDate,
} from "../utils";
import "react-credit-cards-2/dist/es/styles-compiled.css";

type CardType = {
  cardNumber: string;
  expiry: string;
  cvc: string;
  cardOwner: string;
  focus: Focused;
};

const PaymentForm = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [card, setCard] = useState<CardType>({
    cardNumber: "",
    expiry: "",
    cvc: "",
    cardOwner: "",
    focus: "",
  });
  const [isError, setIsError] = useState<boolean>(false);

  const { notify } = useContext(NotificationContext);

  const { paymentFormArray } = useGetOrderFormFields();
  const { redirect } = useNavigatePage();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentType>({
    resolver: yupResolver(validationPaymentSchema),
  });

  const onSubmitForm = async (data: PaymentType) => {
    setIsLoading(true);
    try {
      await addPayment({ ...data });
      setIsError(false);
    } catch (error) {
      setIsError(true);
    }

    setIsLoading(false);
    redirect("/payment");

    return notify({
      id: crypto.randomUUID(),
      content: isError ? "Failed" : "Successfully",
      open: true,
      type: isError ? "error" : "success",
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    switch (target.name) {
      case "cardNumber":
        target.value = formatCreditNumber(target.value);
        break;
      case "expiry":
        target.value = formatExpirationDate(target.value);
        break;
      case "cvc":
        target.value = formatCVC(target.value);
        break;
      case "cardOwner":
        target.value = formatCardOwner(target.value);
        break;
      default:
        break;
    }

    setCard((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const handleInputFocus = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCard((prev) => ({ ...prev, focus: event.target.name as Focused }));
  };

  return (
    <div className="h-full w-full">
      {isLoading && <GifLoading />}
      <form>
        <Cards
          number={card.cardNumber}
          expiry={card.expiry}
          cvc={card.cvc}
          name={card.cardOwner}
          focused={card.focus}
        />
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="mt-5"
        >
          {paymentFormArray.map((field, index) => (
            <OutlineInput
              label={field.label}
              name={field.name}
              register={register}
              error={errors}
              key={index}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
          ))}
        </motion.div>
      </form>
      <div className="mt-4 flex w-full justify-between">
        <SmallButton content="Back" onClick={() => redirect("/payment")} />
        <SmallButton content="Next" onClick={() => setOpenModal(true)} />
      </div>

      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleSubmit(onSubmitForm)}
      >
        <p>Do you want to confirm your changes?</p>
      </Modal>
    </div>
  );
};

export default PaymentForm;
