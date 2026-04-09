import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

 function PrivateRouteCliente({}) {
    const { user } = useAuth();
    if (!user.token) {
      return <Navigate to="/Login"></Navigate>;
    }
    return user.role === "admin" ? <Navigate to="/produtos"></Navigate> : <Outlet />;
  }
  export default PrivateRouteCliente;