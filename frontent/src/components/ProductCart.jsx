import React from 'react';

const ProductCard = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-100 p-4">
      {/* Main Product Card Container */}
      <div className="max-w-sm bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1">
        
        {/* Product Image Container with Badge */}
        <div className="relative">
          <img 
            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop" 
            alt="Headphones" 
            className="w-full h-56 object-cover"
          />
          <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
            NEW
          </span>
        </div>

        {/* Content Section */}
        <div className="p-5">
          {/* Category */}
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
            Electronics
          </span>

          {/* Title */}
          <h2 className="text-xl font-bold text-gray-800 mt-1 hover:text-blue-600 transition duration-200 cursor-pointer">
            Wireless Headphones
          </h2>

          {/* Description */}
          <p className="text-gray-500 text-sm mt-2 line-clamp-2">
            High-quality wireless sound with noise cancellation technology and long battery life.
          </p>

          {/* Price and Action Button */}
          <div className="flex items-center justify-between mt-5 pt-3 border-t border-gray-100">
            <div>
              <span className="text-xs text-gray-400 block">Price</span>
              <span className="text-2xl font-extrabold text-gray-900">$99.99</span>
            </div>

            <button className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
              Add to Cart
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductCard;