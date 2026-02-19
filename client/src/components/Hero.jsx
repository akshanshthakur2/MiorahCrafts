import React, { Suspense, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import {
  Float,
  MeshDistortMaterial,
  Sphere,
  Environment,
  ContactShadows,
} from "@react-three/drei";
import { motion } from "framer-motion";

const Hero = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
              <Sphere args={[1, 100, 200]} scale={isMobile ? 1.4 : 1.8}>
                <MeshDistortMaterial
                  color="#ddd12f"
                  speed={2}
                  distort={0.4}
                  radius={1}
                />
              </Sphere>
            </Float>
            <ContactShadows
              position={[0, isMobile ? -1.8 : -2.5, 0]}
              opacity={0.3}
              scale={10}
              blur={2.5}
              far={4}
            />
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

            <p className="max-w-[250px] md:max-w-none text-stone-500 mt-6 text-[11px] md:text-[9px] uppercase tracking-[0.2em] leading-relaxed font-medium">
              HAND CRAFTED • INDIA •<br className="md:hidden" /> 2026
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-14 pointer-events-auto"
          >
            <button
              onClick={() => navigate("/gallery")}
              className="group relative px-12 py-4 bg-stone-900 text-white rounded-full text-sm font-bold overflow-hidden transition-all shadow-2xl active:scale-95"
            >
              <span className="relative z-10 uppercase tracking-widest">
                Explore Collection
              </span>
              <div className="absolute inset-0 bg-[#b91c1c] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* ADJUSTED: Scroll Indicator positioned at bottom center */}
      <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="flex flex-col items-center gap-4"
        >
          {/* Vertical Scrolling Line */}
          <div className="w-[1px] h-16 bg-stone-200 relative overflow-hidden">
            <motion.div
              animate={{
                y: ["-100%", "100%"],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute top-0 left-0 w-full h-full bg-[#b91c1c]"
            />
          </div>

          {/* Minimalist Label */}
          <span className="text-[8px] text-stone-400 font-black uppercase tracking-[0.6em] ml-[0.6em]">
            Scroll
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
