import React, { useCallback, useContext, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import HeartButton from "./HeartButton";
import RatingStar from "./RatingStar";
import SmallButton from "./SmallButton";
import { ProductDetails } from "../constants/data";
import { FavoriteContext } from "../context/FavoriteContext";
import { CartContext } from "../context/CartContext";
import { getLocalStorageValue } from "../utils/LocalStorage";
import { useNotification } from "../hooks/useNotification";

const DEFAULT_QUANTITY = 1; // default value when user clicks on add to cart

const ProductCard = (props: {
  product: ProductDetails;
}): React.ReactElement => {
  const { product } = props;

  const { renderNotification, handleOpenNotification, setContent } =
    useNotification();

  const { addFavorite, removeFavorite, storeFavorite } =
    useContext(FavoriteContext);

  const isFavorite = useMemo(() => {
    const { favoriteList } = getLocalStorageValue({ key: "favorites" });
    if (favoriteList === undefined) {
      return false;
    }

    const checkExisting = favoriteList.find((item: ProductDetails) => {
      if (item.id == product.id) {
        return true;
      }
      return false;
    });

    return checkExisting;
  }, []);

  const { addToCart, calculateCartValue } = useContext(CartContext);
  const [love, setLove] = useState(isFavorite);

  const handleFavorites = useCallback(() => {
    love ? removeFavorite(product) : addFavorite(product);
    storeFavorite();
    setLove(!love);
  }, [love]);

  const [integerPart, decimalPart] = useMemo(() => {
    const [integer, decimal] = product.price.toString().split(".");

    return [integer, decimal];
  }, [product.price]);

  const handleAddToCart = useCallback(() => {
    addToCart(DEFAULT_QUANTITY, product);
    calculateCartValue(DEFAULT_QUANTITY, product);
    setContent("Successfully Add to Cart");
    handleOpenNotification();
  }, [product]);

  return (
    <>
      {renderNotification()}
      <motion.div
        whileHover={{
          scale: 1.1,
        }}
        className="flex w-80 flex-col items-center justify-center gap-1 rounded-lg border-[0.0625rem] border-solid border-black bg-white p-2 shadow-xl"
      >
        <div className="relative flex aspect-square w-60 items-center justify-center">
          <Link to={`/product/${product.id}`}>
            <img
              src={product.image}
              alt={product.title}
              className="object-fit h-36"
            />
          </Link>

          <HeartButton
            love={love}
            className="absolute top-2 -right-2"
            onClick={handleFavorites}
          />
        </div>

        <div className="flex w-full justify-between px-2">
          <div className="flex w-[75%] flex-col ">
            <Link to="/product/test">
              <p className="truncate text-lg font-semibold">{product.title}</p>
            </Link>

            <p className="text-sm text-gray-500 line-clamp-2">
              {product.description}
            </p>
          </div>

          <div className="flex items-start justify-end">
            <p className="text-xs font-bold">$</p>
            <p className="text-lg font-bold">{integerPart}</p>
            <p className="text-xs font-bold">
              .{decimalPart ? decimalPart : "00"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 self-start px-1">
          <RatingStar rating={product.rating.rate} />
          <p className="text-sm text-gray-500">({product.rating.count})</p>
        </div>

        <div className="mt-2 w-auto self-start">
          <SmallButton name="Add to Cart" onClick={handleAddToCart} />
        </div>
      </motion.div>
    </>
  );
};

export default ProductCard;

export const ProductCardSkeleton = () => {
  return (
    <div className="flex h-[25.625rem] w-80 animate-pulse flex-col items-center justify-center gap-1 rounded-lg border-[0.0625rem] border-solid border-slate-400 bg-white p-2 shadow-xl">
      <div className="relative flex aspect-square h-60 w-64 items-center justify-center rounded-3xl bg-slate-100"></div>
      <div className="flex w-full justify-between">
        <div className="flex w-[75%] flex-col gap-2">
          <div className="h-7 w-52 rounded-full bg-slate-100"></div>
          <div className="h-10 w-52 rounded-full bg-slate-100"></div>
        </div>

        <div className="flex items-start justify-end">
          <div className="h-7 w-10 rounded-full bg-slate-100"></div>
        </div>
      </div>

      <div className="flex items-center gap-1 self-start px-1">
        <div className="h-5 w-36 rounded-full bg-slate-100"></div>
      </div>

      <div className="mt-2 w-auto self-start">
        <div className="m-1 h-9 w-28 rounded-md bg-slate-100"></div>
      </div>
    </div>
  );
};
