import { useContext } from "react";
import UsersContext from "../contexts/UsersContext";

const useUsersContext = () => useContext(UsersContext);

export default useUsersContext;