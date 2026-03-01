import React, { useState, useEffect } from "react";
import {
  Trash2,
  Plus,
  Package,
  Lock,
  Loader2,
  Image as ImageIcon,
  Edit3,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    size: "",
    price: "",
    category: "Wall Art",
    description: "",
  });

  const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) fetchProducts();
  }, [isAuthenticated]);

const handleLogin = (e) => {
    e.preventDefault();
    
    if (ADMIN_PASSWORD && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      
      // CENTERED SUCCESS ALERT
      Swal.fire({
        icon: 'success',
        title: 'Access Granted',
        text: 'Welcome to the Miorah Admin Panel',
        showConfirmButton: false,
        timer: 2000,
        iconColor: '#21b91c', // Miorah Red
        didOpen: () => {
          const container = document.querySelector('.swal2-container');
          if (container) container.style.zIndex = "10001";
        }
      });
    } else {
      // CENTERED ERROR ALERT
      Swal.fire({
        icon: 'error',
        title: 'Wrong Password',
        text: 'The access key you entered is incorrect.',
        confirmButtonColor: '#b91c1c',
        background: '#fff',
        didOpen: () => {
          const container = document.querySelector('.swal2-container');
          if (container) container.style.zIndex = "10001";
        }
      });
      setPassword(''); 
    }
  };
  const startEdit = (product) => {
    setIsEditing(product._id);
    setFormData({
      name: product.name,
      size: product.size,
      price: product.price,
      category: product.category,
      description: product.description,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setIsEditing(null);
    setFormData({
      name: "",
      size: "",
      price: "",
      category: "Wall Art",
      description: "",
    });
    setImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    // 1. Ensure the URL includes the ID when editing
    const url = isEditing
      ? `http://localhost:5000/api/products/${isEditing}`
      : "http://localhost:5000/api/products";

    const method = isEditing ? "PUT" : "POST";

    let body;
    let headers = {};

    // 2. If an image is selected, we MUST use FormData
    if (image) {
      body = new FormData();
      Object.keys(formData).forEach((key) => body.append(key, formData[key]));
      body.append("image", image);
      // Note: Do NOT set Content-Type header when using FormData; the browser does it automatically.
    } else {
      // 3. If NO new image, we send JSON
      headers = { "Content-Type": "application/json" };
      body = JSON.stringify(formData);
    }

    try {
      const res = await fetch(url, { method, headers, body });
      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Archive Updated",
          timer: 1500,
          showConfirmButton: false,
        });
        fetchProducts(); // Refresh the list
        cancelEdit(); // Reset form and state
        e.target.reset();
      } else {
        const errorData = await res.json();
        console.error("Server Error:", errorData);
      }
    } catch (err) {
      console.error("Network Error:", err);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Remove from Archive?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#b91c1c",
      cancelButtonColor: "#000",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await fetch(`http://localhost:5000/api/products/${id}`, {
            method: "DELETE",
          });
          fetchProducts();
          Swal.fire("Deleted!", "The piece has been removed.", "success");
        } catch (err) {
          console.error(err);
        }
      }
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 min-h-screen bg-stone-950 flex items-center justify-center px-6 z-[10000]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white/5 backdrop-blur-2xl p-12 rounded-[3rem] border border-white/10 text-center shadow-2xl"
        >
          <Lock className="text-[#b91c1c] mx-auto mb-8" size={32} />
          <h1 className="text-white font-serif text-3xl mb-8 tracking-tight">
            Access Key Required
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/10 border border-white/10 rounded-2xl py-5 px-6 text-white text-center tracking-[0.5em] focus:outline-none focus:border-[#b91c1c] transition-all"
              placeholder="••••••"
            />
            <button
              type="submit"
              className="w-full bg-white text-stone-900 py-5 rounded-2xl font-black uppercase text-[11px] tracking-[0.4em] hover:bg-[#b91c1c] hover:text-white transition-all"
            >
              Unlock Archive
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    // Changed pt-32 to ensure it sits below the Navbar on all screens
    <div className="min-h-screen bg-[#f8f7f5] flex flex-col lg:flex-row pt-32 lg:pt-0">
      {/* LEFT: FORM - Added lg:pt-32 to push content down on desktop */}
      <aside className="lg:w-[450px] bg-white border-r border-stone-200 p-10 lg:pt-32 lg:sticky lg:top-0 lg:h-screen overflow-y-auto z-40">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-2xl font-serif text-stone-900 italic">
            {isEditing ? "Edit Craft." : "Add Craft."}
          </h2>
          {isEditing && (
            <button
              onClick={cancelEdit}
              className="p-2 bg-stone-100 rounded-full hover:bg-stone-200 transition-colors"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-stone-400 tracking-widest ml-2">
              Name
            </label>
            <input
              value={formData.name}
              type="text"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full p-5 bg-stone-50 rounded-2xl border-none text-sm focus:ring-1 focus:ring-stone-200 transition-all"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-stone-400 tracking-widest ml-2">
                Size
              </label>
              <input
                value={formData.size}
                type="text"
                onChange={(e) =>
                  setFormData({ ...formData, size: e.target.value })
                }
                className="w-full p-5 bg-stone-50 rounded-2xl border-none text-sm"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-stone-400 tracking-widest ml-2">
                Price (₹)
              </label>
              <input
                value={formData.price}
                type="number"
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                className="w-full p-5 bg-stone-50 rounded-2xl border-none text-sm font-bold"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-stone-400 tracking-widest ml-2">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full p-5 bg-stone-50 rounded-2xl border-none text-sm appearance-none"
            >
              <option value="Wall Art">Wall Art</option>
              <option value="Home Decor">Home Decor</option>
              <option value="Sculpture">Sculpture</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-stone-400 tracking-widest ml-2">
              Narrative
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full p-5 bg-stone-50 rounded-2xl border-none h-32 text-sm resize-none"
              required
            />
          </div>

          <div className="relative p-6 border-2 border-dashed border-stone-100 rounded-[2rem] text-center bg-stone-50/50 hover:bg-stone-100 transition-colors group">
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <ImageIcon
              className="mx-auto mb-2 text-stone-300 group-hover:text-stone-400"
              size={24}
            />
            <p className="text-[9px] font-black text-stone-400 uppercase tracking-widest">
              {image ? (
                <span className="text-[#b91c1c]">{image.name}</span>
              ) : isEditing ? (
                "Keep Current or Change Image"
              ) : (
                "Upload Visual"
              )}
            </p>
          </div>

          <button
            type="submit"
            disabled={uploading}
            className="w-full py-6 bg-stone-900 text-white rounded-full font-black uppercase text-[11px] tracking-[0.5em] hover:bg-[#b91c1c] transition-all shadow-xl disabled:bg-stone-300"
          >
            {uploading ? (
              <Loader2 className="animate-spin mx-auto" size={18} />
            ) : isEditing ? (
              "Save Changes"
            ) : (
              "Record in Archive"
            )}
          </button>
        </form>
      </aside>

      {/* RIGHT: LIVE ARCHIVE - Added lg:pt-32 to match sidebar */}
      <main className="flex-1 p-8 lg:p-20 lg:pt-32 overflow-y-auto">
        <header className="flex justify-between items-end mb-16">
          <div>
            <p className="text-[#b91c1c] text-[10px] font-black uppercase tracking-[0.4em] mb-2">
              Live Status
            </p>
            <h2 className="text-5xl font-serif text-stone-900 tracking-tighter">
              Live <span className="italic text-stone-300">Archive.</span>
            </h2>
          </div>
          <div className="text-right">
            <span className="text-5xl font-serif text-stone-900">
              {products.length}
            </span>
            <p className="text-[9px] font-bold text-stone-400 uppercase tracking-widest">
              Pieces
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
          <AnimatePresence mode="popLayout">
            {products.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={item._id}
                className="bg-white rounded-[3rem] p-5 border border-stone-100 shadow-sm group hover:shadow-2xl transition-all"
              >
                <div className="aspect-[4/5] rounded-[2.2rem] overflow-hidden mb-6 relative">
                  <img
                    src={
                      item.image.startsWith("/uploads")
                        ? `http://localhost:5000${item.image}`
                        : item.image
                    }
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    alt={item.name}
                  />
                  <div className="absolute inset-0 bg-stone-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <button
                      onClick={() => startEdit(item)}
                      className="p-4 bg-white text-stone-900 rounded-full hover:bg-stone-900 hover:text-white transition-all"
                    >
                      <Edit3 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="p-4 bg-white text-red-600 rounded-full hover:bg-red-600 hover:text-white transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                <div className="px-3">
                  <h4 className="text-xl font-serif text-stone-900 mb-1">
                    {item.name}
                  </h4>
                  <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">
                    ₹{item.price.toLocaleString("en-IN")}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default Admin;
