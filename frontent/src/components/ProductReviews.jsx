import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../api/config';

function ProductReviews({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ customerName: '', rating: 5, comment: '' });
  const [loading, setLoading] = useState(false);

  // குறித்த பொருளின் விமர்சனங்களை Fetch செய்தல்
  const fetchReviews = () => {
    fetch(`${API_BASE_URL}/reviews/${productId}`)
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => console.error('Error fetching reviews:', err));
  };

  useEffect(() => {
    if (productId) fetchReviews();
  }, [productId]);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    setLoading(true);

    fetch(`${API_BASE_URL}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newReview, productId })
    })
      .then((res) => res.json())
      .then(() => {
        alert('⭐ உங்கள் மதிப்பீடு வெற்றிகரமாகப் பதிவு செய்யப்பட்டது!');
        setNewReview({ customerName: '', rating: 5, comment: '' });
        setLoading(false);
        fetchReviews();
      })
      .catch((err) => {
        console.error('Error posting review:', err);
        setLoading(false);
      });
  };

  return (
    <div className="mt-8 border-t border-slate-200 pt-6">
      <h3 className="text-lg font-black text-slate-900 mb-4">Customer Reviews & Ratings</h3>

      {/* Reviews List */}
      <div className="space-y-4 mb-6">
        {reviews.length === 0 ? (
          p => (
            <p className="text-xs text-slate-400">இந்தப் பொருளுக்கு இதுவரை விமர்சனங்கள் இல்லை. முதல் விமர்சகராக மாறுங்கள்!</p>
          )
        )() : (
          reviews.map((rev, index) => (
            <div key={index} className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-xs text-slate-800">{rev.customerName}</span>
                <span className="text-amber-500 text-xs font-bold">{'⭐'.repeat(rev.rating)}</span>
              </div>
              <p className="text-xs text-slate-600">{rev.comment}</p>
            </div>
          ))
        )}
      </div>

      {/* Add Review Form */}
      <form onSubmit={handleSubmitReview} className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
        <h4 className="font-bold text-xs text-slate-700 uppercase tracking-wider">Leave a Review</h4>
        <div>
          <input
            type="text"
            required
            placeholder="உங்கள் பெயர் (Your Name)"
            value={newReview.customerName}
            onChange={(e) => setNewReview({ ...newReview, customerName: e.target.value })}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none"
          />
        </div>
        <div>
          <select
            value={newReview.rating}
            onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none"
          >
            <option value="5">⭐⭐⭐⭐⭐ (5 - மிகச் சிறப்பு)</option>
            <option value="4">⭐⭐⭐⭐ (4 - நன்று)</option>
            <option value="3">⭐⭐⭐ (3 - பரவாயில்லை)</option>
            <option value="2">⭐⭐ (2 - மோசம்)</option>
            <option value="1">⭐ (1 - மிகவும் மோசம்)</option>
          </select>
        </div>
        <div>
          <textarea
            required
            rows="2"
            placeholder="பொருள் பற்றி உங்கள் கருத்து..."
            value={newReview.comment}
            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none"
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-sm"
        >
          {loading ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
}

export default ProductReviews;