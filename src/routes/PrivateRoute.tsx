// src/routes/PrivateRoute.tsx

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface PrivateRouteProps {
  children: JSX.Element;
  requiredRole?: string;
}

export function PrivateRoute({ children, requiredRole }: PrivateRouteProps) {
  const { isLoggedIn, user } = useAuth();

  if (!isLoggedIn) {
    // Jeżeli użytkownik nie jest zalogowany => przekieruj na /login
    return <Navigate to="/login" replace />;
  }

  // Jeśli trasa wymaga roli (np. 'admin'), a user jej nie ma => brak dostępu
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/login" replace />;
  }

  // W innym wypadku renderuj dziecko (dzieci)
  return children;
}
