import { useContext } from "react";
import SpeciesContext from "../contexts/SpeciesContext";

const useSpeciesContext = () => useContext(SpeciesContext);

export default useSpeciesContext;