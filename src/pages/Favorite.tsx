import React, { useContext, useState } from "react";
import ProductCard from "../components/ProductCard";
import OpacityMotionDiv from "../components/Animation/OpacityMotionDiv";
import { SelectSortMenu } from "../utils/SelectSortMenu";
import { ProductDetails } from "../constants/data";
import { FavoriteContext } from "../context/FavoriteContext";
import { SortAndFilterProduct } from "../utils/SortAndFilterProduct";

const Favorite = (): React.ReactElement => {
  const { favoriteState } = useContext(FavoriteContext);
  const { renderSelectSortMenu, selectedSort, selectedFilter } =
    SelectSortMenu();

  const { filteredProducts } = SortAndFilterProduct({
    products: favoriteState.favoriteList,
    selectedSort,
    selectedFilter,
  });

  return (
    <div>
      {/* Sort Option List */}
      <div className="m-10 grid grid-cols-2 justify-end gap-5 md:flex">
        {renderSelectSortMenu()}
      </div>

      {/* Favorite List  */}
      <OpacityMotionDiv className="mt-10 grid w-auto grid-cols-1 justify-items-center gap-x-5 gap-y-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-fluid">
        {filteredProducts.map((product: ProductDetails) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </OpacityMotionDiv>
    </div>
  );
};

export default Favorite;
