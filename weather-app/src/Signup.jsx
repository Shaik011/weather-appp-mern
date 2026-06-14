import { useState } from "react";
import "./Login.css";

export default function Signup({ onGoLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async () => {
    setError("");
    setMessage("");
    try {
      const res = await fetch("https://weather-appp-mern.onrender.com/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) return setError(data.message);
      setMessage("Account created! Please sign in.");
    } catch {
      setError("Something went wrong");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="login-header">
          <span className="login-logo">🌤️</span>
          <h1 className="login-title">Create Account</h1>
          <p className="login-subtitle">Sign up to get started</p>
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
          {message && <p className="success-msg">{message}</p>}

          <button className="login-btn" onClick={handleSignup}>Sign Up</button>
        </div>

        <p className="login-footer">
          Already have an account?{" "}
          <span className="login-link" onClick={onGoLogin}>Sign in</span>
        </p>
      </div>
    </div>
  );
}
