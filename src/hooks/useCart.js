import { useContext } from "react";
import { CartContext } from "../context/CartContext.js";

export const useCart = () => {
  return useContext(CartContext);
};