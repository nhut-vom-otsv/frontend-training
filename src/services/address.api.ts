import { AddressCard } from "../constants";
import { authApi } from "./api";

const getAddresses = async () => {
  const { data } = await authApi.get("/addresses");

  return data;
};

const getAddress = async (id: string) => {
  const { data } = await authApi.get(`/addresses/${id}`);

  return data;
};

const updateAddress = async (id: string, data: AddressCard) => {
  return await authApi.patch(`/addresses/${id}`, data);
};

const addAddress = async (data: AddressCard) => {
  return await authApi.post("/addresses", data);
};

const deleteAddress = async (id: string) => {
  const { data } = await authApi.delete(`/addresses/${id}`);

  return data;
};

export { getAddresses, getAddress, updateAddress, addAddress, deleteAddress };
