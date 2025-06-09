import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-white via-indigo-50 to-indigo-100 text-gray-800">
      {/* Header */}
      <header className="flex justify-between items-center max-w-7xl mx-auto w-full px-6 py-6">
        <div className="text-2xl font-bold text-indigo-700">IBC Voting</div>
        <nav className="space-x-6 text-sm font-medium">
          <Link to="/" className="hover:text-indigo-700 transition">Home</Link>
          <Link to="/about" className="text-indigo-600 font-semibold underline">About</Link>
          <Link to="/contact" className="hover:text-indigo-700 transition">Contact</Link>
          <Link to="/login" className="hover:text-indigo-700 transition">Login</Link>
          <Link
            to="/signup"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Sign Up
          </Link>
        </nav>
      </header>

      {/* Main About Content */}
      <main className="flex-grow max-w-5xl mx-auto w-full px-6 py-12 space-y-10">
        <h1 className="text-4xl font-bold text-indigo-800 mb-6">About IBC Voting</h1>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-indigo-700">Our Mission</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            At <strong>IBC Voting</strong>, we aim to bring transparency, accountability, and security to the voting processes
            of the Insolvency and Bankruptcy Code framework in India. Our platform simplifies electronic voting for
            IRPs, RPs, and Liquidators, ensuring compliance with regulatory norms and efficient stakeholder participation.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-indigo-700">Why Choose Us?</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2 text-base">
            <li>Secure & Encrypted Voting Process</li>
            <li>Real-time Result Calculation</li>
            <li>Easy Authentication via OTP & Verified Credentials</li>
            <li>Fully compliant with IBBI regulations</li>
            <li>Admin dashboard for managing voting rounds</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-indigo-700">Powered by............</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            We are a technology-focused team delivering secure e-voting tools, with a deep understanding of legal
            procedures, stakeholder coordination, and user-first design principles.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
