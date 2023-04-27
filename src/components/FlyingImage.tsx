import { AnimatePresence, motion } from "framer-motion";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { CartContext } from "../context/CartContext";
import { ProductDetails } from "../constants/data";

type FlyingImageType = {
  image: string;
  alt?: string;
  timeout?: number;
  id: string;
  product: ProductDetails;
};

const CART_RADIUS = 50;

const FlyingImage = ({ image, alt, timeout, id, product }: FlyingImageType) => {
  const [visibility, setVisibility] = useState<boolean>(true);
  const [distance, setDistance] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const { cartState, removeCartAnimation } = useContext(CartContext);
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const handleResize = () => {
      const positions = ref.current?.getBoundingClientRect();
      if (positions) {
        setDistance((distance) => ({
          x: cartState.cartPositions.cartX - positions.x - CART_RADIUS,
          y: cartState.cartPositions.cartY - positions.y - CART_RADIUS,
        }));
      }
    };

    handleResize(); // call once to update initial position
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [cartState.cartPositions.cartX, cartState.cartPositions.cartY]);

  const handleAnimationComplete = () => {
    setVisibility(false);
    removeCartAnimation({ id: id, product: product });
  };

  return (
    <div className="absolute top-0 left-0">
      <AnimatePresence>
        {visibility && (
          <motion.img
            className="z-50"
            ref={ref}
            initial={{ opacity: 1, scale: 0.5 }}
            animate={{
              opacity: 0,
              x: distance.x,
              y: distance.y,
              transition: { duration: 1.5 },
              scale: 0,
            }}
            exit={{ opacity: 0, x: distance.x, y: distance.y, scale: 0 }}
            src={image}
            alt={alt}
            onAnimationComplete={handleAnimationComplete}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export const FlyingImageWrapper = ({
  product,
}: {
  product: ProductDetails;
}) => {
  const { cartState } = useContext(CartContext);

  const productAnimations = useMemo(() => {
    if (cartState.cartList[product.id])
      return cartState.cartList[product.id].cartAnimations;

    return [];
  }, [cartState.cartList[product.id]]);

  return (
    <div>
      {productAnimations.map((animation) => (
        <FlyingImage
          id={animation.id}
          key={animation.id}
          image={animation.product.image}
          product={product}
        />
      ))}
    </div>
  );
};

export default FlyingImage;
