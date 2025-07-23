import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProductGrid } from "@/components/ProductGrid";
import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";
import axios from "@/api/axios";
import React from "react";

export interface ProductGridProps {
  products: Product[];
  searchQuery: string;
}

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

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/products") // Adjust if your backend route is different
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Hero />
      {loading ? (
        <p className="text-center py-10 text-lg">Loading products...</p>
      ) : (
        <ProductGrid products={products} searchQuery={searchQuery} />
      )}
      <Features />
      <Footer />
    </div>
  );
};

export default Index;
