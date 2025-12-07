import React from 'react'

function About() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 px-6 py-16 flex justify-center">
      <div className="max-w-3xl text-center">

        {/* Logo */}
        <img
          src="./src/assets/VoxVera.png"
          alt="Voxvera Logo"
          className="w-24 h-24 mx-auto mb-6 drop-shadow"
        />

        <h1 className="text-4xl font-bold text-gray-900 mb-4">About Voxvera</h1>

        <p className="text-lg text-gray-600 leading-relaxed mb-6">
          Voxvera is a modern and intelligent platform designed to simplify content creation, translation, and text manipulation. Built with speed,
          clarity, and user experience in mind, Voxvera helps creators, students,
          developers, and professionals turn their ideas into clean and meaningful
          content with ease.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-3">Our Mission</h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          To make communication smarter, faster, and more accessible — enabling
          everyone to convert text, understand languages, and create clean and meaningful content effortlessly.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-3">What Voxvera Offers</h2>
        <ul className="text-gray-600 space-y-3 text-left max-w-md mx-auto mb-10">
          <li>• Fast and accurate text translation</li>
          <li>• Minimal and modern UI for productivity</li>
          <li>• Easy-to-use workflows for creators</li>
          <li>• Clean output, perfect for projects & presentations</li>
        </ul>

        <p className="text-sm text-gray-500 mt-10">
          Voxvera • where ideas turn into clarity
        </p>
      </div>
    </div>
  )
}

export default About 