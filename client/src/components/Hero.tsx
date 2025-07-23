import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Shield, Truck } from "lucide-react";

export const Hero = () => {
  // Smooth scroll handler
  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative bg-gradient-hero text-white py-20 px-4 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Your One-Stop
            <span className="block bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Shopping Destination
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Discover amazing products with effortless shopping, secure checkout, and personalized recommendations
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              variant="hero"
              className="text-lg px-8 py-4"
              onClick={() => handleScroll("product-grid-section")}
            >
              Start Shopping
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-4 bg-white/10 border-white/30 text-white hover:bg-white/20"
              onClick={() => handleScroll("features-section")}
            >
              Learn More
            </Button>
          </div>
          
          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="flex flex-col items-center text-center">
              <div className="bg-white/20 p-4 rounded-full mb-4">
                <Star className="h-8 w-8 text-yellow-300" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Personalized Experience</h3>
              <p className="text-blue-100">AI-powered recommendations tailored just for you</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-white/20 p-4 rounded-full mb-4">
                <Shield className="h-8 w-8 text-green-300" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Secure Checkout</h3>
              <p className="text-blue-100">Bank-level security for all your transactions</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-white/20 p-4 rounded-full mb-4">
                <Truck className="h-8 w-8 text-blue-300" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Fast Delivery</h3>
              <p className="text-blue-100">Express shipping to your doorstep</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};