import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Profile from './pages/Profile';
import { AuthProvider, useAuth } from '../../src/components/context/AuthContext';
import { FaUserCircle } from 'react-icons/fa';

function Header() {
  const { user } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <FaUserCircle
          size={28}
          style={{ cursor: 'pointer', marginLeft: 16 }}
          onClick={() => setShowDropdown((v) => !v)}
        />
        {showDropdown && user && (
          <div
            style={{
              position: 'absolute',
              right: 0,
              top: 36,
              background: '#fff',
              border: '1px solid #eee',
              borderRadius: 8,
              boxShadow: '0 2px 8px #eee',
              padding: 16,
              minWidth: 220,
              zIndex: 100,
            }}
          >
            <div><b>Name:</b> {user.name}</div>
            <div><b>Email:</b> {user.email}</div>
            <div><b>Mobile:</b> {user.mobile}</div>
            <div><b>Address:</b> {user.address}</div>
            <div><b>Pincode:</b> {user.pincode}</div>
            <Link to="/profile" style={{ display: 'block', marginTop: 12, color: '#2563eb' }}>
              View Full Profile
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          {/* Other routes */}
          <Route path="/profile" element={<Profile />} />
          {/* Add your other routes here, e.g. Home, Cart, etc. */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App; 