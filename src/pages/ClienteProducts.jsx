import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import useFetch from "../hooks/useFetch";

const ClienteProducts = () => {
  const [products, setProducts] = useState([]);
  const nombre = localStorage.getItem("username");
  const navigate = useNavigate();
  const { data, error, loading } = useFetch(
    "https://api-funval-g6.onrender.com/products/",
  );
  useEffect(() => {
    if (data) {
      setProducts(data);
    }
  }, [data]);
  function salir() {
    localStorage.clear();
    navigate("/Login");
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navbar */}
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
            Sistema de Productos Del cliente
          </span>
        </div>
        <nav className="flex items-center gap-4">
            <Link to="/cliente">Pedidos</Link>
            <Link to="/cliente/productos">Productos</Link>
        </nav>
        <div className="flex items-center gap-4">
          <span className="text-slate-400 text-sm">
            Hola, <span className="text-white font-semibold">{nombre}</span>
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

      {/* Content */}
      <main className="px-6 py-8 max-w-6xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white">Products</h2>
          <p className="text-slate-400 text-sm mt-1">
            {products.length} Productos encontrados
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default ClienteProducts;
