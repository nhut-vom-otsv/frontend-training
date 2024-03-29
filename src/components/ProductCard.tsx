import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import HeartButton from "./HeartButton";
import RatingStar from "./RatingStar";
import SmallButton from "./SmallButton";
import { FlyingImageWrapper } from "./FlyingImage";
import GifLoading from "./GifLoading";
import { FavoriteContext } from "../context/FavoriteContext";
import { CartContext } from "../context/CartContext";
import { NotificationContext } from "../context/NotificationContext";
import { ADD_PRODUCT_DELAY, MAX_FAVORITES, ProductDetails } from "../constants";
import { addFavorite, removeFavorite } from "../services/products.api";
import { addToCart } from "../services";

const DEFAULT_QUANTITY = 1; // default value when user clicks on add to cart

const ProductCard = (props: {
  product: ProductDetails;
  isFavorite: boolean;
}): React.ReactElement => {
  const { product, isFavorite } = props;

  const [love, setLove] = useState(isFavorite);
  const [animation, setAnimation] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { notify } = useContext(NotificationContext);
  const {
    addFavorite: addToContext,
    removeFavorite: removeFromContext,
    favoriteState,
  } = useContext(FavoriteContext);
  const {
    addToCart: addToCartContext,
    calculateCartValue,
    cartState,
  } = useContext(CartContext);

  const notifyFavoriteAction = () => {
    notify({
      content: `Successfully ${love ? "remove from" : "added to"} favorites`,
      type: "favorite",
      open: true,
      id: crypto.randomUUID(),
    });

    setLove(!love);
    setLoading(false);
  };

  const handleRemoveFavorite = async () => {
    await removeFavorite(product.id);
    removeFromContext(product);
    notifyFavoriteAction();
  };

  const handleAddFavorite = async () => {
    await addFavorite(product.id);
    addToContext(product);
    notifyFavoriteAction();
  };

  const handleFavorites = useCallback(async () => {
    if (!love && favoriteState.favoriteList.length >= MAX_FAVORITES)
      return notify({
        content: `Reached maximum favorites`,
        type: "warning",
        open: true,
        id: crypto.randomUUID(),
      });

    setLoading(true);

    if (love) return handleRemoveFavorite();

    return handleAddFavorite();
  }, [love]);

  const [integerPart, decimalPart] = useMemo(() => {
    const [integer, decimal] = product.price.toString().split(".");

    return [integer, decimal];
  }, [product.price]);

  const handleAddToCart = useCallback(async () => {
    try {
      await addToCart({ quantity: DEFAULT_QUANTITY, productId: product.id });

      addToCartContext(DEFAULT_QUANTITY, product, crypto.randomUUID());
      calculateCartValue(DEFAULT_QUANTITY, product);

      setLoading(true);
      notify({
        id: crypto.randomUUID(),
        content: "Add to cart successfully",
        open: true,
        type: "success",
      });
    } catch (error) {
      notify({
        id: crypto.randomUUID(),
        content: "Add to cart failed",
        open: true,
        type: "error",
      });
    }

    setTimeout(() => {
      setLoading(false);
    }, ADD_PRODUCT_DELAY);
  }, [product]);

  useEffect(() => {
    const cartProduct = cartState.cartList[product.id];
    if (cartProduct) {
      setAnimation(!!cartProduct.cartAnimations.length);
    }
  }, [cartState.cartList[product.id]]);

  return (
    <>
      {loading && <GifLoading />}
      <motion.div
        whileHover={{
          scale: 1.1,
        }}
        className="flex w-80 flex-col items-center justify-center gap-1 rounded-lg border-[0.0625rem] border-solid border-black bg-white p-2 shadow-xl"
      >
        <div className="relative flex aspect-square w-60 items-center justify-center">
          <Link to={`/product/${product.id}`}>
            {animation && <FlyingImageWrapper product={product} />}
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
            <Link to={`/product/${product.id}`}>
              <motion.p
                whileHover={{ scale: 1.05 }}
                className="truncate text-lg font-semibold"
              >
                {product.title}
              </motion.p>
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
          <RatingStar rating={product.rate} />
          <p className="text-sm text-gray-500">({product.count})</p>
        </div>

        <div className="mt-2 w-auto self-start">
          <SmallButton content="Add to Cart" onClick={handleAddToCart} />
        </div>
      </motion.div>
    </>
  );
};

export default ProductCard;

export const ProductCardSkeleton = () => {
  return (
    <div className="flex h-[25.625rem] w-80 animate-pulse flex-col items-center justify-center gap-1 rounded-lg border-[0.0625rem] border-solid border-slate-400 bg-white p-2 shadow-xl">
      <div className="relative flex aspect-square h-60 w-64 items-center justify-center rounded-3xl bg-slate-100" />
      <div className="flex w-full justify-between">
        <div className="flex w-[75%] flex-col gap-2">
          <div className="h-7 w-52 rounded-full bg-slate-100" />
          <div className="h-10 w-52 rounded-full bg-slate-100" />
        </div>

        <div className="flex items-start justify-end">
          <div className="h-7 w-10 rounded-full bg-slate-100" />
        </div>
      </div>

      <div className="flex items-center gap-1 self-start px-1">
        <div className="h-5 w-36 rounded-full bg-slate-100" />
      </div>

      <div className="mt-2 w-auto self-start">
        <div className="m-1 h-9 w-28 rounded-md bg-slate-100" />
      </div>
    </div>
  );
};
