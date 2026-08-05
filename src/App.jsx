import { useState } from "react";

import Dashboard from "./components/Dashboard";
import Pairing from "./components/Pairing";
import Sessions from "./components/Sessions";
import Monitor from "./components/Monitor";
import BottomNav from "./components/BottomNav";

export default function App() {
  const [page, setPage] = useState("dashboard");

  const renderPage = () => {
    switch (page) {
      case "pairing":
        return <Pairing setPage={setPage} />;

      case "sessions":
        return <Sessions setPage={setPage} />;

      case "monitor":
        return <Monitor setPage={setPage} />;

      default:
        return <Dashboard setPage={setPage} />;
    }
  };

  return (
    <div className="app">

      {/* Background Glow */}

      <div className="bg-glow glow-1"></div>
      <div className="bg-glow glow-2"></div>

      {/* Main */}

      <main className="main-container">
        {renderPage()}
      </main>

      {/* Bottom Navigation */}

      <BottomNav
        page={page}
        setPage={setPage}
      />

    </div>
  );
}
