import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseauthentication/config";

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login"); // redirect if not authenticated
      }
      setChecking(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  // Optional: Prevent flicker during auth check
  if (checking) return null;

  return children;
}