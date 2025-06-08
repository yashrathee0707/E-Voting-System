import React from 'react';

export default function AuthLayout({ title, children }) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 bg-white shadow-xl rounded-xl overflow-hidden">
        <div className="p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{title}</h2>
          {children}
        </div>
        <div className="hidden md:block bg-blue-100 p-10">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2989/2989988.png"
            alt="Vote Illustration"
            className="h-full object-contain mx-auto"
          />
        </div>
      </div>
    </div>
  );
}
