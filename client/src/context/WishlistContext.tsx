import React, { createContext, useContext, useState } from 'react';

export interface WishlistItem {
  id: number;
  name: string;
  price: number;
  image: string;
  description?: string;
}

interface WishlistContextType {
  items: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: number) => void;
  isInWishlist: (id: number) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<WishlistItem[]>([]);

  const addToWishlist = (item: WishlistItem) => {
    setItems(prev => prev.some(i => i.id === item.id) ? prev : [...prev, item]);
  };

  const removeFromWishlist = (id: number) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const isInWishlist = (id: number) => items.some(i => i.id === id);

  return (
    <WishlistContext.Provider value={{ items, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within a WishlistProvider');
  return ctx;
}; 