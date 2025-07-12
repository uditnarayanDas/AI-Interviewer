import { Navigate } from "react-router-dom";
import { auth } from "../firebaseauthentication/config";

export default function ProtectedRoute({ children }) {
  const user = auth.currentUser;
  const isLoggedIn = !!user || localStorage.getItem("vocra_loggedin");

  return isLoggedIn ? children : <Navigate to="/login" replace />;
}
