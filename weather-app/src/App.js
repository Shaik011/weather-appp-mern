import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import WeatherApp from "./WeatherApp";

export default function App() {
  const [page, setPage] = useState(
    localStorage.getItem("token") ? "weather" : "login"
  );

  return (
    <>
      {page === "login" && (
        <Login
          onLogin={() => setPage("weather")}
          onGoSignup={() => setPage("signup")}
        />
      )}
      {page === "signup" && (
        <Signup onGoLogin={() => setPage("login")} />
      )}
      {page === "weather" && <WeatherApp />}
    </>
  );
}
