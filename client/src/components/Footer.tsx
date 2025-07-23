import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaCommentDots } from 'react-icons/fa';
import { useState } from 'react';
import { useAuth, authFetch } from '@/components/context/AuthContext';
import { useEffect, useRef } from 'react';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [chatOpen, setChatOpen] = useState(false);
  const { user } = useAuth();
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const chatEndRef = useRef(null);

  const API_BASE = import.meta.env.VITE_API_URL || `http://${window.location.hostname}:4000`;

  // Fetch chat history
  useEffect(() => {
    let interval: any;
    if (chatOpen && user) {
      const fetchChat = async () => {
        const res = await authFetch(`${API_BASE}/api/chat/${user.id}`);
        const data = await res.json();
        setChatMessages(data);
      };
      fetchChat();
      interval = setInterval(fetchChat, 3000);
    }
    return () => interval && clearInterval(interval);
  }, [chatOpen, user]);
  // Scroll to bottom on new message
  useEffect(() => {
    if (chatEndRef.current) {
      (chatEndRef.current as any).scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, chatOpen]);
  // Send message
  const sendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatInput.trim() || !user) return;
    await authFetch(`${API_BASE}/api/chat/${user.id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sender: 'user', message: chatInput })
    });
    setChatInput('');
    // Optimistically update UI
    setChatMessages(msgs => [...msgs, { sender: 'user', message: chatInput, timestamp: new Date().toISOString() }]);
  };

  const handleProductsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === '/') {
      const el = document.getElementById('product-grid-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById('product-grid-section');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    }
  };

  return (
    <>
      <footer className="w-full bg-gray-900 text-gray-100 pt-12 pb-6 px-4 mt-12 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-gray-800 pb-8">
          {/* Branding & Social */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <span className="text-2xl font-extrabold text-sky-400">ShopEZ</span>
            <span className="text-sm text-gray-400 mb-2">Your one-stop shopping destination</span>
            <div className="flex gap-3 mt-2">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400 transition-transform transform hover:scale-125 duration-200"><FaFacebook size={22} /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400 transition-transform transform hover:scale-125 duration-200"><FaTwitter size={22} /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400 transition-transform transform hover:scale-125 duration-200"><FaInstagram size={22} /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400 transition-transform transform hover:scale-125 duration-200"><FaLinkedin size={22} /></a>
            </div>
          </div>
          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="font-semibold mb-2">Quick Links</span>
            <a href="/" className="hover:text-sky-400 transition">Home</a>
            <a href="/cart" className="hover:text-sky-400 transition">Cart</a>
            <a href="/orders" className="hover:text-sky-400 transition">My Orders</a>
            <a href="/profile" className="hover:text-sky-400 transition">Profile</a>
            <a href="/privacy" className="hover:text-sky-400 transition">Privacy Policy</a>
            <a href="/terms" className="hover:text-sky-400 transition">Terms of Service</a>
          </div>
          {/* Categories */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="font-semibold mb-2">Categories</span>
            <a href="#" className="hover:text-sky-400 transition">Electronics</a>
            <a href="#" className="hover:text-sky-400 transition">Fashion</a>
            <a href="#" className="hover:text-sky-400 transition">Beauty</a>
            <a href="#" className="hover:text-sky-400 transition">Home</a>
            <a href="#" className="hover:text-sky-400 transition">Sports</a>
            <a href="#" className="hover:text-sky-400 transition">Books</a>
            <a href="#" className="hover:text-sky-400 transition">Toys</a>
            <a href="#" className="hover:text-sky-400 transition">Jewelry</a>
          </div>
          {/* Newsletter & Contact */}
          <div className="flex flex-col items-center md:items-end gap-2">
            <span className="font-semibold mb-2">Newsletter</span>
            <form className="flex w-full max-w-xs gap-2 mb-2">
              <input type="email" placeholder="Your email" className="flex-1 px-3 py-2 rounded bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-400" />
              <button type="submit" className="px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600 transition font-semibold">Subscribe</button>
            </form>
            <span className="font-semibold mt-2">Contact</span>
            <a href="mailto:kulshreenakshane@email.com" className="text-sky-300 hover:underline">kulshreenakshane@email.com</a>
            <a href="tel:8459694332" className="hover:underline">8459694332</a>
            <span>Pune, India</span>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-500 text-sm border-t border-gray-800 pt-4">
          &copy; 2025 ShopEZ. All rights reserved. Made with <span className="text-red-400">♥</span> in India.
        </div>
      </footer>
      {/* Floating Live Chat Button */}
      <button
        className="fixed bottom-8 right-8 z-[9999] bg-sky-500 hover:bg-sky-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-transform transform hover:scale-110 animate-bounce"
        onClick={() => setChatOpen((open) => !open)}
        aria-label="Live Chat"
      >
        <FaCommentDots size={28} />
      </button>
      {/* Simple Live Chat Modal */}
      {chatOpen && (
        <div className="fixed bottom-24 right-8 z-[9999] bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-xl w-80 max-w-full animate-fadeIn flex flex-col h-96">
          <div className="flex justify-between items-center px-4 py-2 border-b border-gray-200 dark:border-gray-700">
            <span className="font-semibold text-gray-800 dark:text-gray-100">Live Chat</span>
            <button onClick={() => setChatOpen(false)} className="text-gray-500 hover:text-red-500 transition text-lg">×</button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50 dark:bg-gray-900">
            {chatMessages.length === 0 && <div className="text-gray-400 text-center">No messages yet.</div>}
            {chatMessages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}> 
                <div className={`px-3 py-2 rounded-lg max-w-[70%] text-sm ${msg.sender === 'user' ? 'bg-sky-500 text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100'}`}>{msg.message}<div className="text-[10px] text-right text-gray-300 mt-1">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div></div>
            </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <form onSubmit={sendMessage} className="p-3 border-t border-gray-200 dark:border-gray-700 flex gap-2 bg-white dark:bg-gray-900">
            <input type="text" value={chatInput} onChange={e => setChatInput(e.target.value)} placeholder="Type your message..." className="flex-1 px-3 py-2 rounded bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-400" />
            <button type="submit" className="bg-sky-500 text-white px-4 py-2 rounded hover:bg-sky-600 transition font-semibold">Send</button>
          </form>
        </div>
      )}
    </>
  );
};

export { Footer };