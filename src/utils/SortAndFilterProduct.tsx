import { ProductDetails, SortOptions } from "../constants/data";

type SortAndFilterProductProps = {
  selectedSort: string;
  selectedFilter: string;
  products: ProductDetails[];
};

export const SortAndFilterProduct = ({
  selectedSort,
  selectedFilter,
  products,
}: SortAndFilterProductProps) => {
  const sortProducts = (products: ProductDetails[], sortOption: string) => {
    let sortedProducts = [...products];
    switch (sortOption) {
      case SortOptions[0].options[0]:
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case SortOptions[0].options[1]:
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case SortOptions[1].options[0]:
        sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case SortOptions[1].options[1]:
        sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }
    return sortedProducts;
  };

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const filterProducts = (products: ProductDetails[], filterOption: string) => {
    if (filterOption === "Category") return products;
    return products.filter(
      (product) => capitalizeFirstLetter(product.category) === filterOption
    );
  };

  let sortedProducts = selectedSort
    ? sortProducts(products, selectedSort)
    : products;

  let filteredProducts = selectedFilter
    ? filterProducts(sortedProducts, selectedFilter)
    : sortedProducts;

  return {
    sortProducts,
    capitalizeFirstLetter,
    sortedProducts,
    filteredProducts,
  };
};
