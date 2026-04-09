import { useAuth } from "../context/AuthContext";

const ProductCard = ({ product }) => {
  const { user } = useAuth();

  return (
    <div className="w-full max-w-sm bg-slate-900 p-6 border border-slate-800 rounded-xl shadow-xs hover:border-slate-600 hover:shadow-lg hover:shadow-black/30 transition-all duration-200 ">
      <div className="flex items-center justify-center h-60 w-full mb-6 overflow-hidden">
        <img
          className="rounded-base object-cover origin-center"
          src={product.image_url}
          alt={product.name}
        />
      </div>
      <div>
        <h5 className="text-xl text-white font-semibold tracking-tight">
          {product.name}
        </h5>
        <div className="flex items-center justify-between mt-6">
          <span className="text-3xl font-extrabold text-slate-400">
            ${product.price}
          </span>
          <button
            type="button"
            className="flex items-center gap-2 text-white rounded-lg bg-blue-600/20 hover:bg-blue-600/40 border border-blue-500/20 shadow shadow-blue-600/40 font-medium leading-5 rounded-base text-sm px-3 py-2  hover:cursor-pointer"
          >
            {user.role === "cliente" ? (
              <svg
                className="size-6"
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
            ) : (
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
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
            )}
            {user.role === "cliente" ? "Agregar a carrito" : "Editar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
