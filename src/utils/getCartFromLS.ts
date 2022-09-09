import { sumTotalPrice } from "./sumTotalPrice";

export const getCartFromLS = () => {
  const data = localStorage.getItem("cart");
  const items = data ? JSON.parse(data) : [];
  const totalPrice = sumTotalPrice(items);
  return {
    items,
    totalPrice,
  };
};
