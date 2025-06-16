// src/pages/Profile.jsx
import React, { useEffect, useState } from 'react';
import { Mail, User, Info, Loader2, Image } from 'lucide-react'; // Import necessary Lucide icons

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setError('No token found. Please log in.');
        setLoading(false);
        return;
      }

      try {
        const res = await fetch('/api/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.message || 'Failed to fetch profile');
        }

        setUser(data.data.user);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError(err.message || 'Failed to load profile. Please try again.');
      } finally {
        setLoading(false); // Set loading to false once fetch is complete
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center p-8 bg-white rounded-lg shadow-xl animate-pulse">
          <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
          <p className="text-lg text-gray-700 font-medium">Loading profile data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center p-8 bg-red-100 border border-red-400 text-red-700 rounded-lg shadow-md max-w-md text-center">
          <Info className="w-10 h-10 text-red-500 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Error</h2>
          <p className="text-lg">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition duration-300"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Fallback for user.firstName if it's not available
  const userInitial = user?.firstName ? user.firstName.charAt(0).toUpperCase() : 'U';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 w-full max-w-lg p-8 space-y-6 border border-gray-100">
        {/* Profile Header */}
        <div className="flex flex-col items-center text-center pb-6 border-b border-gray-200">
          {/* Profile Photo Section */}
          <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-purple-400 to-indigo-600 flex items-center justify-center text-white text-5xl font-bold border-4 border-white shadow-lg overflow-hidden mb-4">
            {/* You would replace this with an actual image if user.profilePhotoUrl exists */}
            {user?.profilePhotoUrl ? (
              <img
                src={user.profilePhotoUrl}
                alt={`${user.firstName} ${user.lastName}`}
                className="w-full h-full object-cover"
              />
            ) : (
              userInitial // Fallback to initial if no photo URL
            )}
            <div className="absolute inset-0 bg-black opacity-10 rounded-full"></div>
            {/* Optional: Add a small edit icon or status indicator */}
            <div className="absolute bottom-1 right-1 bg-green-500 p-1 rounded-full border-2 border-white">
              <User className="w-4 h-4 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-1">
            {user.firstName} {user.lastName}
          </h1>
          <p className="text-md text-gray-600 flex items-center">
            <Mail className="w-5 h-5 mr-2 text-blue-500" />
            {user.email}
          </p>
        </div>

        {/* User Details Section */}
        <div className="space-y-4">
          <div className="flex items-center bg-blue-50 p-4 rounded-lg shadow-sm">
            <User className="w-6 h-6 mr-4 text-blue-600" />
            <div>
              <p className="text-sm font-medium text-gray-500">First Name</p>
              <p className="text-lg font-semibold text-gray-800">{user.firstName}</p>
            </div>
          </div>

          <div className="flex items-center bg-blue-50 p-4 rounded-lg shadow-sm">
            <User className="w-6 h-6 mr-4 text-blue-600" />
            <div>
              <p className="text-sm font-medium text-gray-500">Last Name</p>
              <p className="text-lg font-semibold text-gray-800">{user.lastName}</p>
            </div>
          </div>

          {/* Add more profile fields as needed, e.g., role, bio */}
          <div className="flex items-center bg-blue-50 p-4 rounded-lg shadow-sm">
            <Info className="w-6 h-6 mr-4 text-blue-600" />
            <div>
              <p className="text-sm font-medium text-gray-500">Account Status</p>
              <p className="text-lg font-semibold text-gray-800">Active</p>
            </div>
          </div>
        </div>

        {/* Optional: Call to Action/Edit Profile Button */}
        <div className="pt-6 border-t border-gray-200 text-center">
          <button className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transform hover:scale-105 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            <User className="w-5 h-5 mr-2" />
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;