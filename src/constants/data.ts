import { CartStateType } from "../context/CartContext";
import {
  AddressType,
  InformationType,
  PaymentType,
} from "../context/FormContext";
import Layout from "../layout/Layout";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Favorite from "../pages/Favorite";
import GetToken from "../pages/GetToken";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Order from "../pages/Order";
import Product from "../pages/Product";
import ProductDetail from "../pages/ProductDetail";
import Register from "../pages/Register";

type CarouselImageType = {
  url: string;
  category: string;
};

type Routes = {
  path: string;
  component: React.ElementType;
  layout?: React.ElementType;
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

export interface ProductDetails {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

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
    path: "/auth/:socialType/callback/",
    component: GetToken,
  },
];
