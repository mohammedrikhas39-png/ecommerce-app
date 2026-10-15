import React, { useState, useEffect } from 'react';
import AddProductForm from './components/AddProductForm';
import Chatbot from './components/Chatbot';
import { API_BASE_URL } from './api/config';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [reviews, setReviews] = useState({});
  const [activeTab, setActiveTab] = useState('store');
  const [loading, setLoading] = useState(true);

  const [reviewForm, setReviewForm] = useState({ customerName: '', rating: 5, comment: '' });
  const [activeReviewProductId, setActiveReviewProductId] = useState(null);

  const [checkoutData, setCheckoutData] = useState({
    customerName: '',
    customerEmail: '',
    shippingAddress: ''
  });

  const fetchProducts = () => {
    fetch(`${API_BASE_URL}/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        data.forEach((p) => {
          const pId = p.id || p._id;
          fetchReviews(pId);
        });
      })
      .catch((err) => console.error('Error fetching products:', err));
  };

  const fetchOrders = () => {
    fetch(`${API_BASE_URL}/orders`)
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error('Error fetching orders:', err));
  };

  const fetchReviews = (productId) => {
    fetch(`${API_BASE_URL}/reviews/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        setReviews((prev) => ({ ...prev, [productId]: data }));
      })
      .catch((err) => console.error('Error fetching reviews:', err));
  };

  useEffect(() => {
    fetchProducts();
    fetchOrders();
    setLoading(false);
  }, []);

  const handleAddReview = (e, productId) => {
    e.preventDefault();
    const newReview = {
      productId: productId.toString(),
      customerName: reviewForm.customerName,
      rating: parseInt(reviewForm.rating),
      comment: reviewForm.comment
    };

    fetch(`${API_BASE_URL}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newReview)
    })
      .then((res) => res.json())
      .then(() => {
        alert('⭐ விமர்சனம் வெற்றிகரமாகப் பதிவு செய்யப்பட்டது!');
        setReviewForm({ customerName: '', rating: 5, comment: '' });
        setActiveReviewProductId(null);
        fetchReviews(productId);
      })
      .catch((err) => console.error('Error submitting review:', err));
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const pId = product.id || product._id;
      const existing = prevCart.find((item) => (item.id || item._id) === pId);
      if (existing) {
        return prevCart.map((item) =>
          (item.id || item._id) === pId
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const handleIncreaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        (item.id || item._id) === productId
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      )
    );
  };

  const handleDecreaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          (item.id || item._id) === productId
            ? { ...item, quantity: (item.quantity || 1) - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const getTotalPrice = () => {
    return cart
      .reduce((sum, item) => sum + item.price * (item.quantity || 1), 0)
      .toFixed(2);
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert('உங்கள் Cart காலியாக உள்ளது!');
      return;
    }

    const newOrder = {
      customerName: checkoutData.customerName,
      customerEmail: checkoutData.customerEmail,
      shippingAddress: checkoutData.shippingAddress,
      items: cart,
      totalPrice: parseFloat(getTotalPrice())
    };

    fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newOrder)
    })
      .then((res) => res.json())
      .then(() => {
        alert('🎉 Order வெற்றிகரமாகச் செய்யப்பட்டது!');
        setCart([]);
        setCheckoutData({ customerName: '', customerEmail: '', shippingAddress: '' });
        fetchOrders();
        setActiveTab('history');
      })
      .catch((err) => console.error('Error placing order:', err));
  };

  const totalCartCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-indigo-600 font-bold">
        Loading Atheefa Wholesale...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* RESPONSIVE NAVBAR */}
      <header className="bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-200/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:h-20 flex flex-col sm:flex-row justify-between items-center gap-3">
          
          <div className="flex items-center gap-3 cursor-pointer w-full sm:w-auto justify-between sm:justify-start" onClick={() => setActiveTab('store')}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-tr from-indigo-600 to-violet-500 rounded-xl flex items-center justify-center text-white text-lg sm:text-xl shadow-md shadow-indigo-200">
                🛒
              </div>
              <h1 className="text-xl sm:text-2xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent tracking-tight">
                Atheefa Wholesale
              </h1>
            </div>
          </div>

          {/* Navigation Buttons (Mobile Scrollable) */}
          <nav className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto justify-start sm:justify-end pb-1 sm:pb-0 scrollbar-none">
            {[
              { id: 'store', label: '🏪 Store' },
              { id: 'cart', label: '🛒 Cart', badge: totalCartCount },
              { id: 'history', label: '📦 Orders' },
              { id: 'admin', label: '⚙️ Admin' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 scale-105'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {tab.label}
                {tab.badge > 0 && (
                  <span className="bg-rose-500 text-white text-[10px] font-black px-1.5 py-0.2 rounded-full animate-pulse">
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        
        {/* STORE VIEW */}
        {activeTab === 'store' && (
          <div>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-800 text-white p-6 sm:p-12 mb-8 sm:mb-10 shadow-xl shadow-indigo-100">
              <div className="relative z-10 max-w-2xl">
                <span className="bg-white/25 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3 sm:mb-4 inline-block">
                  Fresh & Organic
                </span>
                <h2 className="text-2xl sm:text-5xl font-black leading-tight mb-3 sm:mb-4">
                  Premium Groceries Delivered to Your Doorstep
                </h2>
                <p className="text-indigo-100 text-xs sm:text-base font-medium leading-relaxed">
                Enjoy buying all the groceries you need at the best quality and lowest prices.
                உங்களுக்குத் தேவையான அனைத்து மளிகைப் பொருட்களையும் சிறந்த தரத்திலும், குறைந்த விலையிலும் வாங்கி மகிழுங்கள்.
                </p>  
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6 sm:mb-8">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Featured Products & Reviews</h3>
              <span className="bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1.5 rounded-full">
                {products.length} Products Available
              </span>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
              {products.map((p) => {
                const pId = p.id || p._id;
                const productReviews = reviews[pId] || [];

                return (
                  <div key={pId} className="bg-white rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden">
                    <div>
                      <div className="h-48 w-full bg-slate-100 relative overflow-hidden">
                        <img src={p.imageUrl || 'https://via.placeholder.com/300?text=Product'} alt={p.name} className="h-full w-full object-cover" />
                      </div>
                      <div className="p-4 sm:p-5">
                        <h4 className="font-bold text-slate-900 text-base sm:text-lg mb-1">{p.name}</h4>
                        <p className="text-slate-500 text-xs line-clamp-2 mb-3">{p.description || 'No description.'}</p>
                        <span className="font-black text-lg sm:text-xl text-slate-900">Rs:{p.price}</span>

                        {/* Reviews Section */}
                        <div className="mt-4 pt-3 border-t border-slate-100">
                          <div className="flex justify-between items-center text-xs text-slate-500 mb-2">
                            <span>⭐ Reviews ({productReviews.length})</span>
                            <button 
                              onClick={() => setActiveReviewProductId(activeReviewProductId === pId ? null : pId)} 
                              className="text-indigo-600 font-bold hover:underline"
                            >
                              {activeReviewProductId === pId ? 'Close' : 'Add Review'}
                            </button>
                          </div>

                          <div className="space-y-1 max-h-24 overflow-y-auto text-[11px]">
                            {productReviews.length === 0 ? (
                              <p className="text-slate-400 italic">No reviews yet.</p>
                            ) : (
                              productReviews.map((rev, idx) => (
                                <div key={idx} className="bg-slate-50 p-1.5 rounded-lg border border-slate-100">
                                  <div className="flex justify-between font-bold text-slate-700">
                                    <span>{rev.customerName}</span>
                                    <span>{'⭐'.repeat(rev.rating)}</span>
                                  </div>
                                  <p className="text-slate-500 truncate">{rev.comment}</p>
                                </div>
                              ))
                            )}
                          </div>

                          {activeReviewProductId === pId && (
                            <form onSubmit={(e) => handleAddReview(e, pId)} className="mt-3 p-3 bg-indigo-50/50 rounded-xl border border-indigo-100 space-y-2">
                              <input
                                type="text"
                                placeholder="Your Name"
                                required
                                value={reviewForm.customerName}
                                onChange={(e) => setReviewForm({ ...reviewForm, customerName: e.target.value })}
                                className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-xs"
                              />
                              <select
                                value={reviewForm.rating}
                                onChange={(e) => setReviewForm({ ...reviewForm, rating: e.target.value })}
                                className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-xs"
                              >
                                <option value="5">⭐⭐⭐⭐⭐ (5/5)</option>
                                <option value="4">⭐⭐⭐⭐ (4/5)</option>
                                <option value="3">⭐⭐⭐ (3/5)</option>
                                <option value="2">⭐⭐ (2/5)</option>
                                <option value="1">⭐ (1/5)</option>
                              </select>
                              <textarea
                                placeholder="Write comment..."
                                required
                                rows="2"
                                value={reviewForm.comment}
                                onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                                className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-xs"
                              />
                              <button type="submit" className="w-full bg-indigo-600 text-white text-xs font-bold py-1.5 rounded shadow">
                                Submit Review
                              </button>
                            </form>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="p-4 sm:p-5 pt-0">
                      <button 
                        onClick={() => addToCart(p)} 
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-2xl text-xs font-bold shadow-md transition-all active:scale-95"
                      >
                        + Add to Cart
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* CART & CHECKOUT VIEW */}
        {activeTab === 'cart' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200/80">
              <h2 className="text-xl font-black text-slate-900 mb-6">Shopping Cart</h2>
              {cart.length === 0 ? (
                <p className="text-slate-400 text-sm text-center py-12">Your cart is empty.</p>
              ) : (
                <div className="space-y-4">
                  {cart.map((item, index) => (
                    <div key={index} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-slate-50 rounded-2xl gap-3">
                      <div>
                        <h5 className="font-bold text-sm">{item.name}</h5>
                        <span className="text-xs text-slate-500">Rs:{item.price} each</span>
                      </div>
                      <div className="flex items-center justify-between w-full sm:w-auto gap-3">
                        <div className="flex items-center border rounded bg-white">
                          <button onClick={() => handleDecreaseQuantity(item.id || item._id)} className="px-2.5 py-1 text-sm font-bold">-</button>
                          <span className="px-3 text-xs font-bold">{item.quantity || 1}</span>
                          <button onClick={() => handleIncreaseQuantity(item.id || item._id)} className="px-2.5 py-1 text-sm font-bold">+</button>
                        </div>
                        <span className="font-black text-indigo-600">Rs:{(item.price * (item.quantity || 1)).toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                  <div className="pt-4 border-t flex justify-between font-black text-lg">
                    <span>Grand Total:</span>
                    <span className="text-indigo-600">Rs:{getTotalPrice()}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200/80">
              <h2 className="text-xl font-black text-slate-900 mb-6">Checkout Details</h2>
              <form onSubmit={handlePlaceOrder} className="space-y-4">
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  value={checkoutData.customerName}
                  onChange={(e) => setCheckoutData({ ...checkoutData, customerName: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border rounded-2xl text-sm"
                />
                <input
                  type="email"
                  required
                  placeholder="Email Address"
                  value={checkoutData.customerEmail}
                  onChange={(e) => setCheckoutData({ ...checkoutData, customerEmail: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border rounded-2xl text-sm"
                />
                <textarea
                  required
                  rows="3"
                  placeholder="Shipping Address"
                  value={checkoutData.shippingAddress}
                  onChange={(e) => setCheckoutData({ ...checkoutData, shippingAddress: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border rounded-2xl text-sm"
                />
                <button type="submit" disabled={cart.length === 0} className="w-full bg-indigo-600 text-white font-black py-4 rounded-2xl text-sm shadow-lg">
                  Confirm & Place Order
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ORDER HISTORY VIEW */}
        {activeTab === 'history' && (
          <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-3xl shadow-sm border">
            <h2 className="text-2xl font-black mb-6">Order History</h2>
            {orders.length === 0 ? <p className="text-slate-400 text-center">No orders found.</p> : (
              orders.map((o) => (
                <div key={o.id} className="p-4 sm:p-6 mb-4 border rounded-2xl bg-slate-50">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center font-bold text-sm mb-2 gap-1">
                    <span>Order #{o.id} - {o.customerName}</span>
                    <span className="text-indigo-600">Rs:{o.totalPrice}</span>
                  </div>
                  <p className="text-xs text-slate-500 mb-2">Address: {o.shippingAddress}</p>
                </div>
              ))
            )}
          </div>
        )}

        {/* ADMIN PANEL VIEW */}
        {activeTab === 'admin' && (
          <div className="max-w-xl mx-auto bg-white p-6 sm:p-8 rounded-3xl shadow-sm border">
            <h2 className="text-2xl font-black mb-6">Add New Product</h2>
            <AddProductForm onProductAdded={fetchProducts} />
          </div>
        )}
      </main>

      <Chatbot />
    </div>
  );
}

export default App;