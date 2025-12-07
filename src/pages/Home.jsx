import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Icon Components
const ArrowRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
);

function Home() {
  const navigate = useNavigate();

  function handleGetStarted() {
    navigate('/Translator');
  }

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        navigate('/Translator');
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [navigate]);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden text-slate-800 bg-white selection:bg-blue-100">
      
      {/* --- INJECT CUSTOM STYLES FOR ANIMATION --- */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes subtleFloat {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-10px) scale(1.02); }
        }
        .animate-fade-up {
          opacity: 0; /* Start hidden */
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-float-slow {
          animation: subtleFloat 8s ease-in-out infinite;
        }
        /* Delays */
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
      `}</style>

      {/* --- 1. SOPHISTICATED BACKGROUND --- */}
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      {/* Radial Gradient Fade (Animated) */}
      <div className="absolute inset-0 pointer-events-none animate-float-slow">
        <div className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(201,235,255,0.4)_0%,transparent_70%)] blur-3xl"></div>
      </div>
      
      {/* --- 2. MAIN CONTENT --- */}
      <div className="relative z-10 max-w-6xl w-full text-center px-6 md:px-12">
        
        {/* Hero Typography */}
        <h1 className="text-7xl md:text-8xl font-bold text-slate-900 mb-8 tracking-tight leading-[1.05] animate-fade-up">
          Welcome to <br className="hidden md:block" />
          <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
           Voxvera
            {/* Underline Decoration */}
            <svg className="absolute w-full h-3 -bottom-1 left-0 text-blue-200 opacity-60" viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.00025 6.99997C25.0003 3.49997 76.0003 -1.50003 198.001 3.49997" stroke="currentColor" strokeWidth="3"/></svg>
          </span>
        </h1>
        
        <p className="text-xl text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-up delay-200">
          At VoxVera, I aim to make communication clearer, smarter, and more effortless.
          Whether you’re sharing ideas, creating content, or managing tasks, VoxVera helps you express more with less effort. — by Anil.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-up delay-300">
          <button
            onClick={handleGetStarted}
            className="group relative px-8 py-4 bg-slate-900 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative flex items-center gap-2">
              Get Started 
              <span className="group-hover:translate-x-1 transition-transform duration-300">
                <ArrowRight />
              </span>
            </span>
          </button>
        </div>

      </div>
    </div>
  );
}

export default Home;