import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Trash2,
  Edit3,
  X,
  Database,
  Tag,
  Star,
  Search,
  ImageIcon,
  CheckCircle2,
  AlertCircle,
  Lock,
} from "lucide-react";
import { products as initialProducts } from "../data/products";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [products, setProducts] = useState(initialProducts);
  const [isAdding, setIsAdding] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState('All');

  // 1. Logic for Login Persistence
  useEffect(() => {
    const sessionAuth = sessionStorage.getItem("miorah_admin_auth");
    if (sessionAuth === "true") setIsAuthenticated(true);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === import.meta.env.VITE_ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem("miorah_admin_auth", "true");
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  // 2. Stats and Filtering Logic
  const stats = useMemo(() => ({
    total: products.length,
    value: products.reduce((sum, item) => sum + Number(item.price), 0),
    featured: products.filter(p => p.isFeatured).length
  }), [products]);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'All' || product.category === activeTab;
    return matchesSearch && matchesTab;
  });

  const handleDelete = (id) => {
    if (window.confirm("Remove this piece from the archive?")) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  // 3. LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#fbfbfb] flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white p-10 rounded-[3rem] border border-stone-100 shadow-2xl text-center"
        >
          <div className="w-16 h-16 bg-stone-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-stone-900">
            <Lock size={24} />
          </div>
          <h1 className="text-3xl font-serif text-stone-900 mb-2">Access Portal</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Enter Private Key"
              className={`w-full p-5 bg-stone-50 border rounded-2xl focus:outline-none text-center tracking-widest ${loginError ? "border-red-200" : "border-stone-100"}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {loginError && <p className="text-[#b91c1c] text-[10px] uppercase font-bold tracking-widest">Invalid Credentials</p>}
            <button className="w-full py-5 bg-stone-900 text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.4em] hover:bg-[#b91c1c] transition-all">
              Verify Identity
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // 4. FULL DASHBOARD (Renders after login)
  return (
    <div className="pt-24 md:pt-32 pb-32 md:pb-20 bg-[#fbfbfb] min-h-screen px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* TOP NAVIGATION BAR */}
        <div className="flex justify-between items-center mb-12 pb-6 border-b border-stone-200/60">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#b91c1c] rounded-full animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-900">Live Session</span>
          </div>

          <button
            onClick={() => {
              sessionStorage.removeItem("miorah_admin_auth");
              setIsAuthenticated(false);
            }}
            className="flex items-center gap-2 px-6 py-2.5 bg-[royalblue] border border-stone-200 text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-red-50 hover:border-red-100 hover:text-[#b91c1c] transition-all shadow-sm active:scale-95"
          >
            <X size={14} />
            <span>Log out</span>
          </button>
        </div>

        {/* Console Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-serif text-stone-900 tracking-tight leading-none">Console.</h1>
            <p className="text-stone-400 text-[10px] uppercase tracking-[0.4em] font-black">Archive Management</p>
          </div>
          
          <button 
            onClick={() => setIsAdding(true)} 
            className="hidden md:flex items-center gap-3 px-10 py-5 bg-stone-900 text-white rounded-full text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl hover:bg-[#b91c1c] transition-all"
          >
            <Plus size={16} /> New Entry
          </button>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-10">
          <StatCard label="Total Items" val={stats.total} icon={Database} color="stone" />
          <StatCard label="Valuation" val={`₹${stats.value.toLocaleString('en-IN')}`} icon={Tag} color="red" />
          <StatCard label="Featured" val={stats.featured} icon={Star} color="amber" />
        </div>

        {/* Search & Tabs */}
        <div className="space-y-4 mb-8">
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300" size={18} />
            <input 
              type="text" 
              placeholder="Search archive..." 
              className="w-full pl-12 pr-6 py-4 bg-white border border-stone-100 rounded-2xl text-sm focus:outline-none"
              onChange={(e) => setSearchQuery(e.target.value)} 
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {['All', 'Wall Art', 'Home Decor', 'Sculpture'].map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest whitespace-nowrap transition-all ${activeTab === tab ? 'bg-stone-900 text-white' : 'bg-white text-stone-400 border border-stone-100'}`}>
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* List View */}
        <div className="grid grid-cols-1 gap-4 md:hidden">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded-[2rem] border border-stone-100 shadow-sm flex items-center gap-5">
              <img src={product.image} className="h-20 w-20 flex-shrink-0 rounded-2xl object-cover" alt="" />
              <div className="flex-grow min-w-0">
                <h3 className="font-serif text-lg text-stone-900 truncate">{product.name}</h3>
                <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">₹{product.price.toLocaleString('en-IN')}</p>
                <div className="flex gap-4 mt-3">
                  <button className="text-stone-400 text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5"><Edit3 size={14} /> Edit</button>
                  <button onClick={() => handleDelete(product.id)} className="text-stone-300 text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5"><Trash2 size={14} /> Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="hidden md:block bg-white rounded-[3rem] border border-stone-100 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-stone-50/50 border-b border-stone-100">
              <tr>
                <th className="p-8 text-[9px] font-black uppercase tracking-[0.3em] text-stone-400">Piece</th>
                <th className="p-8 text-[9px] font-black uppercase tracking-[0.3em] text-stone-400">Category</th>
                <th className="p-8 text-[9px] font-black uppercase tracking-[0.3em] text-stone-400">Price</th>
                <th className="p-8 text-[9px] font-black uppercase tracking-[0.3em] text-stone-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="group hover:bg-stone-50/30">
                  <td className="p-8">
                    <div className="flex items-center gap-6">
                      <img src={product.image} className="h-16 w-16 rounded-2xl object-cover" alt="" />
                      <p className="text-xl font-serif text-stone-900">{product.name}</p>
                    </div>
                  </td>
                  <td className="p-8 text-stone-500 uppercase text-[10px] tracking-widest font-bold">{product.category}</td>
                  <td className="p-8 text-xl font-serif">₹{product.price.toLocaleString('en-IN')}</td>
                  <td className="p-8 text-right">
                    <button onClick={() => handleDelete(product.id)} className="p-3 text-stone-300 hover:text-red-600 transition-colors"><Trash2 size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <button onClick={() => setIsAdding(true)} className="md:hidden fixed bottom-8 right-6 w-16 h-16 bg-stone-900 text-white rounded-full shadow-2xl flex items-center justify-center z-[140] border-4 border-white">
        <Plus size={28} />
      </button>

      {/* Side-Drawer Form */}
      <AnimatePresence>
        {isAdding && (
          <div className="fixed inset-0 z-[200] flex justify-end">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsAdding(false)} className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm" />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="relative w-full max-w-xl bg-white h-full shadow-2xl p-8 md:p-12 flex flex-col overflow-y-auto">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-3xl font-serif text-stone-900">New Entry</h2>
                <button onClick={() => setIsAdding(false)} className="p-2 bg-stone-50 rounded-full"><X size={20} /></button>
              </div>
              
              <form className="space-y-6 pb-10">
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 block">Product Name</label>
                  <input type="text" className="w-full p-4 bg-stone-50 rounded-2xl border border-stone-100 focus:outline-none focus:border-[#b91c1c]" placeholder="Piece Name" />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 block">Price (INR)</label>
                  <input type="number" className="w-full p-4 bg-stone-50 rounded-2xl border border-stone-100 focus:outline-none focus:border-[#b91c1c]" placeholder="2999" />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 block">Category</label>
                  <select className="w-full p-4 bg-stone-50 rounded-2xl border border-stone-100 focus:outline-none">
                    <option>Wall Art</option>
                    <option>Home Decor</option>
                    <option>Sculpture</option>
                  </select>
                </div>
                <button type="button" className="w-full py-5 bg-stone-900 text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.3em] shadow-xl">Add to Archive</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const StatCard = ({ label, val, icon: Icon, color }) => (
  <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-stone-100 shadow-sm flex items-center gap-5">
    <div className={`p-3 rounded-2xl ${color === 'red' ? 'bg-red-50 text-[#b91c1c]' : color === 'amber' ? 'bg-amber-50 text-amber-600' : 'bg-stone-50 text-stone-900'}`}>
      <Icon size={20} />
    </div>
    <div>
      <p className="text-2xl md:text-3xl font-serif text-stone-900 tracking-tighter">{val}</p>
      <p className="text-stone-400 text-[9px] uppercase tracking-widest font-bold">{label}</p>
    </div>
  </div>
);

export default Admin;