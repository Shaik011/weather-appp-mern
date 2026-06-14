import { useState } from "react";
import "./Login.css";

export default function Login({ onLogin, onGoSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    try {
      const res = await fetch("https://weather-appp-mern.onrender.com/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) return setError(data.message);
      localStorage.setItem("token", data.token);
      localStorage.setItem("email", data.email);
      onLogin();
    } catch {
      setError("Something went wrong");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="login-header">
          <span className="login-logo">🌤️</span>
          <h1 className="login-title">Weather App</h1>
          <p className="login-subtitle">Sign in to continue</p>
        </div>

        <div className="login-form">
          <div className="input-group">
            <label className="input-label">Email</label>
            <input
              className="input-field"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label className="input-label">Password</label>
            <input
              className="input-field"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="error-msg">{error}</p>}

          <button className="login-btn" onClick={handleLogin}>Sign In</button>
        </div>

        <p className="login-footer">
          Don't have an account?{" "}
          <span className="login-link" onClick={onGoSignup}>Sign up</span>
        </p>
      </div>
    </div>
  );
}
