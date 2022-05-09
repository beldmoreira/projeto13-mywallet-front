import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import { AuthProvider } from "./contexts/AuthContext";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import Homepage from "./pages/Homepage";
import MoneyOut from "./pages/MoneyOut";
import MoneyIn from "./pages/MoneyIn";


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignIn/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/homepage" element={<Homepage/>} />
            <Route path="/moneyout" element={<MoneyOut/>} />
            <Route path="/moneyin" element={<MoneyIn/>} />
          </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
