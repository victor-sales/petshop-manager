import { useContext } from "react";
import UserAccountContext from "../contexts/UserAccountContext";

const useUserAccountContext = () => useContext(UserAccountContext);

export default useUserAccountContext;