import { useState } from "react";

import { Routes, Route } from "react-router-dom";
import MainView from "@pages/portfolio.jsx";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<MainView/>} />
      </Routes>
    </>
  );
}

export default App;
