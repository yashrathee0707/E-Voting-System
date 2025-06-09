import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Logging in with:', formData); // debug

    try {
      const res = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      console.log('Response:', data);

      if (res.ok) {
        alert('Login successful!');
        localStorage.setItem('accessToken', data.accessToken); // optional: save token
        navigate('/'); // redirect to homepage or dashboard
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Something went wrong!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-50 to-yellow-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-2xl animate-fade-in">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6 text-center">Welcome Back</h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300 shadow-md"
          >
            Login
          </button>
        </form>

        <div className="text-sm text-center mt-6">
          <p>
            Forgot your password?{' '}
            <a href="/forgot-password" className="text-indigo-600 font-semibold hover:underline">
              Reset here
            </a>
          </p>
          <p className="mt-2">
            Don’t have an account?{' '}
            <Link to="/signup" className="text-indigo-600 font-semibold hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
