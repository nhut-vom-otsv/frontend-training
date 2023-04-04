import { map } from "lodash";
import React, { useContext } from "react";
import SmallButton from "../SmallButton";
import { OrderType } from "../../constants/data";
import { CartContext } from "../../context/CartContext";
import { FormContext } from "../../context/FormContext";
import { OrderContext } from "../../context/OrderContext";
import { useNavigatePage } from "../../hooks/useNavigatePage";
import { useNotification } from "../../hooks/useNotification";

const DELAY_BEFORE_REDIRECT = 3000; // After 3s, user will be redirected to home page

const ConfirmForm = (): React.ReactElement => {
  const { formState, previousStep, resetForm } = useContext(FormContext);
  const { cartState, removeAllFromCart } = useContext(CartContext);
  const { addOrder, storeOrder } = useContext(OrderContext);
  const { redirect } = useNavigatePage();

  const { information, address, payment } = formState;

  const { renderNotification, handleOpenNotification, setContent } =
    useNotification();

  const userContact = [information.name, information.phone].join(" | ");
  const userAddress = map(address).join(", ");
  const userPayment = [payment.cardNumber, payment.cvc].join(" | ");

  const handleSubmit = () => {
    const orderData: OrderType = {
      ...information,
      ...address,
      ...payment,
      ...cartState,
      date: Date.now(),
      uuid: crypto.randomUUID(),
    };
    addOrder(orderData);
    storeOrder();
    setContent("Order successfully, check your order history");
    handleOpenNotification();
    setTimeout(() => {
      redirect("/orders");
      resetForm();
      removeAllFromCart();
    }, DELAY_BEFORE_REDIRECT);
  };

  return (
    <>
      {renderNotification()}
      <div className="w-full rounded-lg border border-gray-400 p-5">
        <p className="text-xl font-bold">Shipping Summary</p>
        <div className="p-2">
          <p className="text-lg font-semibold">User's Contact Detail</p>
          <p>{userContact}</p>
          <p>{information.email}</p>
          <p>{userAddress}</p>
        </div>
        <div className="p-2">
          <p className="text-lg font-semibold">User's Payment Detail</p>
          <p>{payment.owner}</p>
          <p>{userPayment}</p>
        </div>
      </div>
      <div className="my-2 flex w-full justify-between">
        <SmallButton name="back" onClick={previousStep} />
        <SmallButton name="confirm" onClick={handleSubmit} />
      </div>
    </>
  );
};

export default ConfirmForm;
