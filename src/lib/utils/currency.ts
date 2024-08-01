import currency from "currency.js";

export const CRC = (value: number) => {
  return currency(value, { symbol: "₡", precision: 2 }).format();
};
