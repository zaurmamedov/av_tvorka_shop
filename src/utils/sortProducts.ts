import { type Product, SortOption } from "../types";

export const sortProducts = (
  products: Product[],
  sortBy: SortOption,
) => {
  const sorted = [...products];

  switch (sortBy) {
    case SortOption.PRICE_ASC:
      sorted.sort((a, b) => a.price - b.price);
      break;

    case SortOption.PRICE_DESC:
      sorted.sort((a, b) => b.price - a.price);
      break;

    case SortOption.POPULARITY:
      break;

    case SortOption.NEWEST:
    default:
      sorted.sort(
        (a, b) =>
          new Date(b.created_at).getTime() -
          new Date(a.created_at).getTime(),
      );
  }

  return sorted;
};