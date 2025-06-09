import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-white via-yellow-50 to-indigo-100 text-gray-800">
      {/* Header */}
      <header className="flex justify-between items-center max-w-7xl mx-auto w-full px-6 py-6">
        <div className="text-2xl font-bold text-indigo-700">IBC Voting</div>
        <nav className="space-x-6 text-sm font-medium">
          <Link to="/" className="hover:text-indigo-700 transition">Home</Link>
          <Link to="/about" className="hover:text-indigo-700 transition">About</Link>
          <Link to="/contact" className="hover:text-indigo-700 transition">Contact</Link>
          <Link to="/login" className="text-indigo-600 hover:underline">Login</Link>
          <Link
            to="/signup"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Sign Up
          </Link>
        </nav>
      </header>

      {/* Main content */}
      <main className="flex-grow flex flex-col-reverse md:flex-row items-center justify-between max-w-7xl mx-auto w-full px-6 mt-10">
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-indigo-800 leading-tight">
            Welcome to Your <span className="text-yellow-500">IBC E-voting</span> Platform
          </h1>
          <p className="text-gray-700 text-lg">
            Securely manage votes for IRP, RP, and Liquidator decisions through a verified platform built for trust and efficiency.
          </p>
          <div className="space-x-4">
            <Link to="/signup">
              <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">
                Get Started
              </button>
            </Link>
            <Link to="/login">
              <button className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition">
                Login
              </button>
            </Link>
          </div>
        </div>

        <div className="md:w-1/2 mb-10 md:mb-0">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4345/4345565.png"
            alt="Voting illustration"
            className="w-full max-w-md mx-auto animate-fade-in"
          />
        </div>
      </main>

      {/* Footer stays at bottom */}
      <Footer />
    </div>
  );
};

export default Home;
