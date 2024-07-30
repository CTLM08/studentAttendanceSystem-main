import { createContext } from "react";

 const AppContext = createContext<{
  userData: any;
}>({
  userData: null,
});

export default AppContext;