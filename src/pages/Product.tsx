import React, { useEffect } from "react";
import Carousel from "../components/Carousel";
import ProductCard from "../components/ProductCard";
import { ProductDetails, SortOptions, testProduct } from "../constants/data";
import { SelectSortMenu } from "../utils/SelectSortMenu";
import { FetchProducts } from "../services/api";
import { SortAndFilterProduct } from "../utils/SortAndFilterProduct";

const Product = (): React.ReactElement => {
  const { products, isLoading } = FetchProducts();
  const { renderSelectSortMenu, selectedSort, selectedFilter } =
    SelectSortMenu();

  const { filteredProducts } = SortAndFilterProduct({
    products,
    selectedSort,
    selectedFilter,
  });

  return (
    <div className="p-5">
      <Carousel />

      {/* Sort Option List */}
      <div className="m-10 grid grid-cols-2 justify-end gap-5 md:flex">
        {renderSelectSortMenu()}
      </div>

      {/* Product List */}
      <div className="mt-10 grid w-auto grid-cols-1 justify-items-center gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-fluid">
        {isLoading
          ? "loading..."
          : filteredProducts.map((product: ProductDetails) => (
              <ProductCard product={product} key={product.id} />
            ))}
      </div>
    </div>
  );
};

export default Product;
