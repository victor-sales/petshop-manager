import { useContext } from "react";
import DashboardContext from "../contexts/DashboardContext";

const useDashboardContext = () => useContext(DashboardContext);

export default useDashboardContext;