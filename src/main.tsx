import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import SignIn from "./views/SignIn/SignIn.tsx";
import SignUp from "./views/SignUp/SignUp.tsx";
import Navbar from "./components/Navbar.tsx";
import Home from "./views/Home/Home.tsx";
import Direktori from "./views/Direktori/Direktori.tsx";
import DirektoriDetail from "./views/Direktori/views/DirektoriDetail/DirektoriDetail.tsx";
import LihatSemua from "./views/Direktori/views/LihatSemua/LihatSemua.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/direktori" element={<Direktori />} />
        <Route path="/direktori/detail/:id" element={<DirektoriDetail />} />
        <Route path="/direktori/lihat-semua/:id" element={<LihatSemua />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
