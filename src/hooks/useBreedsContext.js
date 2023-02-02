import { useContext } from "react";
import BreedsContext from "../contexts/BreedsContext";

const useBreedsContext = () => useContext(BreedsContext);

export default useBreedsContext;