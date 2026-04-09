import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

 function PrivateRouteAdministrador({}) {
    const { user } = useAuth();

    if (!user.token) {
      return <Navigate to="/Login"></Navigate>;
    }
    return user.role === "cliente" ? (
      <Navigate to="/cliente"></Navigate>
    ) : (
      <Outlet />
    );
  }

  export default PrivateRouteAdministrador