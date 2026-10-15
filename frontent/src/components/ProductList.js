import React, { useState } from "react";

function AddProductForm({ onProductAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    imageUrl: "",
    description: "",
    category: "", // புதியது: Category சேர்க்க
    stock: ""     // புதியது: Stock சேர்க்க
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // API அழைப்பு மூலம் Backend-க்கு அனுப்புவது இங்கே வரும்
    // எ.கா: await addProduct(formData);
    if (onProductAdded) onProductAdded();
  };

  return (
    <form onSubmit={handleSubmit} className="add-product-form">
      <h2>Add New Product</h2>
      
      <div className="form-group">
        <label>PRODUCT NAME</label>
        <input 
          type="text" 
          placeholder="e.g. Fresh Milk" 
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label>PRICE (RS:)</label>
        <input 
          type="number" 
          placeholder="e.g. 60" 
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label>IMAGE URL</label>
        <input 
          type="text" 
          placeholder="https://..." 
          value={formData.imageUrl}
          onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
        />
      </div>

      {/* புதியது: Category உள்ளீட்டுப் புலம் */}
      <div className="form-group">
        <label>CATEGORY</label>
        <input 
          type="text" 
          placeholder="e.g. Groceries" 
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        />
      </div>

      {/* புதியது: Stock உள்ளீட்டுப் புலம் */}
      <div className="form-group">
        <label>STOCK</label>
        <input 
          type="number" 
          placeholder="e.g. 100" 
          value={formData.stock}
          onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label>DESCRIPTION</label>
        <textarea 
          placeholder="Product description..." 
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>

      <button type="submit" className="submit-btn">Add Product</button>
    </form>
  );
}

export default AddProductForm;