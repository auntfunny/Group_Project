import { useEffect } from "react";
import { useCart } from "../context/CartContext";

function formatearPrecio(value) {
  return Number(value).toFixed(2);
}

const CartModal = ({ isOpen, onClose }) => {
  const {
    itemsCarrito,
    cantidadCarrito,
    totalCarrito,
    limpiarCarrito,
    quitarDelCarrito,
    actualizarCantidad,
  } = useCart();

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center px-4 transition-all duration-300 ${
        isOpen
          ? "pointer-events-auto bg-slate-950/70 opacity-100 backdrop-blur-sm"
          : "pointer-events-none bg-slate-950/0 opacity-0"
      }`}
      onClick={onClose}
      aria-hidden={!isOpen}
    >
      <div
        className={`w-full max-w-xl rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl shadow-black/40 transition-all duration-300 ${
          isOpen
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-6 scale-95 opacity-0"
        }`}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-modal-title"
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <p className="text-sm text-blue-300">Resumen de compra</p>
            <h3
              id="cart-modal-title"
              className="mt-1 text-3xl font-bold text-white"
            >
              Tu carrito
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-blue-500/15 px-3 py-1 text-sm font-semibold text-blue-200">
              {cantidadCarrito} articulos
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-slate-700 bg-slate-950 text-slate-300 transition hover:border-slate-500 hover:text-white"
              aria-label="Cerrar carrito"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="mt-5 max-h-[55vh] space-y-3 overflow-y-auto pr-1">
          {itemsCarrito.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-950/80 px-4 py-10 text-center">
              <p className="text-base font-medium text-slate-200">
                Tu carrito esta vacio.
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Agrega productos para verlos aqui.
              </p>
            </div>
          ) : (
            itemsCarrito.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xl font-semibold text-white">{item.name}</p>
                    <p className="mt-1 text-sm text-slate-400">
                      ${formatearPrecio(item.price)} c/u
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => quitarDelCarrito(item.id)}
                    className="cursor-pointer text-sm font-semibold text-red-300 transition hover:text-red-200"
                  >
                    Quitar
                  </button>
                </div>

                <div className="mt-5 flex items-center justify-between gap-4">
                  <div className="inline-flex items-center rounded-xl border border-slate-700 bg-slate-900">
                    <button
                      type="button"
                      onClick={() => actualizarCantidad(item.id, item.quantity - 1)}
                      className="cursor-pointer px-4 py-3 text-slate-300 transition hover:text-white"
                    >
                      -
                    </button>
                    <span className="min-w-12 border-x border-slate-700 px-4 py-3 text-center text-base font-semibold text-white">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => actualizarCantidad(item.id, item.quantity + 1)}
                      className="cursor-pointer px-4 py-3 text-slate-300 transition hover:text-white"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-3xl font-bold text-white">
                    ${formatearPrecio(Number(item.price) * item.quantity)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-5 border-t border-slate-800 pt-4">
          <div className="flex items-center justify-between text-base text-slate-400">
            <span>Subtotal</span>
            <span>${formatearPrecio(totalCarrito)}</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-3xl font-bold text-white">
            <span>Total</span>
            <span>${formatearPrecio(totalCarrito)}</span>
          </div>
          <div className="mt-5 flex gap-3">
            <button
              type="button"
              onClick={limpiarCarrito}
              disabled={itemsCarrito.length === 0}
              className="flex-1 cursor-pointer rounded-2xl border border-slate-700 px-4 py-3 text-base font-medium text-slate-300 transition hover:border-slate-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              Limpiar
            </button>
            <button
              type="button"
              disabled={itemsCarrito.length === 0}
              className="flex-1 cursor-pointer rounded-2xl bg-blue-600 px-4 py-3 text-base font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Finalizar compra
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
