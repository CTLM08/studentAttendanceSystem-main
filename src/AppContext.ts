import { createContext } from "react";

const AppContext = createContext<{
  userData: any;
  setType: (type: string) => void;
  type: string;
  settleAbsences: () => void;
  totalAbsences: any;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}>({
  userData: null,
  setType: () => {},
  type: "",
  settleAbsences: () => {},
  totalAbsences: null,
  loading: false,
  setLoading: () => {},
});

export default AppContext;
