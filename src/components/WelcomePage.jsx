import React from 'react';
import { useNavigate } from 'react-router-dom';

function WelcomePage() {
  const navigate = useNavigate();

  const handleCreateAccount = () => {
    navigate('/register');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      {/* Mobile App Container - fixed width to simulate mobile view */}
      <div className="w-full max-w-md bg-white flex flex-col h-screen overflow-hidden border-x border-gray-200 shadow-sm">
        {/* Main content container with padding */}
        <div className="flex flex-col h-full px-6">
          {/* Content aligned to top with spacing */}
          <div className="mt-20 mb-auto">
            <h1 className="text-2xl font-bold text-gray-800 mb-1">Welcome to PopX</h1>
            <p className="text-sm text-gray-500 leading-snug">
              Lorem ipsum dolor sit amet,<br />consectetur adipiscing elit.
            </p>
          </div>
          
          {/* Buttons aligned to bottom with proper spacing */}
          <div className="mb-14">
            <button 
              className="w-full bg-purple-600 text-white py-3 rounded text-center font-medium mb-4"
              onClick={handleCreateAccount}
            >
              Create Account
            </button>
            
            <button 
              className="w-full bg-purple-200 text-purple-700 py-3 rounded text-center font-medium"
              onClick={handleLogin}
            >
              Already Registered? Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;