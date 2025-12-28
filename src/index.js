import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import App from "./App";          // 홈
import Save from "./pages/save";  // 저장 페이지
import NotFound from "./pages/NotFound";
import Login from "./pages/login";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/save" element={<Save />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/login" element={<Login />}></Route>
    </Routes>
  </BrowserRouter>
);