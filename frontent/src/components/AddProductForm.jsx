import React, { useState } from 'react';
import { API_BASE_URL } from '../api/config';

function AddProductForm({ onProductAdded }) {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    imageUrl: '',
    category: '',
    stock: '',
    description: ''
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock, 10) || 0
      })
    })
      .then((res) => res.json())
      .then(() => {
        alert('🎉 பொருள் வெற்றிகரமாகச் சேர்க்கப்பட்டது!');
        setFormData({ name: '', price: '', imageUrl: '', category: '', stock: '', description: '' });
        setLoading(false);
        if (onProductAdded) onProductAdded(); // Store பக்கத்தை உடனுக்குடன் புதுப்பிக்க
      })
      .catch((err) => {
        console.error('Error adding product:', err);
        setLoading(false);
        alert('❌ பிழை ஏற்பட்டது. மீண்டும் முயற்சிக்கவும்.');
      });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Product Name */}
      <div>
        <label className="text-xs font-bold text-slate-700 block mb-1.5 uppercase tracking-wider">
          Product Name
        </label>
        <input 
          type="text" 
          placeholder="e.g. Fresh Milk" 
          required 
          value={formData.name} 
          onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all" 
        />
      </div>

      {/* Price & Stock (Grid Layout) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1.5 uppercase tracking-wider">
            Price (Rs:)
          </label>
          <input 
            type="number" 
            placeholder="e.g. 60" 
            required 
            value={formData.price} 
            onChange={(e) => setFormData({ ...formData, price: e.target.value })} 
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all" 
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1.5 uppercase tracking-wider">
            Stock
          </label>
          <input 
            type="number" 
            placeholder="e.g. 100" 
            required 
            value={formData.stock} 
            onChange={(e) => setFormData({ ...formData, stock: e.target.value })} 
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all" 
          />
        </div>
      </div>

      {/* Category */}
      <div>
        <label className="text-xs font-bold text-slate-700 block mb-1.5 uppercase tracking-wider">
          Category
        </label>
        <input 
          type="text" 
          placeholder="e.g. Groceries" 
          required 
          value={formData.category} 
          onChange={(e) => setFormData({ ...formData, category: e.target.value })} 
          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all" 
        />
      </div>

      {/* Image URL */}
      <div>
        <label className="text-xs font-bold text-slate-700 block mb-1.5 uppercase tracking-wider">
          Image URL
        </label>
        <input 
          type="text" 
          placeholder="https://..." 
          value={formData.imageUrl} 
          onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })} 
          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all" 
        />
      </div>

      {/* Description */}
      <div>
        <label className="text-xs font-bold text-slate-700 block mb-1.5 uppercase tracking-wider">
          Description
        </label>
        <textarea 
          rows="3"
          placeholder="Product description..." 
          value={formData.description} 
          onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all" 
        ></textarea>
      </div>

      {/* Submit Button */}
      <button 
        type="submit" 
        disabled={loading}
        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-black py-4 rounded-2xl transition-all shadow-lg shadow-indigo-200 text-sm mt-2 disabled:opacity-50 active:scale-98"
      >
        {loading ? 'Adding Product...' : 'Add Product'}
      </button>
    </form>
  );
}

export default AddProductForm;