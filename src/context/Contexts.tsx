import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { OrderType, ProductDetails } from "../constants/data";
import { getLocalStorageValue } from "../utils/LocalStorage";
import { CartProvider } from "./CartContext";
import { FavoriteProvider } from "./FavoriteContext";
import { defaultForm, FormProvider } from "./FormContext";
import { OrderProvider } from "./OrderContext";
import { NotificationProvider } from "./NotificationContext";
import { NotificationType } from "../components/Notification";

type ChildrenType = {
  children: React.ReactElement | React.ReactElement[];
};

const initCartList = {};
const initNotificationList: NotificationType[] = [];
const initCartPosition = {
  cartX: 0,
  cartY: 0,
};

const Contexts = ({ children }: ChildrenType): React.ReactElement => {
  const queryClient = new QueryClient();

  const { favoriteList } = getLocalStorageValue({ key: "favorites" });
  const [list, setList] = useState<ProductDetails[]>(
    favoriteList === undefined ? [] : favoriteList
  );

  const orderList = getLocalStorageValue({ key: "orders" });
  const [orders, setOrders] = useState<OrderType[]>(
    !!Object.keys(orderList).length ? orderList : []
  );

  return (
    <NotificationProvider notificationList={initNotificationList}>
      <QueryClientProvider client={queryClient}>
        <OrderProvider orderList={orders}>
          <FavoriteProvider favoriteList={list}>
            <CartProvider
              cartList={initCartList}
              cartValue={0}
              cartPositions={initCartPosition}
            >
              <FormProvider
                information={defaultForm.information}
                address={defaultForm.address}
                payment={defaultForm.payment}
                forms={defaultForm.forms}
                step={defaultForm.step}
              >
                {children}
              </FormProvider>
            </CartProvider>
          </FavoriteProvider>
        </OrderProvider>
      </QueryClientProvider>
    </NotificationProvider>
  );
};

export default Contexts;
