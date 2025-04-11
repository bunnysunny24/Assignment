import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import SignInPage from './components/SignInPage';
import RegistrationPage from './components/RegistrationPage';
import AccountSettingsPage from './components/AccountSettingsPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={<SignInPage />} />
          <Route path="/account" element={<AccountSettingsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;