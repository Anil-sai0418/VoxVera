import React from 'react'

function Footer() {
  return (
    <footer className="w-full mt-16 bg-gray-100 text-gray-700 py-10 px-6 border-t border-gray-300">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10">

        {/* Branding */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <img
              src="./src/assets/VoxVera.png"
              alt="Voxvera Logo"
              className="w-12 h-12 object-contain"
            />
            <h2 className="text-xl font-bold text-gray-900">Voxvera</h2>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            A smart and simple platform for translating, voicing, and converting content with ease.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Navigation</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><a href="/" className="hover:text-purple-600 transition">Home</a></li>
            <li><a href="/Translator" className="hover:text-purple-600 transition">Translator</a></li>

            <li><a href="/about" className="hover:text-purple-600 transition">About Voxvera</a></li>
          </ul>
        </div>
      
        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact</h3>
          <p className="text-sm text-gray-600">For help or suggestions:</p>
          <p className="text-sm text-gray-800 font-medium mt-1">+91 6300915551</p>
          <p className="text-sm text-gray-800 font-medium mt-1">anilsainunna@gmail.com</p>
        </div>

        {/* Socials */}
     
      </div>

      {/* Bottom */}
      <div className="text-center text-xs text-gray-600 mt-10 border-t border-gray-300 pt-5">
        © {new Date().getFullYear()} Voxvera. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer