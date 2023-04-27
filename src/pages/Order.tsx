import React, { useContext } from "react";
import OrderCard from "../components/OrderCard";
import { OrderType } from "../constants/data";
import { OrderContext } from "../context/OrderContext";
import OpacityMotionWrapper from "../components/Animation/OpacityMotionWrapper";

const Order = (): React.ReactElement => {
  const { orderState } = useContext(OrderContext);

  return (
    <div className="mx-auto my-5 w-4/5">
      <p className="text-xl font-bold">Check your order history</p>
      <hr className="my-2 h-px border-0 bg-gray-200" />
      <div className="mx-auto flex flex-col items-center justify-center gap-20 md:w-4/5">
        {orderState.orderList.map((order: OrderType) => (
          <OpacityMotionWrapper className="w-full" key={order.uuid}>
            <OrderCard order={order} key={order.uuid} />
          </OpacityMotionWrapper>
        ))}
      </div>
    </div>
  );
};

export default Order;
