import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Mail, MapPin, Clock, Instagram } from 'lucide-react';

const Contact = () => {
  const WHATSAPP_NUMBER = process.env.VITE_WHATSAPP_NUMBER; // Replace with your client's number

  const contactInfo = [
    {
      icon: <Mail className="text-emerald-600" size={20} />,
      label: "Email Us",
      value: "hello@miorahcrafts.com",
    },
    {
      icon: <MapPin className="text-emerald-600" size={20} />,
      label: "Studio Location",
      value: "Artisans Alley, Suite 402, Craft City",
    },
    {
      icon: <Clock className="text-emerald-600" size={20} />,
      label: "Response Time",
      value: "Mon-Fri, 9am - 6pm (GMT)",
    }
  ];

  return (
    <div className="pt-32 pb-20 bg-[#fafaf9] min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-emerald-700 font-bold tracking-[0.2em] uppercase text-xs mb-4 block"
          >
            Connect With Us
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-serif text-stone-900 mb-6"
          >
            Let’s start a <br /><span className="italic text-stone-500">conversation.</span>
          </motion.h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Side: Contact Details */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-8">
              {contactInfo.map((info, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-6 items-start"
                >
                  <div className="p-3 bg-white rounded-2xl shadow-sm border border-stone-100">
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-stone-400 font-bold mb-1">{info.label}</p>
                    <p className="text-stone-800 font-medium">{info.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <hr className="border-stone-200" />

            <div className="space-y-4">
              <p className="text-stone-800 font-serif text-xl italic">Follow our journey</p>
              <div className="flex gap-4">
                <a href="#" className="p-4 bg-stone-900 text-white rounded-2xl hover:bg-emerald-700 transition-colors">
                  <Instagram size={24} />
                </a>
              </div>
            </div>
          </div>

          {/* Right Side: The "WhatsApp First" Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-7 bg-white rounded-[40px] p-8 md:p-12 shadow-xl shadow-stone-200/50 border border-stone-100 relative overflow-hidden"
          >
            {/* Design Element */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-[100px] -z-0" />
            
            <div className="relative z-10">
              <h3 className="text-3xl font-serif text-stone-900 mb-6">Direct Artisanal Support</h3>
              <p className="text-stone-500 mb-10 leading-relaxed">
                Skip the automated emails. When you message us, you're talking directly to the creators. Whether it's a custom color request or a shipping update, we're here to help in real-time.
              </p>

              <div className="space-y-6">
                <div className="p-6 bg-stone-50 rounded-3xl border border-stone-100">
                  <p className="text-xs font-bold text-emerald-700 uppercase mb-2">Quick Action</p>
                  <p className="text-stone-800 font-medium mb-6">Ready to discuss a custom commission?</p>
                  <a 
                    href={`https://wa.me/${WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-3 w-full bg-emerald-600 hover:bg-emerald-700 text-white py-5 rounded-2xl font-bold text-lg shadow-lg shadow-emerald-200 transition-all hover:-translate-y-1"
                  >
                    <MessageCircle size={24} />
                    Message on WhatsApp
                  </a>
                </div>
                
                <p className="text-center text-stone-400 text-xs italic">
                  Average response time: &lt; 2 hours
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Contact;