import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import useFetch from "../hooks/useFetch";
import Header from "../components/Header";

const Products = () => {
  const [products, setProducts] = useState([]);
  const { data, error, loading } = useFetch(
    "https://api-funval-g6.onrender.com/products/",
  );
  useEffect(() => {
    if (data) {
      setProducts(data);
    }
  }, [data]);

  

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navbar */}
      <Header />

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

export default Products;
