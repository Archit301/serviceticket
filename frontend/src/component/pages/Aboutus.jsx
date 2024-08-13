import React from 'react'

const Aboutus = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-6">
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">About Me</h1>
      <p className="text-gray-700 text-lg mb-6">
        Hello! I'm a college student passionate about technology and development. I'm dedicated to learning and growing in the field of software development, with a focus on creating innovative and impactful solutions.
      </p>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">My Mission</h2>
        <p className="text-gray-700 text-lg">
          My mission is to continuously enhance my skills and contribute to exciting projects. I aim to create meaningful software solutions that address real-world problems and make a positive impact.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">My Journey</h2>
        <p className="text-gray-700 text-lg">
          Starting my journey in software development, I've worked on various projects, both academic and personal. My experiences have taught me valuable lessons and inspired me to pursue a career in tech with enthusiasm and determination.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Skills & Interests</h2>
        <p className="text-gray-700 text-lg">
          I have a keen interest in web development, particularly in technologies like React.js and CodeIgniter. I'm also passionate about exploring new tools and methodologies that help in building efficient and user-friendly applications.
        </p>
      </section>

      <section>
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Get in Touch</h2>
        <p className="text-gray-700 text-lg">
          I'm always open to connecting with like-minded individuals and professionals. Feel free to <a href="mailto:your.email@example.com" className="text-blue-500 hover:underline">email me</a> for collaborations, questions, or just to connect!
        </p>
      </section>
    </div>
  </div>

  )
}

export default Aboutus
