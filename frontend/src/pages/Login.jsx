import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUser] = useState("");
  const [password, setPass] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    const res = await fetch("http://45.92.217.114:8000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("token", data.access_token);
      navigate("/dashboard");
    } else {
      alert("Login fehlgeschlagen");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl">Admin Login</h1>
      <input placeholder="User" value={username} onChange={e => setUser(e.target.value)} />
      <input placeholder="Pass" type="password" value={password} onChange={e => setPass(e.target.value)} />
      <button onClick={login}>Login</button>
    </div>
  );
}
