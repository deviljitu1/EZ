import { Check, ShoppingBag, CreditCard, BarChart3, Users, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: ShoppingBag,
    title: "Effortless Product Discovery",
    description: "Browse through our comprehensive catalog with intelligent filters and search to find exactly what you need.",
    benefits: ["Smart search algorithms", "Advanced filtering options", "Category-based navigation"]
  },
  {
    icon: Sparkles,
    title: "Personalized Shopping Experience",
    description: "AI-powered recommendations based on your preferences, browsing history, and purchase patterns.",
    benefits: ["Tailored product suggestions", "Custom deals and offers", "Wishlist management"]
  },
  {
    icon: CreditCard,
    title: "Seamless Checkout Process",
    description: "Secure, fast, and user-friendly checkout with multiple payment options and instant confirmation.",
    benefits: ["Multiple payment methods", "Secure transactions", "Instant order confirmation"]
  },
  {
    icon: Users,
    title: "Efficient Order Management",
    description: "Complete order tracking and management system for both buyers and sellers.",
    benefits: ["Real-time order tracking", "Easy returns & exchanges", "Order history access"]
  },
  {
    icon: BarChart3,
    title: "Insightful Analytics",
    description: "Comprehensive dashboard for sellers with detailed analytics to drive business growth.",
    benefits: ["Sales performance metrics", "Customer insights", "Inventory management"]
  }
];

export const Features = () => {
  return (
    <section id="features-section" className="py-10 sm:py-16 px-2 sm:px-4 bg-secondary/30">
      <div className="container mx-auto">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-4xl font-bold mb-4">Why Choose ShopEZ?</h2>
          <p className="text-base sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience the future of online shopping with our cutting-edge features designed for both shoppers and sellers
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-card transition-all duration-300 group">
              <CardHeader>
                <div className="flex flex-col items-start space-y-2 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
                  <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors duration-300">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg sm:text-xl">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 text-sm sm:text-base">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-xs sm:text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Success Story Section */}
        <div className="bg-card rounded-2xl p-4 sm:p-8 shadow-elegant">
          <div className="text-center mb-6 sm:mb-8">
            <h3 className="text-xl sm:text-2xl font-bold mb-4">Success Story: Sarah's Perfect Gift</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
              See how ShopEZ helped Sarah find the perfect birthday gift for her best friend Emily, 
              showcasing our seamless shopping experience in action.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="text-center">
              <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-xl sm:text-2xl font-bold text-primary">1</span>
              </div>
              <h4 className="font-semibold mb-2">Quick Discovery</h4>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Sarah used our smart filters to find the perfect bracelet in minutes
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-xl sm:text-2xl font-bold text-primary">2</span>
              </div>
              <h4 className="font-semibold mb-2">Personalized Pick</h4>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Our AI recommended a gold bangle that matched Emily's style perfectly
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-xl sm:text-2xl font-bold text-primary">3</span>
              </div>
              <h4 className="font-semibold mb-2">Instant Success</h4>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Secure checkout and instant confirmation made Emily's birthday special
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};