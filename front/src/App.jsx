import { useEffect, useState } from "react";
import Protected from "@components/protected";
import { Routes, Route, useNavigate } from "react-router-dom";
import MainView from "@pages/portfolio.jsx";
import Dashboard from "./pages/dashboard";
import AuthInfo from "./auth/zustand";
import "./App.css";
//
function App() {
  let navigate = useNavigate();


  return (
    <>
      <Routes>
        <Route path="/" element={<MainView />} />
        <Route element={<Protected />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
