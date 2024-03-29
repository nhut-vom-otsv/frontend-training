import { useQuery } from "@tanstack/react-query";
import { PaymentCard } from "../constants";
import { authApi } from "./api";

const getPaymentList = async () => {
  const { data } = await authApi.get("/payment");

  return data;
};

const getPayment = async (id: string) => {
  const { data } = await authApi.get(`/payment/${id}`);

  return data;
};

const addPayment = async (data: PaymentCard) => {
  return await authApi.post("/payment", data);
};

const deletePayment = async (id: string) => {
  const { data } = await authApi.delete(`/payment/${id}`);

  return data;
};

const fetchPaymentList = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["payment"],
    queryFn: () => getPaymentList(),
  });

  return { payment: data, error, isLoading };
};

export {
  getPaymentList,
  getPayment,
  addPayment,
  deletePayment,
  fetchPaymentList,
};
