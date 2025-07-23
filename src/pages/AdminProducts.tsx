import React, { useEffect, useState } from 'react';
import { authFetch } from '@/components/context/AuthContext';

const API_BASE = import.meta.env.VITE_API_URL || `http://${window.location.hostname}:4000`;

const AdminProducts = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [editForm, setEditForm] = useState({ name: '', price: '', image: '', description: '', category: '', stock: 0 });

  const fetchProducts = () => {
    authFetch(`${API_BASE}/api/products`)
      .then(res => res.json())
      .then(data => setProducts(data));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleStatusChange = (id: number, status: string) => {
    authFetch(`${API_BASE}/api/products/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    })
      .then(res => res.json())
      .then(updated => {
        setProducts(products.map(p => p.id === id ? updated : p));
      });
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);
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
    authFetch(`${API_BASE}/api/products/${editingProduct.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...editForm, price: parseFloat(editForm.price), stock: Number(editForm.stock) })
    })
      .then(res => res.json())
      .then(() => {
        setEditingProduct(null);
        fetchProducts();
      });
  };

  const handleRemove = (id: number) => {
    authFetch(`${API_BASE}/api/products/${id}`, { method: 'DELETE' })
      .then(res => res.json())
      .then(() => fetchProducts());
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-4 bg-background dark:bg-gray-900 transition-colors duration-300">
      <h1 className="text-4xl font-extrabold mb-10 text-blue-700 dark:text-blue-200 tracking-tight">Products Management</h1>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 w-full max-w-4xl border border-blue-100 dark:border-gray-700 transition-colors duration-300">
        <table className="w-full text-left rounded-lg overflow-hidden">
          <thead className="sticky top-0 bg-blue-50 dark:bg-gray-700 z-10">
            <tr>
              <th className="py-3 px-2 font-semibold text-blue-700 dark:text-blue-200">ID</th>
              <th className="py-3 px-2 font-semibold text-blue-700 dark:text-blue-200">Name</th>
              <th className="py-3 px-2 font-semibold text-blue-700 dark:text-blue-200">Category</th>
              <th className="py-3 px-2 font-semibold text-blue-700 dark:text-blue-200">Price</th>
              <th className="py-3 px-2 font-semibold text-blue-700 dark:text-blue-200">Stock</th>
              <th className="py-3 px-2 font-semibold text-blue-700 dark:text-blue-200">Status</th>
              <th className="py-3 px-2 font-semibold text-blue-700 dark:text-blue-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id} className="border-t border-blue-100 dark:border-gray-700 hover:bg-blue-100 dark:hover:bg-gray-700 transition-all duration-200 group">
                <td className="py-2 px-2">{product.id}</td>
                <td className="py-2 px-2 font-semibold group-hover:text-blue-700 dark:group-hover:text-blue-200 transition">{product.name}</td>
                <td className="py-2 px-2">{product.category}</td>
                <td className="py-2 px-2">${product.price}</td>
                <td className="py-2 px-2">{product.stock ?? 0}</td>
                <td className="py-2 px-2">
                  <span className={`px-2 py-1 rounded text-xs font-bold shadow-sm ${product.status === 'Approved' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200' : product.status === 'Rejected' ? 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-200' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200'}`}>{product.status}</span>
                </td>
                <td className="py-2 px-2 flex gap-2 flex-wrap">
                  <button className="px-3 py-1 bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200 rounded-lg hover:bg-yellow-200 dark:hover:bg-yellow-800 focus:ring-2 focus:ring-yellow-400 transition" onClick={() => handleEdit(product)}>Edit</button>
                  <button className="px-3 py-1 bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-200 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 focus:ring-2 focus:ring-red-400 transition" onClick={() => handleRemove(product.id)}>Remove</button>
                  <button className="px-3 py-1 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200 rounded-lg hover:bg-green-200 dark:hover:bg-green-800 focus:ring-2 focus:ring-green-400 transition" onClick={() => handleStatusChange(product.id, 'Approved')} disabled={product.status === 'Approved'}>Approve</button>
                  <button className="px-3 py-1 bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-200 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 focus:ring-2 focus:ring-red-400 transition" onClick={() => handleStatusChange(product.id, 'Rejected')} disabled={product.status === 'Rejected'}>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-40 dark:bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-md relative animate-fade-in border border-blue-100 dark:border-gray-700 transition-colors duration-300">
            <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white text-2xl" onClick={() => setEditingProduct(null)}>&times;</button>
            <h2 className="text-2xl font-bold mb-6 text-blue-700 dark:text-blue-200">Edit Product</h2>
            <form onSubmit={handleEditSave} className="space-y-5">
              <div>
                <label className="block font-semibold mb-1">Name</label>
                <input name="name" value={editForm.name} onChange={handleEditChange} required className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:text-white dark:border-gray-700" />
              </div>
              <div>
                <label className="block font-semibold mb-1">Price</label>
                <input name="price" value={editForm.price} onChange={handleEditChange} required type="number" min="0" step="0.01" className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:text-white dark:border-gray-700" />
              </div>
              <div>
                <label className="block font-semibold mb-1">Image URL</label>
                <input name="image" value={editForm.image} onChange={handleEditChange} required className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:text-white dark:border-gray-700" />
              </div>
              <div>
                <label className="block font-semibold mb-1">Category</label>
                <input name="category" value={editForm.category} onChange={handleEditChange} required className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:text-white dark:border-gray-700" />
              </div>
              <div>
                <label className="block font-semibold mb-1">Description</label>
                <textarea name="description" value={editForm.description} onChange={handleEditChange} required className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:text-white dark:border-gray-700" />
              </div>
              <div>
                <label className="block font-semibold mb-1">Stock</label>
                <input name="stock" value={editForm.stock} onChange={handleEditChange} required type="number" min="0" className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:text-white dark:border-gray-700" />
              </div>
              <div className="flex gap-2 justify-end">
                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-400 transition">Save</button>
                <button type="button" className="px-4 py-2 bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 focus:ring-2 focus:ring-gray-400 transition" onClick={() => setEditingProduct(null)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts; 