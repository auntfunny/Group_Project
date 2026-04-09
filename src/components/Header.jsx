import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();

  function salir() {
    logout();
  }

  return (
    <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between shadow-md">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        </div>
        <span className="font-bold text-lg tracking-tight">
          Sistema de Productos Del admin
        </span>
      </div>
      <nav className="flex items-center gap-4">
        <Link to={user.role === "admin" ? "/" : "/cliente"}>Pedidos</Link>
        <Link to={user.role === "admin" ? "/productos" : "/cliente/productos"}>Productos</Link>
      </nav>
      <div className="flex items-center gap-4">
        <span className="text-slate-400 text-sm">
          Hola, <span className="text-white font-semibold">{user.username}</span>
        </span>
        <button
          onClick={salir}
          className="flex items-center gap-2 bg-red-600/20 hover:bg-red-600/40 border border-red-500/30 text-red-400 hover:text-red-300 text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          Salir
        </button>
      </div>
    </header>
  );
};

export default Header;
