import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function App() {
  const [showLogout, setShowLogout] = useState(false);
  const user = useSelector((state) => state.user.connected);
  console.log("CONNECTED? ", user);

  return (
    <div className="">
      <BrowserRouter>
        <Navbar setShowLogout={setShowLogout} />
        <div className="">
          <Routes>
            <Route
              path="/"
              element={
                user ? (
                  <Home showLogout={showLogout} setShowLogout={setShowLogout} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
