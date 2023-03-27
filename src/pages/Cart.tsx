import React from "react";
import Layout from "../layout/Layout";
import ProductCart from "../components/ProductCart";
import SmallButton from "../components/SmallButton";
import { testProduct } from "../constants/data";

const Cart = () => {
  return (
    <div>
      <Layout>
        {/* Header */}
        <div className="w-4/5 flex justify-between items-center mx-auto my-5">
          <p className="text-xl font-bold">Review your bag</p>
          <SmallButton name="Delete all" />
        </div>

        {/* Cart Content */}
        <div className="w-4/5 mx-auto">
          <hr className="h-px my-2 bg-gray-200 border-0"></hr>
          <p className="mb-5 text-sm italic">Free delivery and free returns.</p>

          {/* Test Product in Cart */}
          <div>
            <ProductCart product={testProduct} />
            <hr className="h-px my-4 bg-gray-200 border-0"></hr>
          </div>
          <div>
            <ProductCart product={testProduct} />
            <hr className="h-px my-4 bg-gray-200 border-0"></hr>
          </div>

          {/* Order Summary */}
          <div className="flex flex-col p-5 border border-gray-400 rounded-lg gap-2 mb-4">
            <p className="text-lg font-bold">Order Summary</p>
            <div className="flex justify-between w-full">
              <p className="text-lg font-medium text-gray-400">Subtotal</p>
              <p className="text-xl font-semibold">$999.99</p>
            </div>
            <div className="flex justify-between w-full">
              <p className="text-lg font-medium text-gray-400">Discount</p>
              <p className="text-xl font-semibold">-$0.00</p>
            </div>
            <div className="flex justify-between w-full">
              <p className="text-lg font-medium text-gray-400">Subtotal</p>
              <p className="text-xl font-semibold">$999.99</p>
            </div>
            <hr className="h-px my-4 bg-gray-200 border-0"></hr>
            <div className="flex justify-between w-full">
              <p className="text-xl font-bold">Total</p>
              <p className="text-2xl font-bold">$999.99</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex w-full justify-between">
            <SmallButton>
              <p className="text-md md:text-lg">Back</p>
            </SmallButton>
            <SmallButton>
              <p className="text-md md:text-lg">Checkout</p>
            </SmallButton>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Cart;