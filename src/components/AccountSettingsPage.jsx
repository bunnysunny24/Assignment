import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
// Import Settings icon from lucide-react
import { Settings } from 'lucide-react';

function AccountSettingsPage() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    // Check if user is logged in
    const currentUser = localStorage.getItem('currentUser');
    
    if (!currentUser) {
      // Redirect to login if no user is found
      navigate('/login');
      return;
    }
    
    // Parse user data
    setUserData(JSON.parse(currentUser));
    
    // Animation delay
    const timer = setTimeout(() => setLoaded(true), 300);
    return () => clearTimeout(timer);
  }, [navigate]);

  const handleLogout = () => {
    // Remove current user from localStorage
    localStorage.removeItem('currentUser');
    // Redirect to login page
    navigate('/login');
  };

  // Toggle dropdown menu
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.5
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      } 
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      {/* Mobile App Container */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white w-full max-w-sm h-[667px] overflow-y-auto rounded-md shadow-md border border-gray-100 relative"
      >
        {/* Header with Settings Icon */}
        <div className="flex justify-between items-center bg-gray-50 p-4 border-b border-gray-200">
          <h1 className="text-gray-700 font-medium">Account Settings</h1>
          
          {/* Settings Icon with Dropdown */}
          <div className="relative">
            <button 
              onClick={toggleDropdown}
              className="p-2 rounded-full hover:bg-gray-200 transition-colors focus:outline-none"
            >
              <Settings size={20} className="text-gray-700" />
            </button>
            
            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-36 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>

        {userData && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={loaded ? "visible" : "hidden"}
            className="p-4"
          >
            {/* User Info Card */}
            <motion.div 
              variants={itemVariants}
              className="flex items-center mb-4"
            >
              {/* Profile Image */}
              <div className="relative">
                {/* IMPORTANT: Replace with your own image path in public folder */}
                {/* You can use the line below to use an image from public folder */}
                <img 
                  src="/image.png" 
                  alt="Profile" 
                  className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                  onError={(e) => {
                    // Fallback to placeholder if image fails to load
                    e.target.src = 'https://via.placeholder.com/60';
                  }}
                />
                
                {/* Online Status Indicator */}
                <div className="absolute bottom-0 right-0 bg-purple-500 p-1 rounded-full border-2 border-white">
                  <div className="w-2 h-2"></div>
                </div>
              </div>
              
              {/* User Name and Email */}
              <div className="ml-4">
                <h2 className="font-medium text-gray-800">{userData.fullName}</h2>
                <p className="text-gray-600 text-sm">{userData.email}</p>
              </div>
            </motion.div>
            
            {/* Bio Section */}
            <motion.div 
              variants={itemVariants}
              className="mt-6 text-sm text-gray-600 leading-relaxed border-b border-gray-200 pb-6"
            >
              <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam</p>
            </motion.div>
            
            {/* Additional User Details */}
            <motion.div 
              variants={itemVariants}
              className="mt-6"
            >
              {userData.companyName && (
                <div className="mb-4">
                  <p className="text-xs text-purple-500 font-medium mb-1">Company</p>
                  <p className="text-sm text-gray-700">{userData.companyName}</p>
                </div>
              )}
              
              <div className="mb-4">
                <p className="text-xs text-purple-500 font-medium mb-1">Phone</p>
                <p className="text-sm text-gray-700">{userData.phone || "Not provided"}</p>
              </div>
              
              <div className="mb-4">
                <p className="text-xs text-purple-500 font-medium mb-1">Agency Status</p>
                <p className="text-sm text-gray-700">{userData.isAgency === 'yes' ? 'Agency' : 'Not an Agency'}</p>
              </div>
              
              <div className="mb-4">
                <p className="text-xs text-purple-500 font-medium mb-1">Account Created</p>
                <p className="text-sm text-gray-700">
                  {userData.createdAt ? new Date(userData.createdAt).toLocaleDateString() : "Unknown"}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default AccountSettingsPage;