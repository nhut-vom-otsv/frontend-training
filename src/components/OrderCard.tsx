import React, { useMemo } from "react";
import { OrderType } from "../constants/data";
import { convertTimestampToDate } from "../utils/CovertTimeStamp";

const OrderCard = ({ order }: { order: OrderType }): React.ReactElement => {
  const orderDate = useMemo(() => {
    return convertTimestampToDate(order.date);
  }, [order.date]);

  const orderAddress = `${order.city}, ${order.country}`;

  const orderPayment = `Visa-${order.cardNumber.slice(-4)}`;

  return (
    <div className="flex w-full flex-col gap-4 rounded-lg border border-gray-500 p-5 shadow-xl">
      <div>
        <p className="my-4 text-2xl font-semibold">Your Order Confirmed!</p>
        <p className="text-md font-medium">{`Hi ${order.name},`}</p>
        <p className="text-sm text-gray-400">
          Your order has been confirmed and will be shipping soon.
        </p>
      </div>
      <hr className="my-2 h-px border-0 bg-gray-200"></hr>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
        <div>
          <p className="text-sm italic text-gray-400">Order Date</p>
          <p className="text-sm">{orderDate}</p>
        </div>

        <div>
          <p className="text-sm italic text-gray-400">Phone Number</p>
          <p className="text-sm">{order.phone}</p>
        </div>

        <div>
          <p className="text-sm italic text-gray-400">Address</p>
          <p className="text-sm">{orderAddress}</p>
        </div>

        <div>
          <p className="text-sm italic text-gray-400">Payment</p>
          <p className="text-sm">{orderPayment}</p>
        </div>
      </div>
      <hr className="my-2 h-px border-0 bg-gray-200"></hr>
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold">Total</p>
        <p className="text-xl font-bold">${order.cartValue.toFixed(2)}</p>
      </div>
      <hr className="my-2 h-px border-0 bg-gray-200"></hr>
      <p className="text-xs">
        We'll send you shipping confirmation when your item(s) are on the way!
        We appreciate your business, and hope you enjoy your purchase.
      </p>
      <p className="font-semibold">Thank you!</p>
      <p className="self-end text-sm text-gray-400">Order ID: {order.uuid}</p>
    </div>
  );
};

export default OrderCard;
