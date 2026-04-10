import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import useFetch from "../hooks/useFetch";
import Header from "../components/Header";
import NewProductForm from "../components/NewProductForm";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [newProductModal, setNewProductModal] = useState(false);

  const { data, error } = useFetch(
    "https://api-funval-g6.onrender.com/products/?skip=0&limit=100&category=books",
  );

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      setProducts(data);
    }
  }, [data]);

  const handleClose = () => {
    setNewProductModal(false);
  };

  const handleProductAdded = (product) => {
    setProducts((prev) => [product, ...prev]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navbar */}
      <Header />

      {/* Content */}
      <main className="px-6 py-8 max-w-6xl mx-auto">
        <div className="flex justify-between items-center w-full">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white">Products</h2>
            <p className="text-slate-400 text-sm mt-1">
              {products.length} Productos encontrados
            </p>
          </div>
          <button
            onClick={() => setNewProductModal(true)}
            className="flex justify-center items-center w-12 h-12 border-2 border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-600/40 rounded-full hover:bg-white hover:text-blue-600 hover:cursor-pointer transition-colors duration-300 ease-in-out"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="size-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </main>
      {/* Modal */}
      {newProductModal && (
        <NewProductForm
          handleClose={handleClose}
          handleProductAdded={handleProductAdded}
        />
      )}
    </div>
  );
};

export default Products;
