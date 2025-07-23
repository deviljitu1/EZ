import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '@/components/ProductGrid';
import { useAuth, authFetch } from '@/components/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

const OrderDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === Number(productId));
  const [form, setForm] = useState({
    address: '',
    payment: 'cod',
    requirements: ''
  });
  const [confirmed, setConfirmed] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  if (!product) return <div className="p-8 text-center">Product not found.</div>;

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const API_BASE = import.meta.env.VITE_API_URL || `http://${window.location.hostname}:4000`;
    // Send order to backend
    await authFetch(`${API_BASE}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: user?.id,
        items: [{
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1
        }],
        paymentMethod: form.payment,
        status: 'Pending',
        userDetails: {
          name: user?.name,
          mobile: user?.mobile,
          email: user?.email,
          address: form.address,
          pincode: user?.pincode
        }
      })
    });
    setConfirmed(true);
    toast({
      title: 'Order placed!',
      description: 'Keep shopping for more great deals.',
      variant: 'default',
    });
    setTimeout(() => navigate('/'), 1800);
  };

  if (confirmed) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background dark:bg-gray-900">
        <div className="bg-white dark:bg-gray-900 p-8 rounded shadow text-center border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">Order Confirmed!</h2>
          <p className="mb-2 dark:text-gray-200">Thank you for your purchase.</p>
          <p className="text-gray-500 dark:text-gray-400">Redirecting to your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-2 bg-background dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-4 sm:p-8 w-full max-w-lg mx-auto border border-gray-200 dark:border-gray-700">
        <h1 className="text-2xl font-bold mb-6 text-blue-700 dark:text-blue-300">Order Details</h1>
        <div className="flex items-center gap-4 mb-6">
          <img src={product.image} alt={product.name || ''} className="w-24 h-24 object-cover rounded" />
          <div>
            <h2 className="text-lg font-semibold dark:text-gray-100">{product.name}</h2>
            <p className="text-gray-600 dark:text-gray-300 font-bold text-base mb-1">${product.price}
              {product.originalPrice && (
                <span className="ml-2 text-sm text-gray-400 line-through">${product.originalPrice}</span>
              )}
              {'discount' in product && product.discount ? (
                <span className="ml-2 text-xs text-green-600 dark:text-green-400 font-semibold">{product.discount}% off</span>
              ) : null}
            </p>
            <p className="text-xs text-blue-700 dark:text-blue-300 font-medium mb-1">Category: {product.category}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{product.description}</p>
            <p className={`text-xs font-semibold ${product.stock > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>{product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold mb-1 dark:text-gray-100">Shipping Address</label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              required
              className="w-full border rounded p-3 text-base bg-gray-50 dark:bg-gray-800 dark:text-gray-100 border-gray-200 dark:border-gray-700"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1 dark:text-gray-100">Payment Method</label>
            <select
              name="payment"
              value={form.payment}
              onChange={handleChange}
              className="w-full border rounded p-3 text-base bg-gray-50 dark:bg-gray-800 dark:text-gray-100 border-gray-200 dark:border-gray-700"
            >
              <option value="cod">Cash on Delivery</option>
              <option value="card">Credit/Debit Card</option>
              <option value="upi">UPI</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-1 dark:text-gray-100">Product Requirements (optional)</label>
            <input
              name="requirements"
              value={form.requirements}
              onChange={handleChange}
              className="w-full border rounded p-3 text-base bg-gray-50 dark:bg-gray-800 dark:text-gray-100 border-gray-200 dark:border-gray-700"
            />
          </div>
          <button type="submit" className="w-full py-3 bg-blue-600 dark:bg-blue-700 text-white rounded hover:bg-blue-700 dark:hover:bg-blue-800 transition text-lg font-bold">Place Order</button>
        </form>
      </div>
    </div>
  );
};

export default OrderDetails; 