import React, { useCallback, useContext, useMemo } from "react";
import OpacityMotionDiv from "../components/Animation/OpacityMotionDiv";
import ProductCart from "../components/ProductCart";
import { CartContext } from "../context/CartContext";
import map from "lodash/map";
import { AnimatePresence, motion } from "framer-motion";
import SlideDownDisappearDiv from "../components/Animation/SlideDownDisappearDiv";

export const renderCartList = () => {
  const { cartState } = useContext(CartContext);

  return (
    <OpacityMotionDiv>
      <AnimatePresence>
        {map(cartState.cartList).map((data) => (
          <SlideDownDisappearDiv key={data.product.id}>
            <ProductCart product={data.product} quantity={data.quantity} />
            <hr className="my-4 h-px border-0 bg-gray-200"></hr>
          </SlideDownDisappearDiv>
        ))}
      </AnimatePresence>
    </OpacityMotionDiv>
  );
};
