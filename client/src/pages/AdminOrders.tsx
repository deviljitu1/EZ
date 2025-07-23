import React, { useEffect, useState } from 'react';

const AdminOrders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const API_BASE = import.meta.env.VITE_API_URL || `http://${window.location.hostname}:4000`;
  useEffect(() => {
    fetch(`${API_BASE}/api/orders`)
      .then(res => res.json())
      .then(data => setOrders(data));
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-4 bg-background">
      <h1 className="text-3xl font-bold mb-8 text-blue-700">Orders</h1>
      <div className="bg-white rounded-lg shadow p-8 w-full max-w-4xl">
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="py-2">Order ID</th>
              <th className="py-2">User ID</th>
              <th className="py-2">Date</th>
              <th className="py-2">Status</th>
              <th className="py-2">Items</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id} className="border-t">
                <td className="py-2">{order.id}</td>
                <td className="py-2">{order.userId}</td>
                <td className="py-2">{new Date(order.date).toLocaleString()}</td>
                <td className="py-2">{order.status}</td>
                <td className="py-2">
                  <ul className="list-disc ml-4">
                    {order.items.map((item: any, idx: number) => (
                      <li key={idx}>{item.name} (${item.price})</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders; 