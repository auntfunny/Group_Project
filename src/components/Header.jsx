import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import CartModal from "./CartModal";

const Header = () => {
  const { user, logout } = useAuth();
  const { cantidadCarrito } = useCart();
  const [estaCarritoAbierto, setEstaCarritoAbierto] = useState(false);
  const isCliente = user.role === "cliente";

  function salir() {
    logout();
  }

  return (
    <>
      <header className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-6 py-4 shadow-md">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
            <svg
              className="h-4 w-4 text-white"
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
          <span className="text-lg font-bold tracking-tight">
            Sistema de Productos Del admin
          </span>
        </div>

        <nav className="flex items-center gap-4">
          <Link
            className="cursor-pointer"
            to={user.role === "admin" ? "/" : "/cliente"}
          >
            Pedidos
          </Link>
          <Link
            className="cursor-pointer"
            to={user.role === "admin" ? "/productos" : "/cliente/productos"}
          >
            Productos
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          {isCliente && (
            <button
              type="button"
              onClick={() => setEstaCarritoAbierto(true)}
              className="relative flex cursor-pointer items-center gap-3 rounded-xl border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-white transition hover:border-blue-400/40 hover:bg-blue-500/20"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500/20 text-blue-300">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2m0 0L7 13h10l4-8H5.4M7 13l-1.2 6.1A1 1 0 006.8 20H19m-12 0a1 1 0 100 2 1 1 0 000-2Zm11 0a1 1 0 100 2 1 1 0 000-2Z"
                  />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-xs text-blue-200/80">Carrito</p>
                <p className="text-sm font-semibold text-white">Ver carrito</p>
              </div>
              {cantidadCarrito > 0 && (
                <span className="absolute -right-2 -top-2 flex min-h-6 min-w-6 items-center justify-center rounded-full bg-blue-600 px-2 text-xs font-bold text-white">
                  {cantidadCarrito}
                </span>
              )}
            </button>
          )}

          <span className="text-sm text-slate-400">
            Hola, <span className="font-semibold text-white">{user.username}</span>
          </span>

          <button
            onClick={salir}
            className="flex cursor-pointer items-center gap-2 rounded-lg border border-red-500/30 bg-red-600/20 px-4 py-2 text-sm font-medium text-red-400 transition-all duration-200 hover:bg-red-600/40 hover:text-red-300"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a2 2 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Salir
          </button>
        </div>
      </header>

      {isCliente && (
        <CartModal
          isOpen={estaCarritoAbierto}
          onClose={() => setEstaCarritoAbierto(false)}
        />
      )}
    </>
  );
};

export default Header;
