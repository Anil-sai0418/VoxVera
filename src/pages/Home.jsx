import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Icon Components
const ArrowRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
);

const CheckCircle = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="m9 11 3 3L22 4" /></svg>
);

function Home() {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  function handleGetStarted() {
    navigate('/Translator');
  }

  useEffect(() => {
    // defer setMounted to avoid synchronous state update inside effect
    const id = setTimeout(() => setMounted(true), 0);
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        navigate('/Translator');
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      clearTimeout(id);
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [navigate]);

  return (
  <div className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden text-theme selection:bg-blue-100">
      
      {/* --- 1. SOPHISTICATED BACKGROUND --- */}
      {/* Grid Pattern */}
  <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>
      {/* Radial Gradient Fade (Vignette) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_200px,#C9EBFF,transparent)] opacity-40"></div>
      
      {/* --- 2. MAIN CONTENT --- */}
  <div className={`relative z-10 max-w-6xl w-full text-center px-6 md:px-12 transition-all duration-1000 ease-out transform ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        
        {/* Badge */}
       

        {/* Hero Typography */}
          <h1 className="text-7xl md:text-8xl font-bold text-slate-900 mb-8 tracking-tight leading-[1.02]">
          Welcome to <br className="hidden md:block" />
          <span className="relative inline-block text-transparent bg-clip-text bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600">
           Voxvera
            {/* Underline Decoration */}
            <svg className="absolute w-full h-3 -bottom-1 left-0 text-blue-200 opacity-60" viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.00025 6.99997C25.0003 3.49997 76.0003 -1.50003 198.001 3.49997" stroke="currentColor" strokeWidth="3"/></svg>
          </span>
        </h1>
        
  <p className="text-xl text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed">
At VoxVera, I aim to make communication clearer, smarter, and more effortless.
Whether you’re sharing ideas, creating content, or managing tasks, VoxVera helps you express more with less effort. — by Anil.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <button
            onClick={handleGetStarted}
            className="btn btn-primary text-lg"
          >
            <span className="flex items-center gap-2">
              Get Started <ArrowRight />
            </span>
          </button>

        
        </div>
      </div>

      {/* --- 3. 3D VISUAL ELEMENT (Mock UI) --- */}
 

    </div>
  );
}

export default Home;