import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaUser, FaStar, FaBoxOpen, FaHeart, FaGift, FaCrown, FaBars } from 'react-icons/fa';
import { useUser } from './context/UserContext';
import { useDarkMode } from "@/components/context/DarkModeContext";
import { useAuth } from '@/components/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const dropdownStyle: React.CSSProperties = {
  position: 'absolute',
  right: 0,
  top: 36,
  background: '#fff',
  border: '1px solid #eee',
  borderRadius: 12,
  boxShadow: '0 4px 24px #eee',
  padding: 0,
  minWidth: 260,
  zIndex: 100,
  marginTop: 8,
  overflow: 'hidden',
};
const dropdownItem: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  padding: '12px 20px',
  fontSize: 16,
  color: '#222',
  textDecoration: 'none',
  cursor: 'pointer',
  borderBottom: '1px solid #f3f4f6',
  background: 'none',
  transition: 'background 0.2s',
};
const dropdownItemLast: React.CSSProperties = { ...dropdownItem, borderBottom: 'none' };
const iconStyle = { color: '#2563eb', fontSize: 18, minWidth: 18 };
const signupRow: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '14px 20px 10px 20px',
  fontSize: 15,
  fontWeight: 500,
  background: '#f3f4f6',
  borderBottom: '1px solid #eee',
};
const signupLink: React.CSSProperties = {
  color: '#2563eb',
  fontWeight: 700,
  textDecoration: 'none',
  fontSize: 15,
  marginLeft: 8,
};

const Header: React.FC<HeaderProps> = ({ searchQuery, setSearchQuery }) => {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { dark, toggle } = useDarkMode();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const wishlistActive = location.pathname === '/wishlist';

  const handleLogout = () => {
    logout();
    toast({
      title: <span className="font-bold text-lg text-green-700">See you soon!</span>,
      description: (
        <span className="block text-base text-gray-900 dark:text-gray-100">
          You have safely logged out.{' '}
          <button
            onClick={() => navigate('/login')}
            className="ml-2 px-3 py-1 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            style={{ fontSize: '1rem', display: 'inline-block' }}
          >
            Log in again
          </button>
        </span>
      ),
      variant: 'success',
      position: 'top-right',
    });
    if (location.pathname !== '/' && location.pathname !== '/login') {
      setTimeout(() => navigate('/'), 1200);
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-1 py-3">
        {/* Left: Logo and Search */}
        <div className="flex items-center gap-2 min-w-0 w-full md:w-auto">
          {/* Modern Shopping Bag Logo */}
          <span className="flex items-center mr-1">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="20" fill="#0ea5e9" />
              <rect x="12" y="16" width="16" height="12" rx="3" fill="#fff" stroke="#fff" strokeWidth="1.5" />
              <path d="M16 16V14a4 4 0 1 1 8 0v2" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <circle cx="16" cy="22" r="1.2" fill="#0ea5e9" />
              <circle cx="24" cy="22" r="1.2" fill="#0ea5e9" />
            </svg>
          </span>
          <span className="text-3xl font-black text-sky-600 tracking-tight ml-1 mr-1 select-none whitespace-nowrap" style={{letterSpacing: '0.02em'}}>ShopEZ</span>
      <input
        type="text"
        placeholder="Search for products, brands and more..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="flex-1 min-w-[120px] max-w-md px-1 py-2 rounded-xl border-2 border-gray-200 text-lg focus:outline-none focus:ring-2 focus:ring-sky-400 bg-white dark:bg-gray-900 dark:text-white dark:border-gray-700 transition ml-2"
            style={{ minWidth: 0 }}
          />
        </div>
        {/* Hamburger for mobile */}
        <button className="md:hidden ml-2 p-2" onClick={() => setMobileNavOpen(v => !v)}>
          <FaBars className="h-6 w-6 text-blue-600" />
        </button>
        {/* Right: Nav, User, Cart, Wishlist, Logout, Toggle */}
        <div className="hidden md:flex items-center gap-4">
      {/* Navigation */}
          <div className="flex items-center gap-6">
            <Link
              to="/wishlist"
              className={`text-xl font-medium border-b-2 pb-0.5 transition-colors ${wishlistActive ? 'text-blue-600 border-blue-600 dark:text-blue-300 dark:border-blue-300' : 'text-gray-900 dark:text-gray-100 border-transparent hover:text-blue-600 dark:hover:text-blue-300'}`}
            >
              Wishlist
            </Link>
            <Link to="/cart" className="text-xl font-medium text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-300 transition-colors">Cart</Link>
        {/* Profile Icon and Dropdown */}
        <div style={{ position: 'relative' }}>
          <FaUserCircle
            size={28}
                style={{ cursor: 'pointer', color: dark ? '#f3f4f6' : '#222' }}
            onClick={() => setShowDropdown((v) => !v)}
            title="Profile"
          />
          {showDropdown && (
                <div ref={dropdownRef} style={{...dropdownStyle, background: dark ? '#222' : '#fff', color: dark ? '#f3f4f6' : '#222', boxShadow: '0 2px 8px #0002'}}>
                  <div style={signupRow}>
                    <span>New customer?</span>
                    <Link to="/register" style={signupLink}>Sign Up</Link>
                  </div>
                  <Link to="/profile" style={{...dropdownItem, color: dark ? '#f3f4f6' : '#222'}}><FaUser style={iconStyle} /> My Profile</Link>
                  <Link to="/admin/login" style={{...dropdownItem, color: dark ? '#f3f4f6' : '#222'}}><FaCrown style={iconStyle} /> Admin</Link>
                  <Link to="/seller" style={{...dropdownItem, color: dark ? '#f3f4f6' : '#222'}}><FaCrown style={iconStyle} /> Seller Dashboard</Link>
                  <Link to="/orders" style={{...dropdownItem, color: dark ? '#f3f4f6' : '#222'}}><FaBoxOpen style={iconStyle} /> My Orders</Link>
                  <Link to="/wishlist" style={{...dropdownItem, color: dark ? '#f3f4f6' : '#222'}}><FaHeart style={iconStyle} /> Wishlist</Link>
                  <a href="#" style={{...dropdownItem, color: dark ? '#f3f4f6' : '#222'}}><FaStar style={iconStyle} /> Rewards</a>
                  <a href="#" style={{...dropdownItemLast, color: dark ? '#f3f4f6' : '#222'}}><FaGift style={iconStyle} /> Gift Cards</a>
                </div>
              )}
            </div>
            {!user && (
              <Link to="/login" className="text-xl font-medium text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-300 transition-colors">Login</Link>
            )}
            {user && (
              <button onClick={handleLogout} className="text-xl font-medium text-gray-900 dark:text-gray-100 hover:text-red-600 dark:hover:text-red-400 transition-colors bg-transparent border-none cursor-pointer">Logout</button>
            )}
          </div>
          <button
            className="px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 shadow hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            onClick={toggle}
            aria-label="Toggle dark mode"
          >
            {dark ? "🌙 Dark" : "☀️ Light"}
          </button>
        </div>
      </div>
      {/* Mobile nav dropdown */}
      {mobileNavOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-60 flex flex-col">
          <div className="relative bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 px-4 py-3 shadow-lg flex-1 overflow-y-auto">
            <button className="absolute top-3 right-3 text-2xl text-gray-400 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white" onClick={() => setMobileNavOpen(false)}>&times;</button>
            <div className="mb-4">
              <span className="block text-lg font-bold text-blue-600 mb-2">Navigation</span>
              <Link to="/wishlist" className="flex items-center gap-2 text-xl font-medium text-gray-900 dark:text-gray-100 hover:bg-blue-900/10 dark:hover:bg-blue-300/10 rounded-lg px-3 py-3 transition-colors" onClick={() => setMobileNavOpen(false)}><FaHeart style={iconStyle} /> Wishlist</Link>
              <Link to="/cart" className="flex items-center gap-2 text-xl font-medium text-gray-900 dark:text-gray-100 hover:bg-blue-900/10 dark:hover:bg-blue-300/10 rounded-lg px-3 py-3 transition-colors" onClick={() => setMobileNavOpen(false)}>Cart</Link>
            </div>
            <div className="mb-4">
              <span className="block text-lg font-bold text-blue-600 mb-2">Account</span>
              <Link to="/profile" className="flex items-center gap-2 text-xl font-medium text-gray-900 dark:text-gray-100 hover:bg-blue-900/10 dark:hover:bg-blue-300/10 rounded-lg px-3 py-3 transition-colors" style={{...dropdownItem, color: dark ? '#f3f4f6' : '#222', padding: 0}} onClick={() => setMobileNavOpen(false)}><FaUser style={iconStyle} /> My Profile</Link>
              <Link to="/admin/login" className="flex items-center gap-2 text-xl font-medium text-gray-900 dark:text-gray-100 hover:bg-blue-900/10 dark:hover:bg-blue-300/10 rounded-lg px-3 py-3 transition-colors" style={{...dropdownItem, color: dark ? '#f3f4f6' : '#222', padding: 0}} onClick={() => setMobileNavOpen(false)}><FaCrown style={iconStyle} /> Admin</Link>
              <Link to="/seller" className="flex items-center gap-2 text-xl font-medium text-gray-900 dark:text-gray-100 hover:bg-blue-900/10 dark:hover:bg-blue-300/10 rounded-lg px-3 py-3 transition-colors" style={{...dropdownItem, color: dark ? '#f3f4f6' : '#222', padding: 0}} onClick={() => setMobileNavOpen(false)}><FaCrown style={iconStyle} /> Seller Dashboard</Link>
              <Link to="/orders" className="flex items-center gap-2 text-xl font-medium text-gray-900 dark:text-gray-100 hover:bg-blue-900/10 dark:hover:bg-blue-300/10 rounded-lg px-3 py-3 transition-colors" style={{...dropdownItem, color: dark ? '#f3f4f6' : '#222', padding: 0}} onClick={() => setMobileNavOpen(false)}><FaBoxOpen style={iconStyle} /> My Orders</Link>
              <a href="#" className="flex items-center gap-2 text-xl font-medium text-gray-900 dark:text-gray-100 hover:bg-blue-900/10 dark:hover:bg-blue-300/10 rounded-lg px-3 py-3 transition-colors" style={{...dropdownItem, color: dark ? '#f3f4f6' : '#222', padding: 0}}><FaStar style={iconStyle} /> Rewards</a>
              <a href="#" className="flex items-center gap-2 text-xl font-medium text-gray-900 dark:text-gray-100 hover:bg-blue-900/10 dark:hover:bg-blue-300/10 rounded-lg px-3 py-3 transition-colors" style={{...dropdownItemLast, color: dark ? '#f3f4f6' : '#222', padding: 0}}><FaGift style={iconStyle} /> Gift Cards</a>
            </div>
            <div className="mb-4">
              {!user && (
                <Link to="/login" className="block text-xl font-medium text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-300 transition-colors py-3" onClick={() => setMobileNavOpen(false)}>Login</Link>
              )}
              {user && (
                <button onClick={() => { handleLogout(); setMobileNavOpen(false); }} className="block w-full text-left text-xl font-medium text-gray-900 dark:text-gray-100 hover:text-red-600 dark:hover:text-red-400 transition-colors bg-transparent border-none cursor-pointer py-3">Logout</button>
              )}
            </div>
            <div className="mb-2">
              <button
                className="block w-full text-left px-3 py-3 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 shadow hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                onClick={() => { toggle(); setMobileNavOpen(false); }}
                aria-label="Toggle dark mode"
              >
                {dark ? "🌙 Dark" : "☀️ Light"}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;