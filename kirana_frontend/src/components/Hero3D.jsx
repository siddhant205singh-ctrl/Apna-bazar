import React, { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Float, PresentationControls, ContactShadows } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- 3D Elements ---
const Mango = (props) => (
  <Float speed={2} rotationIntensity={1.5} floatIntensity={2} {...props}>
    <mesh castShadow receiveShadow>
      <sphereGeometry args={[0.8, 32, 32]} />
      <meshStandardMaterial color="#FFB800" roughness={0.3} metalness={0.1} />
    </mesh>
  </Float>
);

const MilkCarton = (props) => (
  <Float speed={1.5} rotationIntensity={1} floatIntensity={1.5} {...props}>
    <mesh castShadow receiveShadow>
      <boxGeometry args={[1, 1.8, 1]} />
      <meshStandardMaterial color="#FAFAEE" roughness={0.1} metalness={0.1} />
    </mesh>
  </Float>
);

const WheatSack = (props) => (
  <Float speed={2.5} rotationIntensity={0.5} floatIntensity={1} {...props}>
    <mesh castShadow receiveShadow>
      <cylinderGeometry args={[1, 1, 2.5, 16]} />
      <meshStandardMaterial color="#C19A6B" roughness={0.8} />
    </mesh>
  </Float>
);

const Basket = (props) => (
  <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5} {...props}>
    <mesh castShadow receiveShadow>
      <cylinderGeometry args={[1.5, 1, 1.5, 32]} />
      <meshStandardMaterial color="#8B4513" roughness={0.9} />
    </mesh>
  </Float>
);

const Scene = () => {
  const groupRef = useRef();
  
  useEffect(() => {
    if (!groupRef.current) return;
    const items = groupRef.current.children;
    
    gsap.to(items, {
      scrollTrigger: {
        trigger: "#hero-3d-section",
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
      x: (index) => (index % 2 === 0 ? 5 : -5) * Math.random(),
      y: (index) => Math.random() * 5,
      z: (index) => (Math.random() - 0.5) * 10,
      rotationX: Math.PI,
      rotationY: Math.PI,
      ease: "power1.inOut",
    });
  }, []);

  return (
    <group ref={groupRef}>
      <PresentationControls 
        global 
        config={{ mass: 2, tension: 500 }} 
        snap={{ mass: 4, tension: 1500 }} 
        rotation={[0, 0.3, 0]} 
        polar={[-Math.PI / 3, Math.PI / 3]} 
        azimuth={[-Math.PI / 1.4, Math.PI / 2]}
      >
        <Basket position={[0, -1, 0]} />
        <Mango position={[-2, 1, 1]} />
        <MilkCarton position={[2, 0.5, -1]} />
        <WheatSack position={[0, 1.5, -2]} />
      </PresentationControls>
      
      <ContactShadows position={[0, -2.5, 0]} opacity={0.5} scale={10} blur={2} far={4} />
      <Environment preset="city" />
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
    </group>
  );
};

const Hero3D = () => {
  return (
    <section id="hero-3d-section" className="relative flex items-center justify-center mb-10 overflow-hidden" style={{ height: '70vh', minHeight: '500px', borderRadius: '24px', background: 'radial-gradient(circle at center, var(--card-bg) 0%, var(--bg-color) 100%)', border: '1px solid var(--border-color)' }}>
      
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0">
        <Canvas shadows camera={{ position: [0, 2, 8], fov: 45 }}>
          <Scene />
        </Canvas>
      </div>

      {/* Foreground Overlay */}
      <div className="relative z-10 w-full h-full flex flex-col md:flex-row items-center justify-between p-8 md:p-16 pointer-events-none">
        
        {/* Left Text */}
        <div className="pointer-events-auto max-w-lg">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-700" style={{ textShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
            Fresh Groceries,<br/>Apni Dukan Se.
          </h1>
          <p className="text-lg mb-8 font-medium" style={{ color: 'var(--text-muted)' }}>
            Handpicked mangoes, premium dal, and pure milk delivered to your doorstep faster than a quick run to the market.
          </p>
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-8 rounded-full shadow-xl hover:shadow-emerald-500/30 transition-all transform hover:-translate-y-1" onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })}>
            Shop Daily Deals
          </button>
        </div>

        {/* Right Flash Deal Card */}
        <div className="pointer-events-auto hidden md:flex items-center justify-center">
          <div className="backdrop-blur-lg border p-6 rounded-3xl shadow-2xl w-full max-w-sm transform hover:scale-105 transition-transform" style={{ background: 'var(--glass-bg)', borderColor: 'var(--border-color)' }}>
            <div className="flex justify-between items-center mb-4">
              <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider animate-pulse">
                Flash Deal
              </span>
              <span className="text-sm font-bold" style={{ color: 'var(--text-main)' }}>Ends in 12:45:00</span>
            </div>
            <img src="https://images.unsplash.com/photo-1550828520-4cb496926fc9?w=400&q=80" alt="Mango" className="w-full h-48 object-cover rounded-2xl mb-4 shadow-sm" />
            <h3 className="text-xl font-bold" style={{ color: 'var(--text-main)' }}>Ratnagiri Alphonso Mango</h3>
            <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>1 Dozen • Farm Fresh</p>
            <div className="flex justify-between items-center">
              <div>
                <span className="text-2xl font-extrabold text-emerald-600">₹450</span>
                <span className="text-sm line-through ml-2" style={{ color: 'var(--text-muted)' }}>₹700</span>
              </div>
              <button className="text-emerald-600 border-2 border-emerald-600 hover:bg-emerald-600 hover:text-white font-bold py-2 px-6 rounded-xl transition-colors">
                + Add
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero3D;
