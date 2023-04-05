import React, { useCallback, useContext, useMemo, useState } from "react";
import Modal from "../components/Modal";
import Notification from "../components/Notification";
import OrderSummary from "../components/OrderSummary";
import SmallButton from "../components/SmallButton";
import { CartContext } from "../context/CartContext";
import { useNavigatePage } from "../hooks/useNavigatePage";
import { useNotification } from "../hooks/useNotification";
import { renderCartList } from "../utils/RenderCartList";

const Cart = (): React.ReactElement => {
  const { cartState, removeAllFromCart } = useContext(CartContext);
  const [showModal, setShowModal] = useState<boolean>(false);

  const { renderNotification, handleOpenNotification, setContent, setIsError } =
    useNotification();

  const { redirect } = useNavigatePage();

  const isEmptyCart = useMemo(() => {
    return Object.keys(cartState.cartList).length === 0;
  }, [cartState.cartList]);

  const handleCheckout = () => {
    if (cartState.cartValue > 0) redirect("/checkout");
    else {
      setContent("Can't checkout with an empty cart");
      setIsError(true);
      handleOpenNotification();
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      {/* Notification and Modal */}
      {renderNotification()}
      <Modal
        isOpen={showModal}
        title="Warning"
        onSubmit={removeAllFromCart}
        onClose={handleCloseModal}
      >
        <p>Do you want to delete all?</p>
      </Modal>

      {/* Header */}
      <div className="mx-auto my-5 flex w-4/5 items-center justify-between">
        <p className="text-xl font-bold">Review your bag</p>
        <SmallButton name="Delete all" onClick={() => setShowModal(true)} />
      </div>

      {/* Cart Content */}
      <div className="mx-auto w-4/5">
        <hr className="my-2 h-px border-0 bg-gray-200"></hr>
        <p className="mb-5 text-sm italic">Free delivery and free returns.</p>

        {/* Test Product in Cart */}
        {isEmptyCart ? (
          <div className="h-10 w-full">
            <p className="w-full text-center text-lg font-semibold italic md:text-2xl">
              No products in cart
            </p>
          </div>
        ) : (
          renderCartList()
        )}

        {/* Order Summary */}
        <OrderSummary />

        {/* Buttons */}
        <div className="flex w-full justify-between">
          <SmallButton onClick={() => redirect("/products")}>
            <p className="text-md md:text-lg">Back</p>
          </SmallButton>
          <SmallButton onClick={handleCheckout}>
            <p className="text-md md:text-lg">Checkout</p>
          </SmallButton>
        </div>
      </div>
    </div>
  );
};

export default Cart;
