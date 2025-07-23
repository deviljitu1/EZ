import React from 'react';
import { useWishlist } from '@/context/WishlistContext';

const Wishlist = () => {
  const { items, removeFromWishlist } = useWishlist();
  return (
    <div className="min-h-screen bg-background flex flex-col items-center py-8 px-2 sm:py-12 sm:px-4">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-blue-700">My Wishlist</h1>
      {items.length === 0 ? (
        <div className="text-lg text-gray-500">Your wishlist is empty.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full max-w-5xl">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow p-4 sm:p-6 flex flex-col items-center">
              <img src={item.image} alt={item.name} className="w-24 h-24 sm:w-32 sm:h-32 object-cover mb-4 rounded" />
              <h2 className="text-lg sm:text-xl font-semibold mb-2">{item.name}</h2>
              <p className="text-gray-600 mb-2 text-sm sm:text-base">{item.description}</p>
              <span className="text-blue-600 font-bold text-base sm:text-lg mb-2">${item.price}</span>
              <div className="flex gap-2 mt-2">
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm sm:text-base" onClick={() => {/* Add to cart logic here */}}>Add to Cart</button>
                <button className="px-4 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200 transition text-sm sm:text-base" onClick={() => removeFromWishlist(item.id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist; 