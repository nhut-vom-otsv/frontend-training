import { CartStateType } from "../context/CartContext";
import {
  AddressType,
  InformationType,
  PaymentType,
} from "../context/FormContext";
import Layout from "../layout/Layout";
import AddAddress from "../pages/AddAddress";
import Address from "../pages/Address";
import AddressDetail from "../pages/AddressDetail";
import Cart from "../pages/Cart";
import ChangePassword from "../pages/ChangePassword";
import Checkout from "../pages/Checkout";
import EditProfile from "../pages/EditProfile";
import Favorite from "../pages/Favorite";
import GetToken from "../pages/GetToken";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Order from "../pages/Order";
import Payment from "../pages/Payment";
import Product from "../pages/Product";
import ProductDetail from "../pages/ProductDetail";
import Profile from "../pages/Profile";
import Register from "../pages/Register";
import AddPayment from "../pages/AddPayment";

export type AddressCard = {
  id?: string;
  address?: string;
  name?: string;
  phoneNumber?: string;
  email?: string;
  lat?: number;
  lng?: number;
};

export type PaymentCard = {
  id?: string;
  cardNumber?: string;
  cardOwner?: string;
  cvc?: string;
  expiry?: string;
};

type CarouselImageType = {
  url: string;
  category: string;
};

type Routes = {
  path: string;
  component: React.ElementType;
  layout?: React.ElementType;
};

export type JWTDecodeType = {
  id?: string;
  iat?: string;
  exp?: string;
};

export type FooterContentType = {
  name: string;
  content: string[];
};

export type OrderType = CartStateType &
  InformationType &
  AddressType &
  PaymentType & {
    uuid: string;
    date: number;
  };

export type EditProfileFormType = {
  name?: string;
  phoneNumber?: string;
};

export type SortOptionType = {
  sortBy: string;
  sortDirection: string;
};

export type FilterOptionType = {
  categoryId?: string;
};

export interface ProductDetails {
  id: string;
  title: string;
  price: number;
  description: string;
  category_id: string;
  image: string;
  rate: number;
  count: number;
}

export const PAGE_LIMIT = 10;
export const MAX_FAVORITES = 100;
export const PRODUCT_PREFIX = "product:";
export const FAVORITE_PREFIX = "favorite:";

type RegisterFieldTypes = {
  name: string;
  type?: string;
};

export const registerFields: RegisterFieldTypes[] = [
  {
    name: "name",
  },
  {
    name: "email",
    type: "email",
  },
  {
    name: "password",
    type: "password",
  },
  {
    name: "confirmPassword",
    type: "password",
  },
];

export const facebookConstants = {
  clientID: "1213240936224087",
  callbackUrl: "http://localhost:5173/auth/facebook/callback/",
};

export enum NavItemType {
  PRODUCTS = "products",
  FAVORITES = "favorites",
  ORDERS = "orders",
}

export const navList: NavItemType[] = [
  NavItemType.PRODUCTS,
  NavItemType.FAVORITES,
  NavItemType.ORDERS,
];

export const enum AccountType {
  FACEBOOK = "facebook",
  LOCAL = "local",
}

export const ADD_PRODUCT_DELAY = 1500; // 1.5s to prevent user from click continuously will change later when apply api

export const carouselImages: Array<CarouselImageType> = [
  {
    url: "https://idjewelry.com/media/wysiwyg/rose-gold/rose_gold_jewelry.jpg",
    category: "jewelry",
  },
  {
    url: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/264e3629894817.5609864fcd16d.png",
    category: "men clothing",
  },
  {
    url: "https://i.pinimg.com/originals/3b/a6/79/3ba679fa46d14c310ee8008891ea5754.jpg",
    category: "women clothing",
  },
  {
    url: "https://img.freepik.com/free-vector/shopping-time-banner-with-realistic-map-cart-gift-bags-vector-illustration_548887-120.jpg?w=2000&t=st=1682409168~exp=1682409768~hmac=76f38dd9de68734b8747b91ce52dce34f959949b298b34d48efdb42db67efe43",
    category: "electronics",
  },
];

export const gifURLLoading =
  "https://media.tenor.com/emHVRG7_-cgAAAAC/seseren.gif";

export const footerContact: string[] = [
  "We provide the best experience.",
  "Call us: (+84) 931 910 JQK",
  "Email: fake.store@info.com",
];

export const footerContents: FooterContentType[] = [
  {
    name: "Useful Links",
    content: ["favorites", "cart", "order"],
  },
  {
    name: "Information",
    content: ["User Agreements", "Policies", "FAQ"],
  },
  {
    name: "Social Media",
    content: ["Facebook", "Instagram", "Twitter"],
  },
];

export const userMenu = [
  {
    name: "Profile",
    url: "profile",
  },
  {
    name: "Address",
    url: "address",
  },
  {
    name: "Payment",
    url: "payment",
  },
];

export const publicRoutes: Routes[] = [
  {
    path: "/",
    component: Home,
    layout: Layout,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/products",
    component: Product,
    layout: Layout,
  },
  {
    path: "/product/:productId",
    component: ProductDetail,
    layout: Layout,
  },
  {
    path: "/cart",
    component: Cart,
    layout: Layout,
  },
  {
    path: "/favorites",
    component: Favorite,
    layout: Layout,
  },
  {
    path: "/checkout",
    component: Checkout,
    layout: Layout,
  },
  {
    path: "/orders",
    component: Order,
    layout: Layout,
  },
  {
    path: "/profile",
    component: Profile,
    layout: Layout,
  },
  {
    path: "/profile/edit",
    component: EditProfile,
    layout: Layout,
  },
  {
    path: "/profile/password",
    component: ChangePassword,
    layout: Layout,
  },
  {
    path: "/auth/:socialType/callback/",
    component: GetToken,
  },
  {
    path: "/address",
    component: Address,
    layout: Layout,
  },
  {
    path: "/address/:id",
    component: AddressDetail,
    layout: Layout,
  },
  {
    path: "/address/add",
    component: AddAddress,
    layout: Layout,
  },
  {
    path: "/payment",
    component: Payment,
    layout: Layout,
  },
  {
    path: "/payment/add",
    component: AddPayment,
    layout: Layout,
  },
];
