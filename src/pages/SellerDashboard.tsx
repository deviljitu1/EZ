import React, { useState, useEffect } from 'react';
import axios from '@/api/axios';

const mockOrders = [
  { id: 1, userId: 1, items: [{ name: 'Sample Product', price: 99.99 }], date: new Date().toISOString(), status: 'Pending' }
];

const SellerDashboard = () => {
  const [myProducts, setMyProducts] = useState([]);
  const [orders, setOrders] = useState(mockOrders);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: '',
    price: '',
    image: '',
    description: '',
    category: '',
    stock: 10
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState(form);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const categories = Array.from(new Set(myProducts.map(p => p.category)));
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

  useEffect(() => {
    axios.get('/products')
      .then(res => {
        setMyProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  const filteredProducts = myProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) || (product.description && product.description.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = !categoryFilter || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Mock sales data for analytics
  const salesData = myProducts.map((product, idx) => ({
    name: product.name,
    sales: Math.floor(Math.random() * 100) + 1 // random sales for demo
  }));

  const maxSales = Math.max(...salesData.map(d => d.sales), 1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setForm({ ...form, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct = {
      id: myProducts.length + 1,
      name: form.name,
      price: parseFloat(form.price),
      image: form.image,
      description: form.description,
      category: form.category,
      rating: 5,
      reviews: 0,
      isOnSale: false,
      stock: 10
    };
    setMyProducts([newProduct, ...myProducts]);
    setForm({ name: '', price: '', image: '', description: '', category: '', stock: 10 });
    setImagePreview(null);
  };

  const handleEditProduct = (product: typeof myProducts[0]) => {
    setEditingId(product.id);
    setEditForm({
      name: product.name,
      price: product.price.toString(),
      image: product.image,
      description: product.description,
      category: product.category,
      stock: product.stock ?? 0
    });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSave = (e: React.FormEvent) => {
    e.preventDefault();
    setMyProducts(myProducts.map(product =>
      product.id === editingId
        ? { ...product, ...editForm, price: parseFloat(editForm.price), stock: Number(editForm.stock) }
        : product
    ));
    setEditingId(null);
  };

  const handleEditCancel = () => {
    setEditingId(null);
  };

  const handleRemoveProduct = (id: number) => {
    setMyProducts(myProducts.filter(product => product.id !== id));
  };

  const handleStatusChange = (orderId: number, status: string) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status } : order
    ));
  };

  const handleStockChange = (id: number, stock: number) => {
    setMyProducts(myProducts.map(product =>
      product.id === id ? { ...product, stock } : product
    ));
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-blue-700">Seller Dashboard</h1>
      <div className="w-full max-w-5xl mb-12">
        <h2 className="text-xl font-semibold mb-4">Sales Analytics</h2>
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <svg width="100%" height="180" viewBox={`0 0 500 180`}>
            {salesData.map((d, i) => (
              <g key={i}>
                <rect
                  x={30 + i * 60}
                  y={180 - (d.sales / maxSales) * 140 - 20}
                  width={40}
                  height={(d.sales / maxSales) * 140}
                  fill="#2563eb"
                  rx={6}
                />
                <text
                  x={30 + i * 60 + 20}
                  y={170}
                  textAnchor="middle"
                  fontSize={12}
                  fill="#222"
                >
                  {d.name.length > 8 ? d.name.slice(0, 8) + '…' : d.name}
                </text>
                <text
                  x={30 + i * 60 + 20}
                  y={180 - (d.sales / maxSales) * 140 - 28}
                  textAnchor="middle"
                  fontSize={12}
                  fill="#2563eb"
                  fontWeight="bold"
                >
                  {d.sales}
                </text>
              </g>
            ))}
          </svg>
        </div>
        <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
        <form onSubmit={handleAddProduct} className="bg-white rounded-lg shadow p-6 mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Product Name</label>
            <input name="name" value={form.name} onChange={handleChange} required className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block font-semibold mb-1">Price</label>
            <input name="price" value={form.price} onChange={handleChange} required type="number" min="0" step="0.01" className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block font-semibold mb-1">Image</label>
            <input type="file" accept="image/*" onChange={handleImageChange} className="w-full border rounded p-2" />
            {imagePreview && <img src={imagePreview} alt="Preview" className="w-24 h-24 object-cover mt-2 rounded" />}
          </div>
          <div>
            <label className="block font-semibold mb-1">Category</label>
            <input name="category" value={form.category} onChange={handleChange} required className="w-full border rounded p-2" />
          </div>
          <div className="md:col-span-2">
            <label className="block font-semibold mb-1">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} required className="w-full border rounded p-2" />
          </div>
          <div className="md:col-span-2 flex justify-end">
            <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Add Product</button>
          </div>
        </form>
        <h2 className="text-xl font-semibold mb-4">My Products</h2>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border rounded p-2 w-full md:w-1/2"
          />
          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="border rounded p-2 w-full md:w-1/4"
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <img src={product.image} alt={product.name} className="w-24 h-24 object-cover mb-4 rounded" />
              {editingId === product.id ? (
                <form onSubmit={handleEditSave} className="w-full flex flex-col items-center gap-2 mb-2">
                  <input name="name" value={editForm.name} onChange={handleEditChange} required className="w-full border rounded p-2" />
                  <input name="price" value={editForm.price} onChange={handleEditChange} required type="number" min="0" step="0.01" className="w-full border rounded p-2" />
                  <input name="image" value={editForm.image} onChange={handleEditChange} required className="w-full border rounded p-2" />
                  <input name="category" value={editForm.category} onChange={handleEditChange} required className="w-full border rounded p-2" />
                  <textarea name="description" value={editForm.description || ''} onChange={handleEditChange} required className="w-full border rounded p-2" />
                  <input name="stock" value={editForm.stock ?? 0} onChange={e => setEditForm({ ...editForm, stock: Number(e.target.value) })} required type="number" min="0" className="w-full border rounded p-2" placeholder="Stock" />
                  <div className="flex gap-2 mt-2">
                    <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">Save</button>
                    <button type="button" className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition" onClick={handleEditCancel}>Cancel</button>
                  </div>
                </form>
              ) : (
                <>
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                  <span className="text-blue-600 font-bold text-lg mb-2">${product.price}</span>
                  <span className="text-gray-500 text-sm mb-2">{product.category}</span>
                  {'description' in product && (
                    <span className="text-gray-400 text-xs mb-2">{(product as any).description}</span>
                  )}
                  <div className="flex items-center gap-2 mb-2">
                    <label className="text-xs font-semibold">Stock:</label>
                    <input
                      type="number"
                      min="0"
                      value={product.stock ?? 0}
                      onChange={e => handleStockChange(product.id, Number(e.target.value))}
                      className="w-16 border rounded p-1 text-xs"
                    />
                    {(product.stock ?? 0) === 0 && <span className="text-red-500 text-xs font-bold ml-2">Out of Stock</span>}
                  </div>
                  <div className="flex gap-2 mt-2">
                    <button className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 transition" onClick={() => handleEditProduct(product)}>Edit</button>
                    <button className="px-4 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200 transition" onClick={() => handleRemoveProduct(product.id)}>Remove</button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="w-full max-w-5xl">
        <h2 className="text-xl font-semibold mb-4">All Orders</h2>
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order.id} className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition" onClick={() => setSelectedOrder(order)}>
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-blue-700">Order #{order.id}</span>
                <span className="text-gray-500 text-sm">{new Date(order.date).toLocaleString()}</span>
              </div>
              <div className="mb-2 text-sm text-gray-600">User ID: {order.userId}</div>
              <div className="mb-2">
                <span className="font-semibold">Items:</span>
                <ul className="list-disc ml-6">
                  {order.items.map((item, idx) => (
                    <li key={idx}>{item.name} (${item.price})</li>
                  ))}
                </ul>
              </div>
              <div className="mt-2">
                <label className="font-semibold mr-2">Status:</label>
                <select
                  value={order.status}
                  onChange={e => handleStatusChange(order.id, e.target.value)}
                  className="border rounded p-1"
                >
                  <option value="Pending">Pending</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg relative animate-fade-in">
            <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl" onClick={() => setSelectedOrder(null)}>&times;</button>
            <h2 className="text-2xl font-bold mb-4 text-blue-700">Order #{selectedOrder.id} Details</h2>
            <div className="mb-2 text-sm text-gray-600">User ID: {selectedOrder.userId}</div>
            <div className="mb-2 text-sm text-gray-600">Date: {new Date(selectedOrder.date).toLocaleString()}</div>
            <div className="mb-2 text-sm text-gray-600">Status: {selectedOrder.status}</div>
            <div className="mb-2">
              <span className="font-semibold">Items:</span>
              <ul className="list-disc ml-6">
                {selectedOrder.items.map((item: any, idx: number) => (
                  <li key={idx}>{item.name} (${item.price})</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerDashboard;
