// frontend/src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Check if user info exists in localStorage
  const userInfo = localStorage.getItem("userInfo");

  // If not logged in, redirect them to the login page
  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise, render the requested page
  return children;
};

export default ProtectedRoute;