import React, { useState } from 'react';
import { useUser } from '../../../src/components/context/UserContext';
import { FaUser, FaPhone, FaEnvelope, FaHome, FaMapPin, FaEdit } from 'react-icons/fa';

const gradientBg = {
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #e0e7ff 0%, #f3f4f6 100%)',
  padding: 16,
};
const cardStyle = {
  background: '#fff',
  borderRadius: 18,
  boxShadow: '0 12px 40px rgba(37,99,235,0.13)',
  padding: 32,
  maxWidth: 520,
  margin: '40px auto',
  border: '1.5px solid #e0e7ff',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  transition: 'box-shadow 0.3s, transform 0.3s',
};
const avatarWrapperStyle = {
  position: 'absolute',
  left: '50%',
  top: -55,
  transform: 'translateX(-50%)',
  zIndex: 2,
  width: 110,
  height: 110,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};
const avatarRingStyle = {
  width: 110,
  height: 110,
  borderRadius: '50%',
  background: 'conic-gradient(from 0deg, #2563eb, #60a5fa, #2563eb 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  animation: 'spin 2.5s linear infinite',
  boxShadow: '0 4px 16px rgba(37,99,235,0.15)',
};
const avatarStyle = {
  width: 90,
  height: 90,
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #2563eb 60%, #60a5fa 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff',
  fontSize: 36,
  fontWeight: 700,
  border: '4px solid #fff',
  boxShadow: '0 2px 8px #2563eb33',
  transition: 'transform 0.3s',
};
const labelStyle = { fontWeight: 600, marginBottom: 2, display: 'inline-block', color: '#2563eb', letterSpacing: 0.5, minWidth: 80 };
const inputStyle = {
  width: '100%',
  padding: '12px 14px',
  borderRadius: 8,
  border: '1.5px solid #e5e7eb',
  marginBottom: 18,
  fontSize: 17,
  background: '#f9fafb',
  transition: 'border 0.2s',
};
const buttonPrimary = {
  padding: '12px 28px',
  background: 'linear-gradient(90deg, #2563eb 60%, #60a5fa 100%)',
  color: '#fff',
  border: 'none',
  borderRadius: 8,
  fontWeight: 700,
  cursor: 'pointer',
  marginRight: 14,
  fontSize: 16,
  boxShadow: '0 2px 8px rgba(37,99,235,0.10)',
  transition: 'background 0.2s, box-shadow 0.2s',
  display: 'flex',
  alignItems: 'center',
  gap: 8,
};
const buttonSecondary = {
  padding: '12px 28px',
  background: '#f3f4f6',
  color: '#222',
  border: 'none',
  borderRadius: 8,
  fontWeight: 700,
  cursor: 'pointer',
  fontSize: 16,
  transition: 'background 0.2s',
};
const dividerStyle = {
  height: 1,
  background: '#e5e7eb',
  width: '100%',
  margin: '24px 0',
  border: 'none',
};
const fieldRow = {
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  marginBottom: 12,
  fontSize: 17,
};
const iconStyle = { color: '#2563eb', fontSize: 20, minWidth: 20 };

const Profile = () => {
  const { user } = useUser();
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ ...user });
  const [cardHover, setCardHover] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    // You can add update logic here
    setEditMode(false);
  };

  // Get initials for avatar
  const initials = user.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2) : 'U';

  return (
    <div style={gradientBg}>
      <div
        style={{ ...cardStyle, boxShadow: cardHover ? '0 16px 48px #2563eb22' : cardStyle.boxShadow, transform: cardHover ? 'scale(1.025)' : 'scale(1)' }}
        onMouseEnter={() => setCardHover(true)}
        onMouseLeave={() => setCardHover(false)}
      >
        <div style={avatarWrapperStyle}>
          <div style={avatarRingStyle}>
            <div style={avatarStyle} className="profile-avatar">
              {initials}
            </div>
          </div>
        </div>
        <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 32, color: '#2563eb', textAlign: 'center', marginTop: 60 }}>My Profile</h2>
        <div style={{ width: '100%' }}>
          <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24, color: '#222', letterSpacing: 0.5, textAlign: 'center' }}>Profile Info</h3>
          <hr style={dividerStyle} />
          {editMode ? (
            <form onSubmit={handleSave} style={{ display: 'grid', gap: 8 }}>
              <div style={fieldRow}>
                <FaUser style={iconStyle} />
                <label style={labelStyle}>Name:</label>
                <input name="name" value={form.name} onChange={handleChange} required style={inputStyle} />
              </div>
              <div style={fieldRow}>
                <FaPhone style={iconStyle} />
                <label style={labelStyle}>Mobile:</label>
                <input name="mobile" value={form.mobile} onChange={handleChange} required style={inputStyle} />
              </div>
              <div style={fieldRow}>
                <FaEnvelope style={iconStyle} />
                <label style={labelStyle}>Email:</label>
                <input name="email" value={form.email} onChange={handleChange} required style={inputStyle} />
              </div>
              <div style={fieldRow}>
                <FaHome style={iconStyle} />
                <label style={labelStyle}>Address:</label>
                <input name="address" value={form.address} onChange={handleChange} required style={inputStyle} />
              </div>
              <div style={fieldRow}>
                <FaMapPin style={iconStyle} />
                <label style={labelStyle}>Pincode:</label>
                <input name="pincode" value={form.pincode} onChange={handleChange} required style={inputStyle} />
              </div>
              <div style={{ display: 'flex', gap: 14, marginTop: 10, justifyContent: 'center' }}>
                <button type="submit" style={buttonPrimary} onMouseOver={e => e.currentTarget.style.boxShadow = '0 4px 16px #2563eb33'} onMouseOut={e => e.currentTarget.style.boxShadow = buttonPrimary.boxShadow}><FaEdit />Save</button>
                <button type="button" onClick={() => setEditMode(false)} style={buttonSecondary} onMouseOver={e => e.currentTarget.style.background = '#e0e7ff'} onMouseOut={e => e.currentTarget.style.background = buttonSecondary.background}>Cancel</button>
              </div>
            </form>
          ) : (
            <div style={{ display: 'grid', gap: 16, marginTop: 16 }}>
              <div style={fieldRow}><FaUser style={iconStyle} /><span style={labelStyle}>Name:</span> {user.name}</div>
              <div style={fieldRow}><FaPhone style={iconStyle} /><span style={labelStyle}>Mobile:</span> {user.mobile}</div>
              <div style={fieldRow}><FaEnvelope style={iconStyle} /><span style={labelStyle}>Email:</span> {user.email}</div>
              <div style={fieldRow}><FaHome style={iconStyle} /><span style={labelStyle}>Address:</span> {user.address}</div>
              <div style={fieldRow}><FaMapPin style={iconStyle} /><span style={labelStyle}>Pincode:</span> {user.pincode}</div>
              <button onClick={() => setEditMode(true)} style={{ ...buttonPrimary, marginTop: 18, justifyContent: 'center' }} onMouseOver={e => e.currentTarget.style.boxShadow = '0 4px 16px #2563eb33'} onMouseOut={e => e.currentTarget.style.boxShadow = buttonPrimary.boxShadow}><FaEdit />Edit</button>
            </div>
          )}
        </div>
      </div>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @media (max-width: 600px) {
          .profile-card { padding: 16px !important; max-width: 98vw !important; }
          .profile-avatar { width: 64px !important; height: 64px !important; font-size: 24px !important; top: -32px !important; }
          .profile-title { font-size: 22px !important; margin-top: 32px !important; }
        }
      `}</style>
    </div>
  );
};

export default Profile; 