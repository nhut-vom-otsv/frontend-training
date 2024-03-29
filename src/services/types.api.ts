import { OrderStatus, PaymentOptions, ProductDetails } from "../constants";

export type TokensType = {
  accessToken?: string;
  refreshToken?: string;
};

export type LoginType = {
  email: string;
  password: string;
};

export type RegisterType = {
  name: string;
  email: string;
  password: string;
  avatar?: string;
};

export type FacebookLoginType = {
  code: string;
  callbackUrl: string;
  password?: string;
};

export type UserData = {
  email?: string;
  id?: string;
  name?: string;
  picture?: string;
  phoneNumber?: string;
  provider?: string;
  shippingPoint?: number;
  createdAt?: string;
  updatedAt?: string;
};

export type CategoryType = {
  name: string;
  id: string;
  createdAt?: string;
  updatedAt?: string;
};

export type ErrorResponseType = {
  statusCode?: number;
  message?: string;
  error?: string;
};

export type FindProductType = {
  sortBy?: string;
  sortDirection?: string;
  categoryId?: string;
  title?: string;
  cursor?: string;
  limit?: number;
};

export type PaginatedResponse = {
  data: ProductDetails[];
  pagination: {
    total: number;
    nextCursor?: string;
  };
};

export type CartItem = {
  productId: string;
  quantity: number;
};

export type CartProduct = {
  id: string;
  title: string;
  image: string;
  price: number;
};

export type CartType = {
  quantity: number;
  product: CartProduct;
};

export type AddressType = {
  id: string;
  phoneNumber: string;
  name: string;
  email: string;
  address: string;
  lat?: number;
  lng?: number;
  createdAt?: string;
  updatedAt?: string;
};

export type PaymentType = {
  id: string;
  cardNumber: string;
  cardOwner: string;
  cvc: string;
  expiry: string;
  createdAt?: string;
  updatedAt?: string;
};

export type AddOrderType = {
  addressId: string;
  paymentId?: string;
  paymentType: PaymentOptions;
  description?: string;
};

export type Order = {
  id: string;
  orderStatus: OrderStatus;
  createdAt: Date;
  paymentType: PaymentOptions;
  description?: string;
  payment?: {
    cardNumber: string;
  };
  address: AddressType;
  orderDetails: CartType[];
};
