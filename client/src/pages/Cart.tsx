import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/context/CartContext';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { authFetch } from '@/components/context/AuthContext';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, getTotalPrice, getTotalItems } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-2 py-8 sm:px-4 sm:py-16">
          <div className="text-center">
            <ShoppingBag className="mx-auto h-20 w-20 sm:h-24 sm:w-24 text-muted-foreground mb-6" />
            <h1 className="text-2xl sm:text-3xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8">Start adding some products to your cart!</p>
            <Button asChild size="lg">
              <Link to="/">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-2 py-6 sm:px-4 sm:py-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Shopping Cart ({getTotalItems()} items)</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id} className="p-3 sm:p-4">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div className="flex-1 w-full">
                    <h3 className="font-semibold text-base sm:text-lg">{item.name}</h3>
                    <p className="text-primary font-bold text-base sm:text-lg">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-2 mt-2 sm:mt-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="h-10 w-10"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center text-lg">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="h-10 w-10"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFromCart(item.id)}
                    className="text-destructive hover:text-destructive h-10 w-10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
          <div className="sticky top-20 bg-white dark:bg-gray-900 rounded-lg shadow-card p-4 sm:p-6 h-fit mt-4 lg:mt-0">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <Separator className="mb-4" />
            <div className="flex justify-between mb-2 text-base">
              <span>Total Items:</span>
              <span>{getTotalItems()}</span>
            </div>
            <div className="flex justify-between mb-4 text-lg font-bold">
              <span>Total Price:</span>
              <span>${getTotalPrice().toFixed(2)}</span>
            </div>
            <Button asChild size="lg" className="w-full mt-2">
              <Link to="/order/checkout">Proceed to Checkout</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;