import React, { Suspense, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Canvas } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Environment, ContactShadows } from '@react-three/drei';
import { motion } from 'framer-motion';

const Hero = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="relative w-full h-screen bg-[#f5f5f4] overflow-hidden flex flex-col justify-center">
      
      {/* Three.js Canvas Layer */}
      <div className="absolute inset-0 z-0 h-full w-full">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          
          <Suspense fallback={null}>
            <Float speed={3} rotationIntensity={1} floatIntensity={2}>
              {/* On mobile, we make the sphere slightly larger than before (1.4) 
                  to fill the empty space, but keep it subtle */}
              <Sphere args={[1, 100, 200]} scale={isMobile ? 1.4 : 1.8}>
                <MeshDistortMaterial
                  color="#1a1a1a" 
                  speed={2} 
                  distort={0.4} 
                  radius={1}
                />
              </Sphere>
            </Float>
            <ContactShadows position={[0, isMobile ? -1.8 : -2.5, 0]} opacity={0.3} scale={10} blur={2.5} far={4} />
            <Environment preset="studio" />
          </Suspense>
        </Canvas>
      </div>

      {/* UI Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col items-center w-full"
        >
          {/* Main Title - Increased mobile size to 7xl to fill width */}
          <h1 className="text-7xl md:text-[13rem] font-serif text-[#b91c1c] leading-[0.8] select-none tracking-tighter drop-shadow-md">
            Miorah
          </h1>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-6 flex flex-col items-center"
          >
             <p className="text-stone-900 text-2xl md:text-3xl font-light tracking-[0.3em] uppercase font-serif">
                Crafts
             </p>
             <div className="h-[1px] w-16 bg-[#b91c1c] mt-3 opacity-60" />
             
             {/* Descriptive text to fill the "empty" vertical space on mobile */}
             <p className="max-w-[250px] md:max-w-none text-stone-500 mt-6 text-[11px] md:text-[9px] uppercase tracking-[0.2em] leading-relaxed font-medium">
                Artisanal Studio • LALITPUR <br className="md:hidden" /> Established 2026
             </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-14 pointer-events-auto"
          >
             <button 
                onClick={() => navigate('/gallery')}
                className="group relative px-12 py-4 bg-stone-900 text-white rounded-full text-sm font-bold overflow-hidden transition-all shadow-2xl active:scale-95"
             >
                <span className="relative z-10 uppercase tracking-widest">Explore Collection</span>
                <div className="absolute inset-0 bg-[#b91c1c] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
             </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom decorative info for mobile (fills bottom space) */}
      <div className="absolute bottom-10 w-full text-center md:hidden">
        <p className="text-[9px] text-stone-400 uppercase tracking-[0.4em]">
          Scroll to Discover
        </p>
      </div>
    </section>
  );
};

export default Hero;