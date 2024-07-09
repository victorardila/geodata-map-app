import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Importar componentes de forma dinámica
const PaymentMarket = lazy(() => import("./pages/payment/PaymentMarket"));
const LandingLayout = lazy(() => import("./components/landing/LandingLayout"));
// const IconLoctaionAnimated = lazy(()=>import("./components/map/markers/IconLocationAnimated"))
const LoginLayout = lazy(() => import("./components/auth/LoginLayout"));
const DashboardLayout = lazy(() =>
  import("./components/dashboard/DashboardLayout")
);
const ErrorPage = lazy(() => import("./pages/error/ErrorPage"));
const RouteLoader = lazy(() => import("./components/common/RouteLoader"));

// Lógica para verificar si el usuario está autenticado
const isAuthenticated = () => {
  return true; // Cambia esto según tu lógica de autenticación
};

// Lógica para verificar si el usuario tiene permisos
const hasPermission = () => {
  return true; // Cambia esto según tu lógica de autorización
};

// Componente para rutas protegidas que requieren autenticación
const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/401" />;
};

// Componente para rutas protegidas que requieren permisos específicos
const AdminRoute = ({ children }) => {
  return isAuthenticated() && hasPermission() ? (
    children
  ) : (
    <Navigate to="/403" />
  );
};

function AppRoutes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<RouteLoader />}>
        <Routes>
          {/* Rutas públicas que no requieren autenticación */}
          <Route path="/" element={<LandingLayout />} />
          <Route path="/payment-market" element={<PaymentMarket />} />
          <Route path="/auth/*" element={<LoginLayout />} />
          {/* Rutas de error */}
          <Route
            path="/401"
            element={
              <ErrorPage
                codigo={401}
                type="Unauthorized"
                description="You are not authorized to access this page."
              />
            }
          />
          <Route
            path="/403"
            element={
              <ErrorPage
                codigo={403}
                type="Forbidden"
                description="You don't have permission to access this page."
              />
            }
          />
          <Route
            path="/500"
            element={
              <ErrorPage
                codigo={500}
                type="Internal Server Error"
                description="An error occurred on the server. Please try again later."
              />
            }
          />
          <Route
            path="*"
            element={
              <ErrorPage
                codigo={404}
                type="Page not found"
                description="The page you are looking for does not exist."
              />
            }
          />

          {/* Rutas protegidas */}
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default AppRoutes;
