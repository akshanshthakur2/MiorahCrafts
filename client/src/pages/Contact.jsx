import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Clock, Instagram, ArrowUpRight } from 'lucide-react';

const Contact = () => {
  const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER;
  const INSTAGRAM_URL = import.meta.env.VITE_INSTAGRAM_URL;

  const contactInfo = [
    {
      icon: <Mail className="text-[#b91c1c]" size={20} />,
      label: "Email Us",
      value: "miorahcrafts0814@gmail.com",
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
    const message = encodeURIComponent("Hi Miorah! I'd like to talk about a handmade piece and check on shipping across India.");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };

  // Official WhatsApp SVG for brand consistency
  const WhatsAppIcon = ({ size = 22 }) => (
    <svg 
      viewBox="0 0 24 24" 
      width={size} 
      height={size} 
      fill="currentColor" 
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 0 5.414 0 12.05c0 2.123.55 4.197 1.592 6.015L0 24l6.149-1.613a11.773 11.773 0 005.912 1.594h.005c6.634 0 12.048-5.414 12.048-12.05a11.75 11.75 0 00-3.489-8.492z"/>
    </svg>
  );

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
          
          {/* Left Side: Details */}
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
                Every piece is made by hand in my home workshop in India. When you message me, you're talking directly to the person who crafted your item. We provide safe delivery to all major cities across India. Whether you want to customize a color or check on an order, I'm here to help.
              </p>

              <div className="space-y-8">
                <div className="p-8 bg-stone-50 rounded-[2rem] border border-stone-100">
                  <p className="text-[10px] font-black text-[#b91c1c] uppercase tracking-[0.3em] mb-4">Inquiry</p>
                  <p className="text-stone-900 font-serif text-xl mb-8">Ready to order a custom handmade piece?</p>
                  
                  <button 
                    onClick={handleWhatsApp}
                    className="flex items-center justify-center gap-4 w-full bg-[#25D366] hover:bg-[#1da851] text-white py-6 px-4 rounded-2xl font-bold text-sm uppercase tracking-[0.2em] shadow-xl shadow-green-100 transition-all hover:-translate-y-1 active:scale-[0.98]"
                  >
                    <WhatsAppIcon />
                    <span className="text-center font-black">Message Me on WhatsApp</span>
                  </button>
                </div>
                
                <div className="flex items-center justify-center gap-3 text-stone-400">
                  <div className="w-2 h-2 bg-[#25D366] rounded-full animate-pulse shrink-0" />
                  <span className="text-[10px] uppercase tracking-widest font-bold">Online from India • Quick Response</span>
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