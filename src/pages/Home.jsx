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

  useEffect(() => {
    setMounted(true);
  }, []);

  function handleGetStarted() {
    navigate('/page');
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden bg-white selection:bg-blue-100">
      
      {/* --- 1. SOPHISTICATED BACKGROUND --- */}
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      {/* Radial Gradient Fade (Vignette) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_200px,#C9EBFF,transparent)] opacity-40"></div>
      
      {/* --- 2. MAIN CONTENT --- */}
      <div className={`relative z-10 max-w-4xl w-full text-center transition-all duration-1000 ease-out transform ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        
        {/* Badge */}
       

        {/* Hero Typography */}
        <h1 className="text-6xl md:text-7xl font-bold text-slate-900 mb-6 tracking-tight leading-[1.1]">
          Welcome to <br className="hidden md:block" />
          <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
            React Tasks.
            {/* Underline Decoration */}
            <svg className="absolute w-full h-3 -bottom-1 left-0 text-blue-200 opacity-60" viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.00025 6.99997C25.0003 3.49997 76.0003 -1.50003 198.001 3.49997" stroke="currentColor" strokeWidth="3"/></svg>
          </span>
        </h1>
        
        <p className="text-xl text-slate-500 mb-10 max-w-xl mx-auto leading-relaxed">
          All the listed exercises should be completed in this application and are structured and arranged properly — by Anil.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <button
            onClick={handleGetStarted}
            className="group relative inline-flex items-center justify-center gap-2 bg-slate-900 text-white text-lg font-medium py-3.5 px-8 rounded-full shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.4)] transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative z-10 flex items-center gap-2">
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