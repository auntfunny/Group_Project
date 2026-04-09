import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRouteLoggedIn({ children }) {
    const { user } = useAuth();
    if (user.token) {
      if (user.role === "cliente") {
        return <Navigate to="/cliente" />;
      } else {
        return <Navigate to="/" />;
      }
    }
    return children;
  }

  export default ProtectedRouteLoggedIn;