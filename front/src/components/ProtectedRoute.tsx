import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";

const isAuthenticated = () => {
  const token = localStorage.getItem("authToken");
  console.log("Auth token found:", !!token);
  return !!token;
};

// Protected route component
export const ProtectedRoute = () => {
  const location = useLocation();
  const authenticated = isAuthenticated();

  useEffect(() => {
    console.log("ProtectedRoute rendered at path:", location.pathname);
    console.log("Authentication status:", authenticated);
  }, [location.pathname, authenticated]);

  if (!authenticated) {
    console.log("Not authenticated, redirecting to login");
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  console.log("Authenticated, rendering Outlet");
  return <Outlet />;
};
