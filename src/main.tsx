import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SessionProvider } from "./contexts/SessionContext.tsx";
import SignIn from "./views/SignIn/SignIn.tsx";
import SignUp from "./views/SignUp/SignUp.tsx";
import Navbar from "./components/Navbar.tsx";
import Home from "./views/Home/Home.tsx";
import Direktori from "./views/Direktori/Direktori.tsx";
import DirektoriDetail from "./views/Direktori/views/DirektoriDetail/DirektoriDetail.tsx";
import LihatSemuaDirektori from "./views/Direktori/views/LihatSemuaDirektori/LihatSemuaDirektori.tsx";
import Profil from "./views/Profil/Profil.tsx";
import Forum from "./views/Forum/Forum.tsx";
import AddPost from "./views/Forum/views/AddPost/AddPost.tsx";
import DetailForum from "./views/Forum/views/DetailForum/DetailForum.tsx";
import EditPost from "./views/Forum/views/EditPost/EditPost.tsx";
import EditProfil from "./views/Profil/views/EditProfil/EditProfil.tsx";
import PageNotFound from "./views/PageNotFound/PageNotFound.tsx";
import Komunitas from "./views/Komunitas/Komunitas.tsx";
import Admin from "./views/Admin/Admin.tsx";
import Arsip from "./views/Arsip/Arsip.tsx";
import LihatSemuaKomunitas from "./views/Komunitas/views/LihatSemuaKomunitas/LihatSemuaKomunitas.tsx";
import KomunitasDetail from "./views/Komunitas/views/KomunitasDetail/KomunitasDetail.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SessionProvider>
      <Router>
        <Navbar />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/direktori" element={<Direktori />} />
            <Route path="/direktori/detail/:id" element={<DirektoriDetail />} />
            <Route
              path="/direktori/lihat-semua/:id"
              element={<LihatSemuaDirektori />}
            />
            <Route path="/komunitas-aktivitas" element={<Komunitas />} />
            <Route
              path="/komunitas-aktivitas/detail/:id"
              element={<KomunitasDetail />}
            />
            <Route
              path="/komunitas-aktivitas/lihat-semua/:id"
              element={<LihatSemuaKomunitas />}
            />
            <Route path="/forum" element={<Forum />} />
            <Route path="/forum/add-post" element={<AddPost />} />
            <Route path="/forum/detail/:id" element={<DetailForum />} />
            <Route path="/forum/edit/:id" element={<EditPost />} />
            <Route path="/arsip" element={<Arsip />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profil/:name" element={<Profil />} />
            <Route path="/profil/:name/edit" element={<EditProfil />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </SessionProvider>
  </React.StrictMode>
);
