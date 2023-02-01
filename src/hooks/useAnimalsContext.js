import { useContext } from "react";
import AnimalsContext from "../contexts/AnimalsContext";

const useAnimalsContext = () => useContext(AnimalsContext);

export default useAnimalsContext;