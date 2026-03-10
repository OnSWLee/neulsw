import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import DoctorProfile from "./pages/DoctorProfile";
import Clinics from "./pages/Clinics";
import ClinicThyroid from "./pages/ClinicThyroid";
import ClinicCoreImmunity from "./pages/ClinicCoreImmunity";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import AdminBlogEditor from "./pages/AdminBlogEditor";

const Reviews = lazy(() => import("./pages/Reviews"));
const Blog = lazy(() => import("./pages/Blog"));
const SanityAdmin = lazy(() => import("./pages/SanityAdmin"));

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-cream-white">
      <NavBar />
      <main className="flex-1">
        <Suspense fallback={<div className="flex min-h-[40vh] items-center justify-center text-slate-500">로딩 중...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/doctor" element={<DoctorProfile />} />
            <Route path="/clinics" element={<Clinics />} />
            <Route path="/clinics/thyroid" element={<ClinicThyroid />} />
            <Route path="/clinics/immunity" element={<ClinicCoreImmunity />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/admin" element={<SanityAdmin />} />
            <Route path="/admin/legacy" element={<AdminDashboard />} />
            <Route path="/admin/blog/new" element={<AdminBlogEditor />} />
            <Route path="/admin/blog/:id/edit" element={<AdminBlogEditor />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;





