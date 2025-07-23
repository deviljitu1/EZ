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

interface ProductGridProps {
  searchQuery: string;
}

export const products = [
  // Electronics
  {
    id: 101,
    name: "Bluetooth Speaker",
    price: 49.99,
    originalPrice: 69.99,
    image: "https://images.unsplash.com/photo-1512446733611-9099a758e63c?w=400&h=400&fit=crop", // Bluetooth speaker
    rating: 4.7,
    reviews: 150,
    isOnSale: true,
    category: "Electronics",
    description: "Experience high-quality sound with this portable Bluetooth speaker.",
    stock: 20
  },
  {
    id: 102,
    name: "Wireless Mouse",
    price: 19.99,
    originalPrice: 29.99,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop", // Mouse
    rating: 4.8,
    reviews: 180,
    isOnSale: false,
    category: "Electronics",
    description: "Ergonomic design for comfortable and precise navigation.",
    stock: 15
  },
  {
    id: 103,
    name: "4K Ultra HD Monitor",
    price: 299.99,
    originalPrice: 399.99,
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=400&fit=crop", // Monitor
    rating: 4.9,
    reviews: 120,
    isOnSale: true,
    category: "Electronics",
    description: "Enjoy stunning 4K resolution for your gaming and work.",
    stock: 10
  },
  {
    id: 104,
    name: "Noise Cancelling Headphones",
    price: 159.99,
    originalPrice: 199.99,
    image: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=400&h=400&fit=crop", // Headphones
    rating: 4.8,
    reviews: 100,
    isOnSale: false,
    category: "Electronics",
    description: "Experience immersive sound with noise-cancelling technology.",
    stock: 12
  },
  {
    id: 105,
    name: "Smartphone Gimbal",
    price: 89.99,
    originalPrice: 129.99,
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=400&h=400&fit=crop", // Gimbal
    rating: 4.7,
    reviews: 90,
    isOnSale: true,
    category: "Electronics",
    description: "Keep your smartphone steady for professional-quality videos.",
    stock: 18
  },
  {
    id: 106,
    name: "Wireless Keyboard",
    price: 29.99,
    originalPrice: 39.99,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop", // Keyboard
    rating: 4.6,
    reviews: 110,
    isOnSale: false,
    category: "Electronics",
    description: "Compact and portable wireless keyboard for your laptop.",
    stock: 10
  },
  {
    id: 107,
    name: "External SSD",
    price: 99.99,
    originalPrice: 149.99,
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&h=400&fit=crop", // SSD
    rating: 4.9,
    reviews: 80,
    isOnSale: true,
    category: "Electronics",
    description: "High-speed external storage for your data.",
    stock: 15
  },
  {
    id: 108,
    name: "Smart LED Desk Lamp",
    price: 39.99,
    originalPrice: 49.99,
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&h=400&fit=crop", // Lamp
    rating: 4.7,
    reviews: 130,
    isOnSale: false,
    category: "Electronics",
    description: "Adjustable brightness and color temperature for your workspace.",
    stock: 20
  },
  {
    id: 109,
    name: "Portable Power Bank",
    price: 24.99,
    originalPrice: 34.99,
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&h=400&fit=crop", // Power Bank
    rating: 4.8,
    reviews: 110,
    isOnSale: true,
    category: "Electronics",
    description: "Compact and powerful power bank for your devices.",
    stock: 18
  },
  {
    id: 110,
    name: "Smartwatch",
    price: 129.99,
    originalPrice: 159.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop", // Smartwatch
    rating: 4.6,
    reviews: 95,
    isOnSale: false,
    category: "Electronics",
    description: "Track your fitness and receive notifications on your wrist.",
    stock: 10
  },
  // Fashion
  {
    id: 201,
    name: "Classic Denim Jacket",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 88,
    isOnSale: true,
    category: "Fashion",
    description: "Timeless denim jacket for all seasons.",
    stock: 25
  },
  {
    id: 202,
    name: "High-Waisted Jeans",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 120,
    isOnSale: false,
    category: "Fashion",
    description: "Comfortable and stylish high-waisted jeans.",
    stock: 18
  },
  {
    id: 203,
    name: "Silk Blouse",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
    rating: 4.9,
    reviews: 75,
    isOnSale: true,
    category: "Fashion",
    description: "Elegant silk blouse for a sophisticated look.",
    stock: 15
  },
  {
    id: 204,
    name: "Leather Skirt",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 90,
    isOnSale: false,
    category: "Fashion",
    description: "Sophisticated leather skirt for a professional look.",
    stock: 12
  },
  {
    id: 205,
    name: "Cotton T-Shirt",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 150,
    isOnSale: true,
    category: "Fashion",
    description: "Casual cotton t-shirt for everyday wear.",
    stock: 30
  },
  {
    id: 206,
    name: "Denim Shorts",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 100,
    isOnSale: false,
    category: "Fashion",
    description: "Cool denim shorts for the summer.",
    stock: 20
  },
  {
    id: 207,
    name: "Silk Scarf",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
    rating: 4.9,
    reviews: 80,
    isOnSale: true,
    category: "Fashion",
    description: "Elegant silk scarf for a touch of luxury.",
    stock: 18
  },
  {
    id: 208,
    name: "Leather Jacket",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 60,
    isOnSale: false,
    category: "Fashion",
    description: "Stylish leather jacket for a classic look.",
    stock: 10
  },
  {
    id: 209,
    name: "Cotton Dress",
    price: 54.99,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 110,
    isOnSale: true,
    category: "Fashion",
    description: "Casual cotton dress for a relaxed look.",
    stock: 25
  },
  {
    id: 210,
    name: "Silk Pajamas",
    price: 44.99,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
    rating: 4.9,
    reviews: 70,
    isOnSale: false,
    category: "Fashion",
    description: "Soft and comfortable silk pajamas.",
    stock: 15
  },
  // Beauty
  {
    id: 301,
    name: "Luxury Lipstick Set",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 53,
    isOnSale: false,
    category: "Beauty"
  },
  {
    id: 302,
    name: "Facial Cleansing Brush",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 29,
    isOnSale: true,
    category: "Beauty"
  },
  {
    id: 303,
    name: "High-End Face Cream",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&h=400&fit=crop",
    rating: 4.9,
    reviews: 67,
    isOnSale: true,
    category: "Beauty",
    description: "Rich and hydrating face cream for all skin types.",
    stock: 12
  },
  {
    id: 304,
    name: "Eyeshadow Palette",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 75,
    isOnSale: false,
    category: "Beauty",
    description: "Versatile eyeshadow palette for any look.",
    stock: 15
  },
  {
    id: 305,
    name: "Nail Polish Set",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 90,
    isOnSale: true,
    category: "Beauty",
    description: "A variety of nail polishes for a perfect manicure.",
    stock: 20
  },
  {
    id: 306,
    name: "Hair Dryer",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&h=400&fit=crop",
    rating: 4.9,
    reviews: 50,
    isOnSale: false,
    category: "Beauty",
    description: "Professional hair dryer for fast drying.",
    stock: 10
  },
  {
    id: 307,
    name: "Luxury Perfume",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 60,
    isOnSale: false,
    category: "Beauty",
    description: "Sophisticated luxury perfume for a special occasion.",
    stock: 8
  },
  {
    id: 308,
    name: "Face Mask Set",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 80,
    isOnSale: true,
    category: "Beauty",
    description: "A set of face masks for deep cleansing.",
    stock: 20
  },
  {
    id: 309,
    name: "Hair Straightener",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&h=400&fit=crop",
    rating: 4.9,
    reviews: 55,
    isOnSale: false,
    category: "Beauty",
    description: "Professional hair straightener for smooth hair.",
    stock: 12
  },
  {
    id: 310,
    name: "Luxury Lip Balm",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 70,
    isOnSale: true,
    category: "Beauty",
    description: "Intensive lip balm for soft, hydrated lips.",
    stock: 25
  },
  // Home
  {
    id: 401,
    name: "Modern Coffee Table",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 65,
    isOnSale: true,
    category: "Home",
    description: "Stylish coffee table for your living room.",
    stock: 20
  },
  {
    id: 402,
    name: "Wooden Nightstand",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 50,
    isOnSale: false,
    category: "Home",
    description: "Cozy wooden nightstand for your bedroom.",
    stock: 15
  },
  {
    id: 403,
    name: "Plush Throw Blanket",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 41,
    isOnSale: true,
    category: "Home"
  },
  {
    id: 404,
    name: "Modern Desk Lamp",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&h=400&fit=crop",
    rating: 4.9,
    reviews: 55,
    isOnSale: false,
    category: "Home",
    description: "Functional desk lamp for your workspace.",
    stock: 10
  },
  {
    id: 405,
    name: "Wall Art Print",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 70,
    isOnSale: true,
    category: "Home",
    description: "Beautiful wall art print for your walls.",
    stock: 20
  },
  {
    id: 406,
    name: "Floor Rug",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 50,
    isOnSale: false,
    category: "Home",
    description: "Soft and cozy floor rug for your living space.",
    stock: 15
  },
  {
    id: 407,
    name: "Curtain Set",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&h=400&fit=crop",
    rating: 4.9,
    reviews: 60,
    isOnSale: true,
    category: "Home",
    description: "Stylish curtain set for your windows.",
    stock: 12
  },
  {
    id: 408,
    name: "Wooden Storage Box",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 80,
    isOnSale: false,
    category: "Home",
    description: "Organize your belongings with this wooden storage box.",
    stock: 18
  },
  {
    id: 409,
    name: "Floor Lamp",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 70,
    isOnSale: true,
    category: "Home",
    description: "Chic floor lamp for your living room.",
    stock: 15
  },
  {
    id: 410,
    name: "Curtain Rod",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&h=400&fit=crop",
    rating: 4.9,
    reviews: 60,
    isOnSale: false,
    category: "Home",
    description: "Durable curtain rod for your windows.",
    stock: 10
  },
  // Sports
  {
    id: 501,
    name: "Yoga Mat Pro",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 78,
    isOnSale: false,
    category: "Sports"
  },
  {
    id: 502,
    name: "Adjustable Dumbbells Set",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1517960413843-0aee8e2d471c?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 54,
    isOnSale: true,
    category: "Sports"
  },
  {
    id: 503,
    name: "Fitness Resistance Bands",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 90,
    isOnSale: false,
    category: "Sports",
    description: "Versatile resistance bands for strength training.",
    stock: 20
  },
  {
    id: 504,
    name: "Jump Rope",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&h=400&fit=crop",
    rating: 4.9,
    reviews: 85,
    isOnSale: true,
    category: "Sports",
    description: "Lightweight jump rope for cardio workouts.",
    stock: 15
  },
  {
    id: 505,
    name: "Weighted Vest",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 60,
    isOnSale: false,
    category: "Sports",
    description: "Adjustable weighted vest for strength training.",
    stock: 10
  },
  {
    id: 506,
    name: "Foam Roller",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 70,
    isOnSale: true,
    category: "Sports",
    description: "Foam roller for muscle recovery and flexibility.",
    stock: 20
  },
  {
    id: 507,
    name: "Resistance Tubes",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&h=400&fit=crop",
    rating: 4.9,
    reviews: 55,
    isOnSale: false,
    category: "Sports",
    description: "Adjustable resistance tubes for strength training.",
    stock: 15
  },
  {
    id: 508,
    name: "Jump Rope",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&h=400&fit=crop",
    rating: 4.9,
    reviews: 85,
    isOnSale: true,
    category: "Sports",
    description: "Lightweight jump rope for cardio workouts.",
    stock: 15
  },
  {
    id: 509,
    name: "Weighted Vest",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 60,
    isOnSale: false,
    category: "Sports",
    description: "Adjustable weighted vest for strength training.",
    stock: 10
  },
  {
    id: 510,
    name: "Foam Roller",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 70,
    isOnSale: true,
    category: "Sports",
    description: "Foam roller for muscle recovery and flexibility.",
    stock: 20
  },
  // Books
  {
    id: 601,
    name: "Bestselling Novel: The Wanderer",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=400&fit=crop",
    rating: 4.9,
    reviews: 210,
    isOnSale: false,
    category: "Books"
  },
  {
    id: 602,
    name: "Children's Storybook: Dreamland",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 98,
    isOnSale: true,
    category: "Books"
  },
  {
    id: 603,
    name: "Classic Teddy Bear",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 65,
    isOnSale: false,
    category: "Toys"
  },
  {
    id: 604,
    name: "Building Blocks Set",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 80,
    isOnSale: true,
    category: "Toys"
  },
  {
    id: 605,
    name: "Men's Leather Wallet",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 37,
    isOnSale: false,
    category: "Fashion"
  },
  {
    id: 606,
    name: "Women's Silk Scarf",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=400&fit=crop",
    rating: 4.9,
    reviews: 44,
    isOnSale: true,
    category: "Fashion"
  },
  {
    id: 607,
    name: "Luxury Lipstick Set",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 53,
    isOnSale: false,
    category: "Beauty"
  },
  {
    id: 608,
    name: "Facial Cleansing Brush",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 29,
    isOnSale: true,
    category: "Beauty"
  },
  {
    id: 609,
    name: "Bestselling Novel: The Wanderer",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=400&fit=crop",
    rating: 4.9,
    reviews: 210,
    isOnSale: false,
    category: "Books"
  },
  {
    id: 610,
    name: "Children's Storybook: Dreamland",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 98,
    isOnSale: true,
    category: "Books"
  },
  // Toys
  {
    id: 701,
    name: "Classic Teddy Bear",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 65,
    isOnSale: false,
    category: "Toys"
  },
  {
    id: 702,
    name: "Building Blocks Set",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 80,
    isOnSale: true,
    category: "Toys"
  },
  {
    id: 703,
    name: "Men's Leather Wallet",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 37,
    isOnSale: false,
    category: "Fashion"
  },
  {
    id: 704,
    name: "Women's Silk Scarf",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=400&fit=crop",
    rating: 4.9,
    reviews: 44,
    isOnSale: true,
    category: "Fashion"
  },
  {
    id: 705,
    name: "Luxury Lipstick Set",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 53,
    isOnSale: false,
    category: "Beauty"
  },
  {
    id: 706,
    name: "Facial Cleansing Brush",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 29,
    isOnSale: true,
    category: "Beauty"
  },
  {
    id: 707,
    name: "Bestselling Novel: The Wanderer",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=400&fit=crop",
    rating: 4.9,
    reviews: 210,
    isOnSale: false,
    category: "Books"
  },
  {
    id: 708,
    name: "Children's Storybook: Dreamland",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 98,
    isOnSale: true,
    category: "Books"
  },
  {
    id: 709,
    name: "Classic Teddy Bear",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 65,
    isOnSale: false,
    category: "Toys"
  },
  {
    id: 710,
    name: "Building Blocks Set",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 80,
    isOnSale: true,
    category: "Toys"
  },
  // Jewelry
  {
    id: 801,
    name: "Elegant Gold Bracelet",
    price: 89.99,
    originalPrice: 129.99,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 124,
    isOnSale: true,
    category: "Jewelry",
    description: "A beautiful gold bracelet for any occasion.",
    stock: 10
  },
  {
    id: 802,
    name: "Premium Wireless Headphones",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    rating: 4.9,
    reviews: 89,
    isOnSale: false,
    category: "Electronics",
    description: "Experience high-fidelity sound with these premium wireless headphones.",
    stock: 15
  },
  {
    id: 803,
    name: "Designer Handbag",
    price: 149.99,
    originalPrice: 199.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 156,
    isOnSale: true,
    category: "Fashion",
    description: "A stylish designer handbag to complement your look.",
    stock: 8
  },
  {
    id: 804,
    name: "Smart Fitness Watch",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 203,
    isOnSale: false,
    category: "Electronics",
    description: "Track your fitness and health with this smart watch.",
    stock: 20
  },
  {
    id: 805,
    name: "Luxury Perfume Set",
    price: 79.99,
    originalPrice: 99.99,
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop",
    rating: 4.9,
    reviews: 67,
    isOnSale: true,
    category: "Beauty",
    description: "A set of luxury perfumes for every mood.",
    stock: 12
  },
  {
    id: 806,
    name: "Professional Camera",
    price: 899.99,
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 45,
    isOnSale: false,
    category: "Electronics",
    description: "Capture stunning photos with this professional camera.",
    stock: 5
  },
  {
    id: 807,
    name: "Modern Table Lamp",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&h=400&fit=crop",
    rating: 4.5,
    reviews: 32,
    isOnSale: false,
    category: "Home",
    description: "A modern table lamp to brighten up your space.",
    stock: 25
  },
  {
    id: 808,
    name: "Plush Throw Blanket",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 41,
    isOnSale: true,
    category: "Home"
  },
  {
    id: 809,
    name: "Yoga Mat Pro",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 78,
    isOnSale: false,
    category: "Sports"
  },
  {
    id: 810,
    name: "Adjustable Dumbbells Set",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1517960413843-0aee8e2d471c?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 54,
    isOnSale: true,
    category: "Sports"
  },
  {
    id: 811,
    name: "Bestselling Novel: The Wanderer",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=400&fit=crop",
    rating: 4.9,
    reviews: 210,
    isOnSale: false,
    category: "Books"
  },
  {
    id: 812,
    name: "Children's Storybook: Dreamland",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 98,
    isOnSale: true,
    category: "Books"
  },
  {
    id: 813,
    name: "Classic Teddy Bear",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 65,
    isOnSale: false,
    category: "Toys"
  },
  {
    id: 814,
    name: "Building Blocks Set",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 80,
    isOnSale: true,
    category: "Toys"
  },
  {
    id: 815,
    name: "Men's Leather Wallet",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 37,
    isOnSale: false,
    category: "Fashion"
  },
  {
    id: 816,
    name: "Women's Silk Scarf",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=400&fit=crop",
    rating: 4.9,
    reviews: 44,
    isOnSale: true,
    category: "Fashion"
  },
  {
    id: 817,
    name: "Luxury Lipstick Set",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 53,
    isOnSale: false,
    category: "Beauty"
  },
  {
    id: 818,
    name: "Facial Cleansing Brush",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 29,
    isOnSale: true,
    category: "Beauty"
  },
];

export const ProductGrid = ({ searchQuery }: ProductGridProps) => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const allCategories = Array.from(new Set(products.map(p => p.category)));

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