import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const NewProductForm = ({ handleClose, handleProductAdded }) => {
  const { user } = useAuth();
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setForm((prev) => ({
      ...prev,
      [event.target.name]:
        event.target.name === "image"
          ? (event.target.files?.[0] ?? null)
          : event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!form.image) {
      setError("Por favor selecciona una imagen.");
      return;
    }

    setLoading(true);

    try {
      const uploadData = new FormData();
      uploadData.append("file", form.image);

      const { data } = await axios.post(
        "https://api-funval-g6.onrender.com/upload/",
        uploadData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            Accept: "application/json",
          },
        },
      );

      const imageUrl = data.url;

      const productInfo = {
        name: form.name,
        price: parseFloat(form.price),
        stock: parseInt(form.stock, 10),
        description: form.description,
        image_url: imageUrl,
        category: "books",
      };

      const { data: newProduct } = await axios.post(
        "https://api-funval-g6.onrender.com/products/",
        productInfo,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        },
      );

      handleClose();
      handleProductAdded(newProduct);

    } catch (submitError) {
      console.error(submitError);
      setError(
        submitError.response?.data?.message ||
          submitError.message ||
          "Error al crear el producto.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center ">
      <form
        onSubmit={handleSubmit}
        className="relative flex flex-col items-center w-xs md:w-md min-h-100 p-4 gap-4 text-blue-200 bg-slate-900 rounded-lg border-2 border-blue-600 shadow-blue-500/40"
      >
        <button
          onClick={handleClose}
          type="button"
          className="absolute top-5 right-5 hover:text-red-500 hover:cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </button>

        <h2 className="text-2xl">Nuevo Producto</h2>

        <input
          required
          type="text"
          onChange={handleChange}
          value={form.name}
          placeholder="Nombre"
          name="name"
          className="w-4/5 p-1 rounded border border-gray-900 bg-gray-700 placeholder-gray-400"
        />

        <input
          required
          type="number"
          step={0.01}
          min={0}
          onChange={handleChange}
          value={form.price}
          placeholder="Precio"
          name="price"
          className="w-4/5 p-1 rounded border border-gray-900 bg-gray-700 placeholder-gray-400"
        />

        <input
          required
          type="number"
          min={0}
          onChange={handleChange}
          value={form.stock}
          placeholder="Stock"
          name="stock"
          className="w-4/5 p-1 rounded border border-gray-900 bg-gray-700 placeholder-gray-400"
        />

        <textarea
          onChange={handleChange}
          value={form.description}
          placeholder="Descripción"
          name="description"
          className="w-4/5 p-1 rounded border border-gray-900 bg-gray-700 placeholder-gray-400"
        />

        <div className="w-4/5">
          <label htmlFor="image" className="w-full hover:cursor-pointer">
            <p>Imagen del Producto:</p>
            <input
              required
              type="file"
              onChange={handleChange}
              name="image"
              id="image"
              accept="image/*"
              className="sr-only"
            />
            <div className="flex justify-center items-center w-full max-h-32 p-1 rounded border border-gray-900 bg-gray-700 hover:cursor-pointer">
              {form.image ? <img src={URL.createObjectURL(form.image)} alt=""  className="max-h-30"/> : <p>Selecciona una imagen</p>}
            </div>
          </label>
        </div>

        {error && (
          <p className="text-sm text-red-400 w-4/5 text-center">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="flex justify-center text-2xl font-bold items-center w-4/5 h-12 border-2 border-blue-600 bg-blue-600 rounded-full hover:bg-blue-200 hover:text-blue-600 hover:cursor-pointer transition-colors duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Subiendo..." : "Subir"}
        </button>
      </form>
    </div>
  );
};

export default NewProductForm;
