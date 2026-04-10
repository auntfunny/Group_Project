import { createContext, useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState({ token: null, username: null, role: null });
  const [credentials, setCredentials] = useState("");
  const navigate = useNavigate();
  const { data, loading, error } = useFetch(
    "https://api-funval-g6.onrender.com/auth/login",
    {
      method: "POST",
      body: credentials,
    },
  );

  useEffect(() => {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("user_role");
      const username = localStorage.getItem("username");
      if (token ) {
        setUser({ token: token, username: username, role: role });
      }
  }, []);

  useEffect(() => {
    if (data.access_token) {
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("user_role", data.user_role);
      localStorage.setItem("username", data.user_name);
      setUser({
        token: data.access_token,
        username: data.user_name,
        role: data.user_role,
      });
      if (data.user_role === "cliente") {
        navigate("/cliente/productos");
      } else {
        navigate("/productos");
      }
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      console.error("Something went wrong: ", error);
    }
  }, [error]);

  function login(form) {
    setCredentials(form);
  }

  function logout() {
    localStorage.clear();
    setUser({ token: null, username: null, role: null });
    navigate("/login");
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
