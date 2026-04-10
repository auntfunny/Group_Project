import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRouteLoggedIn({ children }) {
    const { user } = useAuth();
    if (user.token) {
      if (user.role === "cliente") {
        return <Navigate to="/cliente/productos" />;
      } else {
        return <Navigate to="/productos" />;
      }
    }
    return children;
  }

  export default ProtectedRouteLoggedIn;