import { Star, Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import { useWishlist } from "@/context/WishlistContext";
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { FaLaptop, FaTshirt, FaGem, FaHome, FaFootballBall, FaBook, FaPuzzlePiece, FaRing, FaThLarge } from 'react-icons/fa';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  isOnSale: boolean;
  category: string;
  description?: string;
  stock?: number;
}

interface ProductGridProps {
  products: Product[];
  searchQuery: string;
}

export const ProductGrid = ({ products, searchQuery }: ProductGridProps) => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const allCategories = Array.from(new Set(products.map((p: any) => p.category)));

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleWishlistToggle = (product: any) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        description: product.category
      });
    }
  };

  const handleShopNow = () => {
    if (location.pathname === '/') {
      const el = document.getElementById('product-grid-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById('product-grid-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  };

  const filteredProducts = products.filter(product => {
    if (selectedCategory && product.category !== selectedCategory) return false;
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      product.name.toLowerCase().includes(q) ||
      product.category.toLowerCase().includes(q)
    );
  });

  // Group filtered products by category
  const grouped = filteredProducts.reduce((acc: Record<string, typeof products>, product) => {
    if (!acc[product.category]) acc[product.category] = [];
    acc[product.category].push(product);
    return acc;
  }, {});

  const categoryOrder = [
    "Electronics", "Fashion", "Beauty", "Home", "Sports", "Books", "Toys", "Jewelry"
  ];

  const categoryIcons: Record<string, JSX.Element> = {
    Electronics: <FaLaptop className="inline-block mr-2 text-blue-500" />,
    Fashion: <FaTshirt className="inline-block mr-2 text-pink-500" />,
    Beauty: <FaGem className="inline-block mr-2 text-purple-500" />,
    Home: <FaHome className="inline-block mr-2 text-green-500" />,
    Sports: <FaFootballBall className="inline-block mr-2 text-orange-500" />,
    Books: <FaBook className="inline-block mr-2 text-yellow-600" />,
    Toys: <FaPuzzlePiece className="inline-block mr-2 text-red-400" />,
    Jewelry: <FaRing className="inline-block mr-2 text-yellow-500" />,
  };

  return (
    <section id="product-grid-section" className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Featured Products</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our handpicked selection of premium products with unbeatable prices
          </p>
        </div>
        <div className="py-8 px-4 max-w-7xl mx-auto">
          <div className="flex flex-nowrap items-center gap-3 mb-8 overflow-x-auto scrollbar-hide py-2 px-1 bg-white/80 dark:bg-gray-900/80 rounded-lg shadow-card">
            <button
              className={`flex items-center px-4 py-2 rounded-lg font-semibold shadow transition border-2 ${!selectedCategory ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-blue-700 border-blue-200 hover:bg-blue-50'}`}
              onClick={() => setSelectedCategory(null)}
            >
              <FaThLarge className="inline-block mr-2" /> Show All
            </button>
            {categoryOrder.filter(cat => allCategories.includes(cat)).map(cat => (
              <button
                key={cat}
                className={`flex items-center px-4 py-2 rounded-lg font-semibold shadow transition border-2 ${selectedCategory === cat ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-blue-700 border-blue-200 hover:bg-blue-50'}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {categoryIcons[cat] || <FaThLarge className="inline-block mr-2" />} {cat}
              </button>
            ))}
          </div>
          {selectedCategory && (
            <span className="ml-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-semibold text-sm">{selectedCategory} <button className="ml-1 text-blue-500 hover:text-blue-700" onClick={() => setSelectedCategory(null)}>&times;</button></span>
          )}
        </div>
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground text-xl">
            No products found
          </div>
        ) : (
          categoryOrder.filter(cat => grouped[cat] && grouped[cat].length > 0).map(category => (
            <div key={category} className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-blue-700 border-b-2 border-blue-200 pb-2">{category}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {grouped[category].map((product) => (
            <Card key={product.id} className="group cursor-pointer hover:shadow-elegant transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {product.isOnSale && (
                    <Badge className="absolute top-3 left-3 bg-destructive text-destructive-foreground">
                      Sale
                    </Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-3 right-3 bg-white/90 hover:bg-white text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    onClick={() => handleWishlistToggle(product)}
                  >
                    <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? 'text-pink-500 fill-pink-500' : ''}`} />
                  </Button>
                </div>
                <div className="p-6">
                  <div className="mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {product.category}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-2">{product.description || 'No description available.'}</p>
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-muted-foreground">
                      ({product.reviews || 0} reviews)
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-primary">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-lg text-muted-foreground line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button 
                      className="w-full mb-2" 
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </Button>
                    <Button 
                      className="w-full" 
                      onClick={() => navigate(`/order/${product.id}`)}
                    >
                      View Product
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};
