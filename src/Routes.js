import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingLayout from "./components/landing/LandingLayout"
import LoginLayout from "./components/auth/LoginLayout"
import DashboardLayout from "./components/dashboard/DashboardLayout"

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingLayout />} />
        <Route path="/login" element={<LoginLayout path="login" />} />
        <Route path="/register" element={<LoginLayout path="register" />} />
        <Route path="/reset-password" element={<LoginLayout path="reset-password" />} />
        <Route path="/dashboard" element={<DashboardLayout path="dashboard" />} />
        <Route path="/dashboard/map" element={<DashboardLayout path="dashboard/map" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
