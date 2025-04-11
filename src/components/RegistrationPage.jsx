import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

function RegistrationPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    countryCode: '+91',
    phoneNumber: '',
    emailAddress: '',
    password: '',
    companyName: '',
    isAgency: 'yes'
  });
  const [loaded, setLoaded] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'phoneNumber') {
      const digitsOnly = value.replace(/\D/g, '').slice(0, 10);
      setFormData({
        ...formData,
        [name]: digitsOnly
      });
      
      if (digitsOnly.length > 0 && digitsOnly.length !== 10) {
        setPhoneError('Phone number must be exactly 10 digits');
      } else {
        setPhoneError('');
      }
    } else if (name === 'password') {
      setFormData({
        ...formData,
        [name]: value
      });
    
      validatePassword(value);
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const validatePassword = (password) => {
    if (password.length < 9) {
      setPasswordError('Password must be at least 9 characters long');
      return false;
    }
    
    const hasLetter = /[A-Za-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSymbol = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
    
    if (!hasLetter || !hasNumber || !hasSymbol) {
      setPasswordError('Password must include letters, numbers, and symbols');
      return false;
    }
    
    setPasswordError('');
    return true;
  };

  const handleAgencyChange = (value) => {
    setFormData({
      ...formData,
      isAgency: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isPhoneValid = formData.phoneNumber.length === 10;
    const isPasswordValid = validatePassword(formData.password);
    
    if (!isPhoneValid) {
      setPhoneError('Phone number must be exactly 10 digits');
      return;
    }
    
    if (!isPasswordValid) {
      return;
    }
    const userData = {
      fullName: formData.fullName,
      phone: `${formData.countryCode}${formData.phoneNumber}`,
      email: formData.emailAddress,
      password: formData.password,
      companyName: formData.companyName,
      isAgency: formData.isAgency,
      createdAt: new Date().toISOString()
    };
    const existingUsers = JSON.parse(localStorage.getItem('popxUsers') || '[]');
    existingUsers.push(userData);
    localStorage.setItem('popxUsers', JSON.stringify(existingUsers));
    localStorage.setItem('lastRegisteredEmail', formData.emailAddress);
    setShowSuccessPopup(true);
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const countryCodes = [
    { code: '+91', country: '🇮🇳' },
    { code: '+1', country: '🇺🇸' },
    { code: '+44', country: '🇬🇧' },
    { code: '+61', country: '🇦🇺' },
    { code: '+49', country: '🇩🇪' },
  ];

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

  const popupVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white w-full max-w-sm h-[667px] overflow-y-auto rounded-md shadow-md border border-gray-100 px-6 pt-6 pb-8 relative"
      >
        <motion.form 
          variants={containerVariants}
          initial="hidden"
          animate={loaded ? "visible" : "hidden"}
          onSubmit={handleSubmit}
          className="space-y-3"
        >
          <motion.div variants={itemVariants} className="mb-2">
            <h1 className="text-xl font-medium text-gray-800">
              Create your 
            </h1>
            <h1 className="text-xl font-medium text-gray-800 mb-3">
              PopX account
            </h1>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <label className="block text-purple-500 text-xs font-medium mb-1">
              Full Name<span className="text-purple-500">*</span>
            </label>
            <motion.input
              whileFocus={{ boxShadow: "0 0 0 1px rgba(168, 85, 247, 0.2)" }}
              type="text"
              name="fullName"
              placeholder="John Doe"
              className="w-full p-2 border border-gray-200 rounded-md focus:outline-none text-gray-700 text-sm"
              value={formData.fullName}
              onChange={handleInputChange}
              required
            />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <label className="block text-purple-500 text-xs font-medium mb-1">
              Phone number<span className="text-purple-500">*</span>
            </label>
            <div className="flex">
              <select
                name="countryCode"
                value={formData.countryCode}
                onChange={handleInputChange}
                className="p-2 border border-gray-200 rounded-l-md focus:outline-none text-gray-700 text-xs w-20"
              >
                {countryCodes.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.country} {country.code}
                  </option>
                ))}
              </select>
              <motion.input
                whileFocus={{ boxShadow: "0 0 0 1px rgba(168, 85, 247, 0.2)" }}
                type="tel"
                name="phoneNumber"
                placeholder="10-digit number"
                className="flex-1 p-2 border border-l-0 border-gray-200 rounded-r-md focus:outline-none text-gray-700 text-sm"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
              />
            </div>
            {phoneError && (
              <p className="text-red-500 text-xs mt-1">{phoneError}</p>
            )}
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <label className="block text-purple-500 text-xs font-medium mb-1">
              Email address<span className="text-purple-500">*</span>
            </label>
            <motion.input
              whileFocus={{ boxShadow: "0 0 0 1px rgba(168, 85, 247, 0.2)" }}
              type="email"
              name="emailAddress"
              placeholder="email@example.com"
              className="w-full p-2 border border-gray-200 rounded-md focus:outline-none text-gray-700 text-sm"
              value={formData.emailAddress}
              onChange={handleInputChange}
              required
            />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <label className="block text-purple-500 text-xs font-medium mb-1">
              Password <span className="text-purple-500">*</span>
            </label>
            <motion.input
              whileFocus={{ boxShadow: "0 0 0 1px rgba(168, 85, 247, 0.2)" }}
              type="password"
              name="password"
              placeholder="9+ chars with letters, numbers & symbols"
              className="w-full p-2 border border-gray-200 rounded-md focus:outline-none text-gray-700 text-sm"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            {passwordError && (
              <p className="text-red-500 text-xs mt-1">{passwordError}</p>
            )}
            {!passwordError && formData.password && (
              <p className="text-green-500 text-xs mt-1">Password meets requirements</p>
            )}
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <label className="block text-purple-500 text-xs font-medium mb-1">
              Company name
            </label>
            <motion.input
              whileFocus={{ boxShadow: "0 0 0 1px rgba(168, 85, 247, 0.2)" }}
              type="text"
              name="companyName"
              placeholder="Your company (optional)"
              className="w-full p-2 border border-gray-200 rounded-md focus:outline-none text-gray-700 text-sm"
              value={formData.companyName}
              onChange={handleInputChange}
            />
          </motion.div>
          
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
          
          <motion.div variants={itemVariants} className="text-xs text-gray-500">
            <p>Password must have 9+ chars with letters, numbers, and symbols</p>
          </motion.div>
          
          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-2.5 bg-purple-600 text-white text-sm font-medium rounded-md transition-all duration-300 mt-6"
          >
            Create Account
          </motion.button>
          
          <motion.div 
            variants={itemVariants}
            className="text-center mt-4"
          >
            <p className="text-sm text-gray-600">
              Have an account?{" "}
              <button 
                type="button"
                onClick={handleLoginClick}
                className="text-purple-600 font-medium hover:underline focus:outline-none"
              >
                Log in
              </button>
            </p>
          </motion.div>
        </motion.form>
        
        <AnimatePresence>
          {showSuccessPopup && (
            <motion.div
              key="success-popup"
              variants={popupVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50"
            >
              <div className="bg-white rounded-md p-6 w-64 text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Success!</h3>
                <p className="text-sm text-gray-600 mb-4">Account created successfully</p>
                <p className="text-xs text-gray-500">Redirecting to login...</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default RegistrationPage;