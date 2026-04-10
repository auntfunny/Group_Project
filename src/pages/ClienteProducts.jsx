import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import useFetch from "../hooks/useFetch";
import Header from "../components/Header";

const ClienteProducts = () => {
  const [productos, setProductos] = useState([]);
  const { data } = useFetch("https://api-funval-g6.onrender.com/products/");

  useEffect(() => {
    if (data) {
      setProductos(data);
    }
  }, [data]);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header />

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white">Productos</h2>
          <p className="mt-1 text-sm text-slate-400">
            {productos.length} productos encontrados
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {productos.map((producto) => (
            <ProductCard product={producto} key={producto.id} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default ClienteProducts;
