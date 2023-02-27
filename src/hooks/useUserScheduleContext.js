import { useContext } from "react";
import UserScheduleContext from "../contexts/UserScheduleContext";

const useUserScheduleContext = () => useContext(UserScheduleContext);

export default useUserScheduleContext;