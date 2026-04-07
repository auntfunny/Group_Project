const ProductCard = ({ product }) => {
  return (
    <div className="w-full max-w-sm bg-slate-900 p-6 border border-slate-800 rounded-xl shadow-xs hover:border-slate-600 hover:shadow-lg hover:shadow-black/30 transition-all duration-200 cursor-pointer">
      <a href="#" className="flex items-center justify-center h-60 w-full mb-6 overflow-hidden">
        <img
          className="rounded-base object-cover origin-center"
          src={product.image_url}
          alt={product.name}
        />
      </a>
      <div>
        <a href="#">
          <h5 className="text-xl text-white font-semibold tracking-tight">
            {product.name}
          </h5>
        </a>
        <div className="flex items-center justify-between mt-6">
          <span className="text-3xl font-extrabold text-slate-400">
            ${product.price}
          </span>
          <button
            type="button"
            className="inline-flex items-center  text-white bg-blue-600/20 hover:bg-blue-600/40 border border-blue-500/20 shadow-xs font-medium leading-5 rounded-base text-sm px-3 py-2 "
          >
            <svg
              className="w-4 h-4 me-1.5"
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
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
