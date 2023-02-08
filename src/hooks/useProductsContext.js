import { useContext } from "react";
import ProductsContext from "../contexts/ProductsContext";

const useProductsContext = () => useContext(ProductsContext);

export default useProductsContext;