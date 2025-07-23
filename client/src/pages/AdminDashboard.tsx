import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'user' },
  { id: 2, name: 'Admin', email: 'admin@example.com', role: 'admin' }
];
const mockProducts = [
  { id: 1, name: 'Product 1' },
  { id: 2, name: 'Product 2' },
  { id: 3, name: 'Product 3' }
];
const mockOrders = [
  { id: 1, date: new Date().toISOString() },
  { id: 2, date: new Date(Date.now() - 86400000).toISOString() },
  { id: 3, date: new Date(Date.now() - 2 * 86400000).toISOString() }
];

const orderVolumeByDay = [
  { day: 'Today', count: 1 },
  { day: 'Yesterday', count: 1 },
  { day: '2 Days Ago', count: 1 }
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('isAdmin') !== 'true') {
      navigate('/admin/login');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-4 bg-background">
      <h1 className="text-3xl font-bold mb-8 text-blue-700">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mb-8">
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <span className="text-2xl font-bold text-blue-700 mb-2">{mockUsers.length}</span>
          <span className="text-gray-600">Users</span>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <span className="text-2xl font-bold text-blue-700 mb-2">{mockProducts.length}</span>
          <span className="text-gray-600">Products</span>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <span className="text-2xl font-bold text-blue-700 mb-2">{mockOrders.length}</span>
          <span className="text-gray-600">Orders</span>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-8 w-full max-w-2xl mb-8">
        <h2 className="text-xl font-semibold mb-4">Order Volume (Last 3 Days)</h2>
        <svg width="100%" height="140" viewBox="0 0 400 140">
          {orderVolumeByDay.map((d, i) => (
            <g key={i}>
              <rect
                x={40 + i * 100}
                y={140 - d.count * 40 - 20}
                width={60}
                height={d.count * 40}
                fill="#2563eb"
                rx={6}
              />
              <text
                x={40 + i * 100 + 30}
                y={130}
                textAnchor="middle"
                fontSize={14}
                fill="#222"
              >
                {d.day}
              </text>
              <text
                x={40 + i * 100 + 30}
                y={140 - d.count * 40 - 28}
                textAnchor="middle"
                fontSize={14}
                fill="#2563eb"
                fontWeight="bold"
              >
                {d.count}
              </text>
            </g>
          ))}
        </svg>
      </div>
      <div className="bg-white rounded-lg shadow p-8 w-full max-w-lg flex flex-col gap-6">
        <Link to="/admin/users" className="py-3 px-6 bg-blue-100 text-blue-700 rounded text-lg font-semibold hover:bg-blue-200 transition">Users List</Link>
        <Link to="/admin/products" className="py-3 px-6 bg-blue-100 text-blue-700 rounded text-lg font-semibold hover:bg-blue-200 transition">Products</Link>
        <Link to="/admin/orders" className="py-3 px-6 bg-blue-100 text-blue-700 rounded text-lg font-semibold hover:bg-blue-200 transition">Orders</Link>
      </div>
    </div>
  );
};

export default AdminDashboard; 