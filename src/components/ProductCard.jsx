import { useState } from "react";
import { useCart } from "../context/CartContext";
import ConfirmarProductoModal from "./ConfirmarProductoModal";

const ProductCard = ({ product: producto }) => {
  const { agregarAlCarrito } = useCart();
  const [estaConfirmacionAbierta, setEstaConfirmacionAbierta] = useState(false);

  function abrirConfirmacion() {
    setEstaConfirmacionAbierta(true);
  }

  function cerrarConfirmacion() {
    setEstaConfirmacionAbierta(false);
  }

  function confirmarAgregar() {
    agregarAlCarrito(producto);
    cerrarConfirmacion();
  }

  return (
    <>
      <div className="w-full max-w-sm cursor-pointer rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-xs transition-all duration-200 hover:border-slate-600 hover:shadow-lg hover:shadow-black/30">
        <a
          href="#"
          className="mb-6 flex h-60 w-full cursor-pointer items-center justify-center overflow-hidden"
        >
          <img
            className="origin-center rounded-base object-cover"
            src={producto.image_url}
            alt={producto.name}
          />
        </a>

        <div>
          <a href="#" className="cursor-pointer">
            <h5 className="text-xl font-semibold tracking-tight text-white">
              {producto.name}
            </h5>
          </a>

          <div className="mt-6 flex items-center justify-between">
            <span className="text-3xl font-extrabold text-slate-400">
              ${producto.price}
            </span>

            <button
              type="button"
              onClick={abrirConfirmacion}
              className="inline-flex cursor-pointer items-center rounded-base border border-blue-500/20 bg-blue-600/20 px-3 py-2 text-sm font-medium leading-5 text-white shadow-xs hover:bg-blue-600/40"
            >
              <svg
                className="me-1.5 h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
                />
              </svg>
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
      <ConfirmarProductoModal
        isOpen={estaConfirmacionAbierta}
        producto={producto}
        onClose={cerrarConfirmacion}
        onConfirm={confirmarAgregar}
      />
    </>
  );
};

export default ProductCard;
