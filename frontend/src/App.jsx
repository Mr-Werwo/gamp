import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MapView from "./pages/Map"
import Mem from "./pages/Mem.jsx"
import Stats from "./pages/Stats.jsx";
import UB from "./pages/UB.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/map" element={<MapView />} />
        <Route path="/mem" element={<Mem />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/ub" element={<UB />} />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
