import React from 'react'

function Null() {
  const goHome = () => (window.location.href = '/')
  const goBack = () => window.history.back()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-purple-50 text-gray-900 px-6">
      <div className="text-center max-w-md">

        {/* Voxvera Logo */}
        <img
          src="./src/assets/VoxVera.png"
          alt="Voxvera Logo"
          className="mx-auto mb-6 w-24 h-24 object-contain drop-shadow-lg"
        />

        {/* Illustration */}
        {/* <div className="mx-auto mb-6">
          <svg
            width="140"
            height="140"
            viewBox="0 0 24 24"
            fill="none"
            className="mx-auto text-purple-500"
            stroke="currentColor"
            strokeWidth="1.3"
          >
            <path d="M12 3C7 3 3 7 3 12s4 9 9 9 9-4 9-9" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M15 10c0-1.7-.8-3-3-3s-3 1.3-3 3c0 3 3 4 3 4" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="12" cy="17" r="1" fill="currentColor"/>
          </svg>
        </div> */}

        <h1 className="text-5xl font-extrabold tracking-tight mb-3">404</h1>
        <p className="text-gray-600 text-lg mb-6">Oops! This Voxvera page isn’t available.</p>

        <p className="text-sm text-gray-500 mb-8">
          Looks like the audio trail broke. Let’s get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={goHome}
            className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition font-medium shadow"
          >
            Go Home
          </button>

          <button
            onClick={goBack}
            className="px-6 py-2.5 bg-white border border-gray-300 hover:bg-gray-100 text-gray-900 rounded-lg transition font-medium"
          >
            Go Back
          </button>
        </div>

        <p className="mt-8 text-xs text-gray-400">
          Voxvera • where ideas turn into voice
        </p>
      </div>
    </div>
  )
}

export default Null