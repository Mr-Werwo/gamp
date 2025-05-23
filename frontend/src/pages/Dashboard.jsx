import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  }

  const navigateMap = () => {
    navigate("/map");
  }
    const navigateStats = () => {
    navigate("/stats");
  }
    const navigateMem = () => {
    navigate("/mem");
  }
    const navigateUB = () => {
    navigate("/ub");
  }

  return (
      <div className="p-4 space-y-4">
        <h1 className="text-2xl font-bold">✅ Willkommen im Admin-Dashboard</h1>

        <button onClick={navigateMap} className="bg-red-500 text-white px-4 py-2 rounded">Map</button>
        <button onClick={navigateStats} className="bg-red-500 text-white px-4 py-2 rounded">Statistiken</button>
        <button onClick={navigateMem} className="bg-red-500 text-white px-4 py-2 rounded">Mitglieder</button>
        <button onClick={navigateUB} className="bg-red-500 text-white px-4 py-2 rounded">UB-Verteilung</button>

        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
          Logout
        </button>
      </div>
  );
}
