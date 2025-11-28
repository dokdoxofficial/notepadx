import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import App from "./App";          // 홈
import Save from "./pages/save";  // 저장 페이지

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/save" element={<Save />} />
    </Routes>
  </BrowserRouter>
);