import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function RegistrationPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    emailAddress: '',
    password: '',
    companyName: '',
    isAgency: 'yes'
  });
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    // Simulate loading for smooth animations
    const timer = setTimeout(() => setLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleAgencyChange = (value) => {
    setFormData({
      ...formData,
      isAgency: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registration form submitted:', formData);
    // Process form submission here
    // navigate('/dashboard');
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
        className="bg-white w-full max-w-sm h-[667px] overflow-y-auto rounded-md shadow-md border border-gray-100 px-6 pt-6 pb-8"
      >
        <motion.form 
          variants={containerVariants}
          initial="hidden"
          animate={loaded ? "visible" : "hidden"}
          onSubmit={handleSubmit}
          className="space-y-3"
        >
          {/* Header Text */}
          <motion.div variants={itemVariants} className="mb-2">
            <h1 className="text-xl font-medium text-gray-800">
              Create your 
            </h1>
            <h1 className="text-xl font-medium text-gray-800 mb-3">
              PopX account
            </h1>
          </motion.div>
          
          {/* Full Name Field */}
          <motion.div variants={itemVariants}>
            <label className="block text-purple-500 text-xs font-medium mb-1">
              Full Name<span className="text-purple-500">*</span>
            </label>
            <motion.input
              whileFocus={{ boxShadow: "0 0 0 1px rgba(168, 85, 247, 0.2)" }}
              type="text"
              name="fullName"
              placeholder="Marry Doe"
              className="w-full p-2 border border-gray-200 rounded-md focus:outline-none text-gray-700 text-sm"
              value={formData.fullName}
              onChange={handleInputChange}
              required
            />
          </motion.div>
          
          {/* Phone Number Field */}
          <motion.div variants={itemVariants}>
            <label className="block text-purple-500 text-xs font-medium mb-1">
              Phone number<span className="text-purple-500">*</span>
            </label>
            <motion.input
              whileFocus={{ boxShadow: "0 0 0 1px rgba(168, 85, 247, 0.2)" }}
              type="tel"
              name="phoneNumber"
              placeholder="Marry Doe"
              className="w-full p-2 border border-gray-200 rounded-md focus:outline-none text-gray-700 text-sm"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
            />
          </motion.div>
          
          {/* Email Address Field */}
          <motion.div variants={itemVariants}>
            <label className="block text-purple-500 text-xs font-medium mb-1">
              Email address<span className="text-purple-500">*</span>
            </label>
            <motion.input
              whileFocus={{ boxShadow: "0 0 0 1px rgba(168, 85, 247, 0.2)" }}
              type="email"
              name="emailAddress"
              placeholder="Marry Doe"
              className="w-full p-2 border border-gray-200 rounded-md focus:outline-none text-gray-700 text-sm"
              value={formData.emailAddress}
              onChange={handleInputChange}
              required
            />
          </motion.div>
          
          {/* Password Field */}
          <motion.div variants={itemVariants}>
            <label className="block text-purple-500 text-xs font-medium mb-1">
              Password <span className="text-purple-500">*</span>
            </label>
            <motion.input
              whileFocus={{ boxShadow: "0 0 0 1px rgba(168, 85, 247, 0.2)" }}
              type="password"
              name="password"
              placeholder="Marry Doe"
              className="w-full p-2 border border-gray-200 rounded-md focus:outline-none text-gray-700 text-sm"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </motion.div>
          
          {/* Company Name Field */}
          <motion.div variants={itemVariants}>
            <label className="block text-purple-500 text-xs font-medium mb-1">
              Company name
            </label>
            <motion.input
              whileFocus={{ boxShadow: "0 0 0 1px rgba(168, 85, 247, 0.2)" }}
              type="text"
              name="companyName"
              placeholder="Marry Doe"
              className="w-full p-2 border border-gray-200 rounded-md focus:outline-none text-gray-700 text-sm"
              value={formData.companyName}
              onChange={handleInputChange}
            />
          </motion.div>
          
          {/* Agency Selection */}
          <motion.div variants={itemVariants} className="mt-2">
            <p className="text-gray-800 text-xs mb-2">
              Are you an Agency?<span className="text-purple-500">*</span>
            </p>
            <div className="flex gap-6">
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input
                    type="radio"
                    className="sr-only"
                    name="isAgency"
                    checked={formData.isAgency === 'yes'}
                    onChange={() => handleAgencyChange('yes')}
                  />
                  <div className={`w-4 h-4 rounded-full border ${formData.isAgency === 'yes' ? 'border-purple-500' : 'border-gray-300'}`}>
                    {formData.isAgency === 'yes' && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-2.5 h-2.5 bg-purple-500 rounded-full"></div>
                      </div>
                    )}
                  </div>
                </div>
                <span className="ml-2 text-xs text-gray-700">Yes</span>
              </label>
              
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input
                    type="radio"
                    className="sr-only"
                    name="isAgency"
                    checked={formData.isAgency === 'no'}
                    onChange={() => handleAgencyChange('no')}
                  />
                  <div className={`w-4 h-4 rounded-full border ${formData.isAgency === 'no' ? 'border-purple-500' : 'border-gray-300'}`}>
                    {formData.isAgency === 'no' && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-2.5 h-2.5 bg-purple-500 rounded-full"></div>
                      </div>
                    )}
                  </div>
                </div>
                <span className="ml-2 text-xs text-gray-700">No</span>
              </label>
            </div>
          </motion.div>
          
          {/* Spacer */}
          <div className="h-8"></div>
          
          {/* Create Account Button */}
          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-2.5 bg-purple-600 text-white text-sm font-medium rounded-md transition-all duration-300"
          >
            Create Account
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
}

export default RegistrationPage;