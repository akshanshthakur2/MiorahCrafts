import React, { useState, useEffect } from "react"; // Added useEffect
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Truck, ShieldCheck, MapPin, Maximize2, Loader2 } from "lucide-react"; // Added Loader2
// Removed: import { products } from "../data/products";

// Lightbox Imports
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  
  // 1. Added state for database data
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER;

  // 2. Helper for images (Handles local vs server uploads)
  const getImageUrl = (path) => {
    if (!path) return '';
    return path.startsWith('/uploads') ? `http://localhost:5000${path}` : path;
  };

  // 3. Fetch specific product from MongoDB
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        if (!response.ok) throw new Error("Product not found");
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error("Fetch Error:", error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleWhatsApp = (e) => {
    e.preventDefault();
    if (!WHATSAPP_NUMBER) {
      alert("WhatsApp number is missing in .env configuration.");
      return;
    }

    const message = `Hi Miorah! I'm interested in ordering the "${product.name}" (${product.size}) for ₹${product.price.toLocaleString("en-IN")}. Please share shipping details for my location in India.`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  // 4. Loading State UI
  if (loading) {
    return (
      <div className="pt-60 text-center flex flex-col items-center gap-4">
        <Loader2 className="animate-spin text-stone-300" size={40} />
        <p className="text-stone-400 uppercase tracking-widest text-[10px] font-bold">Verifying Archive...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-40 text-center font-serif text-stone-500">
        Piece not found in the archive.
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative z-10 pt-32 pb-20 px-6 max-w-6xl mx-auto"
    >
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={[{ src: getImageUrl(product.image) }]} // Updated to use helper
        plugins={[Zoom]}
        animation={{ zoom: 500 }}
        zoom={{
          maxZoomPixelRatio: 3,
          zoomInLabel: "Zoom In",
          zoomOutLabel: "Zoom Out",
        }}
      />

      {/* Navigation */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-stone-400 hover:text-[#b91c1c] mb-12 group transition-colors"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-[10px] font-black uppercase tracking-[0.3em]">
          Back to Archive
        </span>
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start">
        {/* Product Visual - Clickable Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={() => setOpen(true)}
          className="rounded-[3rem] overflow-hidden bg-white shadow-2xl shadow-stone-200/50 border border-stone-100 p-4 cursor-zoom-in relative group"
        >
          {/* Maximize Icon Overlay */}
          <div className="absolute top-8 right-8 z-10 bg-white/80 backdrop-blur-md p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-stone-800">
            <Maximize2 size={20} />
          </div>

          <img
            src={getImageUrl(product.image)} // Updated to use helper
            alt={product.name}
            className="w-full aspect-[4/5] object-cover rounded-[2.5rem] transition-transform duration-700 group-hover:scale-[1.02]"
          />
        </motion.div>

        {/* Product Details */}
        <div className="flex flex-col pt-4">
          <div className="border-b border-stone-100 pb-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[#b91c1c] text-[10px] font-black uppercase tracking-[0.4em]">
                {product.category}
              </span>
              <div className="h-[1px] w-8 bg-stone-200" />
              <div className="flex items-center gap-1 text-stone-400">
                <MapPin size={10} />
                <span className="text-[9px] uppercase font-bold tracking-widest">
                  Handcrafted in India
                </span>
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl font-serif text-stone-900 leading-[1.1] mb-4 tracking-tighter">
              {product.name}
            </h1>

            <p className="text-stone-400 font-serif italic text-xl mb-6">
              Dimensions: {product.size}
            </p>

            <p className="text-4xl text-stone-900 font-black tracking-tighter">
              ₹{product.price.toLocaleString("en-IN")}
            </p>
          </div>

          <p className="text-stone-500 leading-relaxed mb-12 text-lg font-light">
            {product.description}
          </p>

          {/* Action Area */}
          <div className="space-y-6">
            <button
              onClick={handleWhatsApp}
              className="w-full bg-[#25D366] text-white py-6 rounded-2xl font-black flex items-center justify-center gap-4 hover:bg-[#1da851] transition-all shadow-xl shadow-green-100 active:scale-[0.98] uppercase tracking-[0.2em] text-xs"
            >
              <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" className="shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 0 5.414 0 12.05c0 2.123.55 4.197 1.592 6.015L0 24l6.149-1.613a11.773 11.773 0 005.912 1.594h.005c6.634 0 12.048-5.414 12.048-12.05a11.75 11.75 0 00-3.489-8.492z" />
              </svg>
              <span>Place Your Order</span>
            </button>

            <div className="flex items-center gap-3 text-stone-400 justify-center">
              <div className="w-2 h-2 bg-[#25D366] rounded-full animate-pulse" />
              <span className="text-[10px] uppercase tracking-widest font-black">
                Available Online • Quick Response
              </span>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-4 p-5 rounded-3xl bg-white border border-stone-100 shadow-sm">
              <Truck size={20} className="text-[#b91c1c]" />
              <p className="text-[10px] font-black text-stone-600 uppercase tracking-widest">
                Safe All-India <br /> Shipping
              </p>
            </div>
            <div className="flex items-center gap-4 p-5 rounded-3xl bg-white border border-stone-100 shadow-sm">
              <ShieldCheck size={20} className="text-[#b91c1c]" />
              <p className="text-[10px] font-black text-stone-600 uppercase tracking-widest">
                100% Genuine <br /> Handcrafted
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetails;