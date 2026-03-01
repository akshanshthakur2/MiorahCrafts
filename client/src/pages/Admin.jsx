import React, { useState, useEffect } from 'react';

const Admin = () => {
  const [formData, setFormData] = useState({ name: '', size: '', price: '', category: 'Wall Art', description: '' });
  const [imageFile, setImageFile] = useState(null);
  const [products, setProducts] = useState([]);

  // Fetching products so you can see the "Live Archive"
  const fetchProducts = async () => {
    const res = await fetch('http://localhost:5000/api/products');
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 1. Prepare FormData
    const data = new FormData();
    data.append('name', formData.name);
    data.append('size', formData.size);
    data.append('price', formData.price);
    data.append('category', formData.category);
    data.append('description', formData.description);
    data.append('image', imageFile); // The physical file

    // 2. Send to Server
    try {
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        body: data, // No headers needed, browser handles 'multipart/form-data'
      });

      if (response.ok) {
        alert("Craft Added Successfully!");
        fetchProducts(); // Refresh the list
      }
    } catch (err) {
      console.error("Upload failed", err);
    }
  };

  return (
    <div className="pt-32 max-w-4xl mx-auto px-6">
      <h1 className="text-4xl font-serif mb-10">Miorah Admin Console</h1>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
        <div className="space-y-4">
          <input type="text" placeholder="Product Name" onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full p-4 border rounded-xl" />
          <input type="text" placeholder="Size" onChange={(e) => setFormData({...formData, size: e.target.value})} className="w-full p-4 border rounded-xl" />
          <input type="number" placeholder="Price" onChange={(e) => setFormData({...formData, price: e.target.value})} className="w-full p-4 border rounded-xl" />
          <select onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full p-4 border rounded-xl">
            <option value="Wall Art">Wall Art</option>
            <option value="Home Decor">Home Decor</option>
          </select>
        </div>
        <div className="space-y-4">
          <textarea placeholder="Description" onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full p-4 border rounded-xl h-32" />
          <input type="file" onChange={(e) => setImageFile(e.target.files[0])} className="block w-full text-sm text-stone-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-stone-900 file:text-white" />
          <button type="submit" className="w-full bg-stone-900 text-white py-4 rounded-full font-bold uppercase tracking-widest">Add Piece</button>
        </div>
      </form>

      {/* Product List below for management */}
      <h2 className="text-2xl font-serif mb-6">Current Archive</h2>
      <div className="space-y-4">
        {products.map(p => (
          <div key={p._id} className="flex items-center justify-between p-4 bg-white border rounded-2xl shadow-sm">
            <div className="flex items-center gap-4">
              {/* Note: Check if image is local or uploaded */}
              <img 
                src={p.image.startsWith('/uploads') ? `http://localhost:5000${p.image}` : p.image} 
                className="w-16 h-16 object-cover rounded-lg" 
              />
              <span className="font-bold">{p.name}</span>
            </div>
            <button onClick={async () => {
              await fetch(`http://localhost:5000/api/products/${p._id}`, { method: 'DELETE' });
              fetchProducts();
            }} className="text-red-500 font-bold">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;