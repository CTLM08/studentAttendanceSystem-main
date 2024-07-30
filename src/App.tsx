import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import AppRoutes from "./Routes";
import AppContext from "./AppContext";
import { useAuth } from "./hooks/useAuth";

function App() {
  const location = useLocation();
  const { userData } = useAuth();

  useEffect(() => {
    if (location.pathname === "/") {
      location.pathname = "/dashboard";
    }
  }, [location]);

  return (
    <AppContext.Provider value={{ userData }}>
      <main className="flex bg-zinc-900 h-screen text-zinc-100">
        {location.pathname !== "/login" && <Sidebar />}
        <div
          className={`flex flex-col mx-8 pt-12 w-9/12 min-w-0 h-screen ${
            location.pathname === "/login" && "w-full"
          } `}
        >
          <Header />
          <AppRoutes />
        </div>
      </main>
    </AppContext.Provider>
  );
}

export default App;
