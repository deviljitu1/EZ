import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, authFetch } from '@/components/context/AuthContext';
// In a real app, get userId from auth context
const userId = 1;

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    const API_BASE = import.meta.env.VITE_API_URL || `http://${window.location.hostname}:4000`;
    authFetch(`${API_BASE}/api/orders/${user.id}`)
      .then(res => res.json())
      .then(data => {
        setOrders(data);
        setLoading(false);
      });
  }, [user]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-blue-700">My Orders</h1>
      {loading ? (
        <div>Loading...</div>
      ) : orders.length === 0 ? (
        <div className="text-lg text-gray-500 flex flex-col items-center">
          You have no orders yet.
          <button onClick={() => navigate('/')} className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">Start Shopping</button>
        </div>
      ) : (
        <div className="w-full max-w-3xl space-y-6">
          {orders.map(order => (
            <div key={order.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between mb-2 items-center">
                <span className="font-semibold text-blue-700">Order #{order.id}</span>
                <span className="text-gray-500 text-sm">{new Date(order.orderDate || order.date).toLocaleString()}</span>
                <span className={`ml-4 px-3 py-1 rounded-full text-xs font-bold shadow-sm
                  ${order.status === 'Completed' ? 'bg-green-100 text-green-700' :
                    order.status === 'Shipped' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-blue-100 text-blue-700'}`}>{order.status}</span>
                <button onClick={() => setSelectedOrder(order)} className="ml-4 px-4 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition text-sm font-semibold">View Details</button>
              </div>
              <div className="mb-2 text-sm text-gray-600">Payment Method: <span className="font-semibold">{order.paymentMethod}</span></div>
              <div className="mb-2">
                <span className="font-semibold">Items:</span>
                <ul className="list-disc ml-6">
                  {order.items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 my-2">
                      {item.image && <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded shadow" />}
                      <span className="font-semibold">{item.name}</span>
                      <span className="text-gray-500">x {item.quantity || 1}</span>
                      <span className="text-blue-700 font-bold ml-2">${item.price}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg relative animate-fade-in border border-blue-100">
            <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl" onClick={() => setSelectedOrder(null)}>&times;</button>
            <h2 className="text-2xl font-bold mb-6 text-blue-700">Order Details</h2>
            <div className="mb-2 text-sm text-gray-600">Order ID: <span className="font-semibold">{selectedOrder.id}</span></div>
            <div className="mb-2 text-sm text-gray-600">Date: <span className="font-semibold">{new Date(selectedOrder.orderDate || selectedOrder.date).toLocaleString()}</span></div>
            <div className="mb-2 text-sm text-gray-600">Status: <span className="font-semibold">{selectedOrder.status}</span></div>
            <div className="mb-2 text-sm text-gray-600">Payment Method: <span className="font-semibold">{selectedOrder.paymentMethod}</span></div>
            {selectedOrder.userDetails && (
              <div className="mb-2 text-sm text-gray-600">
                <div><span className="font-semibold">Name:</span> {selectedOrder.userDetails.name}</div>
                <div><span className="font-semibold">Mobile:</span> {selectedOrder.userDetails.mobile}</div>
                <div><span className="font-semibold">Email:</span> {selectedOrder.userDetails.email}</div>
                <div><span className="font-semibold">Address:</span> {selectedOrder.userDetails.address}</div>
                <div><span className="font-semibold">Pincode:</span> {selectedOrder.userDetails.pincode}</div>
              </div>
            )}
            <div className="mb-2">
              <span className="font-semibold">Items:</span>
              <ul className="list-disc ml-6">
                {selectedOrder.items.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 my-2">
                    {item.image && <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded shadow" />}
                    <span className="font-semibold">{item.name}</span>
                    <span className="text-gray-500">x {item.quantity || 1}</span>
                    <span className="text-blue-700 font-bold ml-2">${item.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders; 