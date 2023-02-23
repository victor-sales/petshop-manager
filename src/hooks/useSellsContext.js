import { useContext } from "react";
import SellsContext from "../contexts/SellsContext";

const useSellsContext = () => useContext(SellsContext);

export default useSellsContext;