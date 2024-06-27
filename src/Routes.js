import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage path="login" />} />
        <Route path="/register" element={<LoginPage path="register" />} />
        <Route path="/reset-password" element={<LoginPage path="reset-password" />} />
        <Route path="/dashboard" element={<DashboardPage path="dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
