import React from "react";
import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ClienteHome from "./pages/ClienteHome";
import ClienteProducts from "./pages/ClienteProducts";
import { useAuth } from "./context/AuthContext";

export default function App() {
  function PrivateRouteCliente({ children }) {
    const { user } = useAuth();
    if (!user.token) {
      return <Navigate to="/Login"></Navigate>;
    }
    return user.role === "admin" ? <Navigate to="/"></Navigate> : children;
  }
  function PrivateRouteAdministrador({ children }) {
    const { user } = useAuth();

    if (!user.token) {
      return <Navigate to="/Login"></Navigate>;
    }
    return user.role === "cliente" ? (
      <Navigate to="/cliente"></Navigate>
    ) : (
      children
    );
  }

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
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRouteAdministrador>
              <Home />
            </PrivateRouteAdministrador>
          }
        ></Route>
        <Route
          path="/cliente"
          element={
            <PrivateRouteCliente>
              <ClienteHome />
            </PrivateRouteCliente>
          }
        ></Route>
        <Route
          path="/cliente/productos"
          element={
            <PrivateRouteCliente>
              <ClienteProducts />
            </PrivateRouteCliente>
          }
        ></Route>
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
