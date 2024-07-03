import React, { Suspense, lazy, Navigate } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const PaymentMarket = lazy(() => import("./pages/payment/PaymentMarket"));
const LandingLayout = lazy(() => import("./components/landing/LandingLayout"));
const LoginLayout = lazy(() => import("./components/auth/LoginLayout"));
const DashboardLayout = lazy(() => import("./components/dashboard/DashboardLayout"));
const ErrorPage = lazy(() => import("./pages/error/ErrorPage"));

const isAuthenticated = () => {
  // Lógica para verificar si el usuario está autenticado
  return true; // Cambia esto según tu lógica de autenticación
};

const hasPermission = () => {
  // Lógica para verificar si el usuario tiene permisos
  return true; // Cambia esto según tu lógica de autorización
};

function AppRoutes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Rutas públicas que no requieren autenticación */}
          <Route path="/" element={<LandingLayout />} />
          <Route path="/payment-market" element={<PaymentMarket path="payment-market" />} />
          <Route path="/login" element={<LoginLayout path="login" />} />
          <Route path="/register" element={<LoginLayout path="register" />} />
          <Route path="/reset-password" element={<LoginLayout path="reset-password" />} />
          {/* Rutas de error 404, 401, 403 y 500 */}
          <Route path="/401" element={<ErrorPage codigo={401} type="Unauthorized" description="You are not authorized to access this page." />} />
          <Route path="/403" element={<ErrorPage codigo={403} type="Forbidden" description="You don't have permission to access this page." />} />
          <Route path="/500" element={<ErrorPage codigo={500} type="Internal Server Error" description="An error occurred on the server. Please try again later." />} />
          <Route path="*" element={<ErrorPage codigo={404} type="Page not found" description="The page you are looking for does not exist." />} />
          {/* Rutas protegidas que requieren autenticación y autorización */}
          <Route 
            path="/dashboard" 
            element={isAuthenticated() ? <DashboardLayout /> : <Navigate to="/401" />} 
          />
          <Route 
            path="/dashboard/map" 
            element={isAuthenticated() && hasPermission() ? <DashboardLayout path='dashboard/map' /> : <Navigate to="/403" />} 
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default AppRoutes;
