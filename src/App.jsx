import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ClienteHome from "./pages/ClienteHome";
import ClienteProducts from "./pages/ClienteProducts";
import Products from "./pages/Products";
import PrivateRouteCliente from "./routes/PrivateRouteCliente";
import PrivateRouteAdministrador from "./routes/PrivateRouteAdministrador";
import ProtectedRouteLoggedIn from "./routes/ProtectedRouteLoggedIn";

export default function App() {
 
  return (
    <>
      <Routes>
        <Route element={<PrivateRouteAdministrador />}>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Products />} />
        </Route>
        <Route element={<PrivateRouteCliente />}>
          <Route path="/cliente" element={<ClienteHome />} />
          <Route path="/cliente/productos" element={<ClienteProducts />} />
        </Route>
        <Route
          path="/Login"
          element={
            <ProtectedRouteLoggedIn>
              <Login />
            </ProtectedRouteLoggedIn>
          }
        ></Route>
      </Routes>
    </>
  );
}
