import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Mail, MapPin, Clock, Instagram, ArrowUpRight } from 'lucide-react';

const Contact = () => {
  const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER;
  const INSTAGRAM_URL = import.meta.env.VITE_INSTAGRAM_URL;

  const contactInfo = [
    {
      icon: <Mail className="text-[#b91c1c]" size={20} />,
      label: "Email Us",
      value: "hello@miorahcrafts.com",
    },
    {
      icon: <MapPin className="text-[#b91c1c]" size={20} />,
      label: "Location",
      value: "Lalitpur, India",
    },
    {
      icon: <Clock className="text-[#b91c1c]" size={20} />,
      label: "Availability",
      value: "Mon-Sat, 10am - 7pm",
    }
  ];

  const handleWhatsApp = () => {
    const message = encodeURIComponent("Hi Miorah! I'd like to talk about a handmade piece.");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };

  return (
    <div className="pt-32 pb-20 bg-[#fbfbfb] min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="max-w-3xl mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="h-[1px] w-8 bg-[#b91c1c]" />
            <span className="text-[#b91c1c] font-black tracking-[0.3em] uppercase text-[10px]">
              Direct Connection
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-serif text-stone-900 mb-8 tracking-tighter leading-[0.9]"
          >
            Let’s start a <br />
            <span className="italic text-stone-400 font-light">conversation.</span>
          </motion.h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Side: Personal Details */}
          <div className="lg:col-span-5 space-y-16">
            <div className="space-y-10">
              {contactInfo.map((info, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-6 items-start group"
                >
                  <div className="p-4 bg-white rounded-2xl shadow-sm border border-stone-100 group-hover:border-[#b91c1c] transition-colors duration-500">
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold mb-1">{info.label}</p>
                    <p className="text-stone-800 font-serif text-lg">{info.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="pt-8 border-t border-stone-200">
              <p className="text-stone-900 font-serif text-2xl italic mb-6">Handmade Journey</p>
              <div className="flex gap-4">
                <a 
                  href={INSTAGRAM_URL || "#"} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-3 px-6 py-3 bg-stone-900 text-white rounded-full hover:bg-[#b91c1c] transition-all text-[10px] font-bold uppercase tracking-widest"
                >
                  <Instagram size={16} />
                  <span>Instagram</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </div>

          {/* Right Side: The Homemade WhatsApp Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-7 bg-white rounded-[3rem] p-10 md:p-16 shadow-2xl shadow-stone-200/40 border border-stone-100 relative overflow-hidden"
          >
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-stone-50 rounded-full blur-3xl -z-0" />
            
            <div className="relative z-10">
              <h3 className="text-4xl font-serif text-stone-900 mb-6 leading-tight">
                Direct <br/> Personal Support
              </h3>
              <p className="text-stone-500 mb-12 leading-relaxed text-lg">
                Every piece is made by hand in my home workshop in Lalitpur. When you message me, you're talking directly to the person who crafted your item. Whether you want to customize a color or check on an order, I'm here to help.
              </p>

              {/* THE FIXED WHATSAPP BUTTON AREA */}
<div className="space-y-8">
  <div className="p-8 bg-stone-50 rounded-[2rem] border border-stone-100">
    <p className="text-[10px] font-black text-[#b91c1c] uppercase tracking-[0.3em] mb-4">Inquiry</p>
    <p className="text-stone-900 font-serif text-xl mb-8">Ready to order a custom handmade piece?</p>
    
    <button 
      onClick={handleWhatsApp}
      className="flex items-center justify-center gap-4 w-full bg-[#25D366] hover:bg-[#1da851] text-white py-6 px-4 rounded-2xl font-bold text-sm uppercase tracking-[0.2em] shadow-xl shadow-green-100 transition-all hover:-translate-y-1 active:scale-[0.98]"
    >
      {/* Icon with fixed size to prevent squishing */}
      <MessageCircle size={22} fill="currentColor" className="shrink-0" />
      <span className="text-center">Message Me on WhatsApp</span>
    </button>
  </div>
  
  {/* Corrected Pulse Indicator */}
  <div className="flex items-center justify-center gap-3 text-stone-400">
    <div className="w-2 h-2 bg-[#25D366] rounded-full animate-pulse shrink-0" />
    <span className="text-[10px] uppercase tracking-widest font-bold">Online from Lalitpur • Quick Response</span>
  </div>
</div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Contact;