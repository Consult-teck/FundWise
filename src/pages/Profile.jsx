import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/Pages.css';
import { FiEdit2, FiSave, FiX, FiCalendar, FiMail, FiPhone, FiShield } from 'react-icons/fi';
import { formatCurrency } from '../utils/formatCurrency';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.phone || '',
    email: user?.email || '',
  });
  const [saved, setSaved] = useState(false);

  const initials =
    (user?.firstName?.[0] || '') + (user?.lastName?.[0] || '');

  const handleSave = () => {
    updateUser && updateUser(form);
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const stats = [
    { label: 'Wallet Balance', value: formatCurrency(user?.walletBalance || 285000), color: 'var(--accent)' },
    { label: 'Total Invested', value: formatCurrency(1090000), color: 'var(--gold)' },
    { label: 'Net Worth', value: formatCurrency(2555000), color: '#60a5fa' },
    { label: 'Active Plans', value: '5', color: 'var(--accent)' },
  ];

  return (
    <div className="profile-page">
      <div className="page-header">
        <h1 style={{ fontSize: 26, marginBottom: 4 }}>My Profile</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
          Manage your personal information
        </p>
      </div>

      {/* Profile Hero */}
      <div className="profile-hero">
        <div className="profile-avatar">{initials}</div>
        <div style={{ flex: 1 }}>
          <div className="profile-name">
            {user?.firstName} {user?.lastName}
          </div>
          <div className="profile-email">{user?.email}</div>
          <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
            <span className="badge badge-green">
              <FiShield /> Verified Investor
            </span>
            {user?.role === 'admin' && (
              <span className="badge badge-gold">Admin</span>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {editing ? (
            <>
              <button className="btn-primary" onClick={handleSave}>
                <FiSave /> Save
              </button>
              <button className="btn-secondary" onClick={() => setEditing(false)}>
                <FiX /> Cancel
              </button>
            </>
          ) : (
            <button className="btn-secondary" onClick={() => setEditing(true)}>
              <FiEdit2 /> Edit Profile
            </button>
          )}
        </div>
      </div>

      {saved && (
        <div style={{
          background: 'var(--accent-dim)',
          border: '1px solid rgba(0,212,170,0.2)',
          color: 'var(--accent)',
          padding: '12px 16px',
          borderRadius: 'var(--radius-sm)',
          fontSize: 14,
          marginBottom: 24,
        }}>
          ✓ Profile updated successfully
        </div>
      )}

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 32 }}>
        {stats.map((s) => (
          <div key={s.label} className="stat-card">
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.8px' }}>
              {s.label}
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: s.color }}>
              {s.value}
            </div>
          </div>
        ))}
      </div>

      {/* Edit Form / Info */}
      <div className="profile-grid">
        <div className="card">
          <h3 style={{ fontSize: 16, marginBottom: 20 }}>Personal Information</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">First Name</label>
                {editing ? (
                  <input value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
                ) : (
                  <div style={{ padding: '12px 0', fontSize: 15, fontWeight: 500 }}>{user?.firstName}</div>
                )}
              </div>
              <div className="form-group">
                <label className="form-label">Last Name</label>
                {editing ? (
                  <input value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
                ) : (
                  <div style={{ padding: '12px 0', fontSize: 15, fontWeight: 500 }}>{user?.lastName}</div>
                )}
              </div>
            </div>
            <div className="form-group">
              <label className="form-label"><FiMail style={{ marginRight: 6 }} />Email Address</label>
              {editing ? (
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              ) : (
                <div style={{ padding: '12px 0', fontSize: 15 }}>{user?.email}</div>
              )}
            </div>
            <div className="form-group">
              <label className="form-label"><FiPhone style={{ marginRight: 6 }} />Phone Number</label>
              {editing ? (
                <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              ) : (
                <div style={{ padding: '12px 0', fontSize: 15 }}>{user?.phone || 'Not provided'}</div>
              )}
            </div>
          </div>
        </div>

        <div className="card">
          <h3 style={{ fontSize: 16, marginBottom: 20 }}>Account Details</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { label: 'Account ID', value: user?.id || 'FW-0001' },
              { label: 'Account Type', value: user?.role === 'admin' ? 'Administrator' : 'Investor' },
              { label: 'Member Since', value: user?.joinDate || '2025-01-15' },
              { label: 'KYC Status', value: 'Verified ✓', color: 'var(--accent)' },
              { label: 'Referral Code', value: 'FW-' + (user?.id || 'DEMO').slice(-4).toUpperCase() },
            ].map((item) => (
              <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border)', fontSize: 14 }}>
                <span style={{ color: 'var(--text-muted)' }}>{item.label}</span>
                <span style={{ fontWeight: 500, color: item.color || 'var(--text-primary)' }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
