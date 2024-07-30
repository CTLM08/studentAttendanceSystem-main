import { createContext } from "react";

const AppContext = createContext<{
  userData: any;
  setType: (type: string) => void;
  type: string;
  settleAbsences: () => void;
  totalAbsences: any;
}>({
  userData: null,
  setType: () => {},
  type: "",
  settleAbsences: () => {},
  totalAbsences: null,
});

export default AppContext;
