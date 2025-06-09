import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-indigo-700 text-white pt-8 pb-4">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
        {/* About */}
        <div>
          <h3 className="text-lg font-bold mb-3">IBC Voting</h3>
          <p className="text-gray-200">
            A trusted e-voting platform for IRP, RP, and Liquidators to manage votes with transparency and confidence.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-bold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/about" className="hover:underline">About</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact</Link></li>
            <li><Link to="/login" className="hover:underline">Login</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-bold mb-3">Contact Us</h3>
          <p>Email: support@ibcvoting.in</p>
          <p>Phone: +91-9876543210</p>
          <p>Location: New Delhi, India</p>
        </div>
      </div>

      <div className="text-center text-gray-300 mt-6 text-xs">
        &copy; {new Date().getFullYear()} IBC Voting Platform by ..............
      </div>
    </footer>
  );
};

export default Footer;
