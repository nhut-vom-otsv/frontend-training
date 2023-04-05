import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { motion } from "framer-motion";
import QuantityButton from "./QuantityButton";
import Modal from "./Modal";
import { CartContext } from "../context/CartContext";
import { TrashIcon } from "../assets/icons";
import { ProductDetails } from "../constants/data";

const DEFAULT_QUANTITY_CHANGE = 1; // Only increase or decrease 1 unit in cart page

type ProductCartType = {
  product: ProductDetails;
  quantity: number;
};

const trashButtonVariant = {
  hover: {
    scale: 1.2,
  },
  tap: {
    scale: 0.9,
  },
};

const ProductCart = ({
  product,
  quantity,
}: ProductCartType): React.ReactElement => {
  const {
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    calculateCartValue,
  } = useContext(CartContext);

  const [quantities, setQuantities] = useState<number>(quantity);
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleIncrement = useCallback(() => {
    setQuantities(quantities + DEFAULT_QUANTITY_CHANGE);
    increaseQuantity(DEFAULT_QUANTITY_CHANGE, product);
    calculateCartValue(DEFAULT_QUANTITY_CHANGE, product);
  }, [quantities, product]);

  const [totalPrice] = useMemo(() => {
    const price = (product.price * quantities).toFixed(2);

    return [price];
  }, [quantities]);

  const handleDecrement = useCallback(() => {
    if (quantities - 1 === 0) {
      removeFromCart(product);
    } else {
      setQuantities((quantities) =>
        quantities - DEFAULT_QUANTITY_CHANGE < 0
          ? 0
          : quantities - DEFAULT_QUANTITY_CHANGE
      );
      decreaseQuantity(DEFAULT_QUANTITY_CHANGE, product);
    }

    calculateCartValue(-DEFAULT_QUANTITY_CHANGE, product);
  }, [quantities]);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleRemove = useCallback(() => {
    removeFromCart(product);
    calculateCartValue(-quantities, product);
  }, [product, quantities]);

  return (
    <div className="flex h-40 w-full gap-10 rounded-xl border border-gray-400 p-3">
      <img
        src={product.image}
        alt={product.title}
        className="h-4/5 min-w-[5.6rem] max-w-[6rem] self-center object-contain"
      />

      <div className="flex w-full justify-between ">
        <div className="flex flex-col justify-around p-2">
          <p className="text-xs font-semibold md:text-lg">{product.title}</p>
          <p className="md:text-md text-xs font-semibold">${totalPrice}</p>
          <QuantityButton
            quantity={quantities}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
          />
        </div>

        <motion.img
          variants={trashButtonVariant}
          whileHover="hover"
          src={TrashIcon}
          alt="trash"
          className="w-3 cursor-pointer self-start rounded-full md:w-5"
          onClick={() => setShowModal(true)}
        />
      </div>

      <Modal
        isOpen={showModal}
        title="Warning"
        onSubmit={handleRemove}
        onClose={handleCloseModal}
      >
        <p>
          Do you want to delete <strong>{product.title}</strong> from the cart?
        </p>
      </Modal>
    </div>
  );
};

export default ProductCart;
