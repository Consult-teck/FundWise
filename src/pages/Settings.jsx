import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Pages.css';
import {
  FiBell, FiLock, FiUser, FiShield, FiLogOut, FiSave,
} from 'react-icons/fi';

const sections = [
  { id: 'notifications', label: 'Notifications', icon: FiBell },
  { id: 'security', label: 'Security', icon: FiLock },
  { id: 'account', label: 'Account', icon: FiUser },
  { id: 'privacy', label: 'Privacy', icon: FiShield },
];

const Settings = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [active, setActive] = useState('notifications');
  const [saved, setSaved] = useState(false);

  const [notifs, setNotifs] = useState({
    emailAlerts: true,
    smsAlerts: false,
    pushNotifs: true,
    marketingEmails: false,
    weeklyReport: true,
    transactionAlerts: true,
  });

  const [passwords, setPasswords] = useState({ current: '', newPass: '', confirm: '' });
  const [passError, setPassError] = useState('');

  const handleToggle = (key) => setNotifs({ ...notifs, [key]: !notifs[key] });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (passwords.newPass.length < 6) {
      setPassError('New password must be at least 6 characters.');
      return;
    }
    if (passwords.newPass !== passwords.confirm) {
      setPassError('Passwords do not match.');
      return;
    }
    setPassError('');
    setPasswords({ current: '', newPass: '', confirm: '' });
    handleSave();
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const ToggleRow = ({ label, desc, stateKey }) => (
    <div className="toggle-row">
      <div className="toggle-info">
        <h4>{label}</h4>
        {desc && <p>{desc}</p>}
      </div>
      <label className="toggle-switch">
        <input
          type="checkbox"
          checked={notifs[stateKey]}
          onChange={() => handleToggle(stateKey)}
        />
        <span className="toggle-slider" />
      </label>
    </div>
  );

  return (
    <div className="settings-page">
      <div className="page-header">
        <h1 style={{ fontSize: 26, marginBottom: 4 }}>Settings</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
          Manage your preferences
        </p>
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
          ✓ Settings saved successfully
        </div>
      )}

      <div className="settings-grid">
        {/* Nav */}
        <div className="settings-nav">
          {sections.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              className={`settings-nav-item ${active === id ? 'active' : ''}`}
              onClick={() => setActive(id)}
            >
              <Icon /> {label}
            </button>
          ))}
          <div style={{ marginTop: 16, borderTop: '1px solid var(--border)', paddingTop: 16 }}>
            <button
              className="settings-nav-item"
              onClick={handleLogout}
              style={{ color: 'var(--red)' }}
            >
              <FiLogOut /> Sign Out
            </button>
          </div>
        </div>

        {/* Content */}
        <div>
          {active === 'notifications' && (
            <div className="card">
              <h3 style={{ fontSize: 16, marginBottom: 20 }}>Notification Preferences</h3>
              <ToggleRow label="Email Alerts" desc="Receive important alerts by email" stateKey="emailAlerts" />
              <ToggleRow label="SMS Alerts" desc="Receive text message notifications" stateKey="smsAlerts" />
              <ToggleRow label="Push Notifications" desc="In-app push notifications" stateKey="pushNotifs" />
              <ToggleRow label="Transaction Alerts" desc="Notify on every transaction" stateKey="transactionAlerts" />
              <ToggleRow label="Weekly Report" desc="Weekly portfolio summary email" stateKey="weeklyReport" />
              <ToggleRow label="Marketing Emails" desc="Product updates and promotions" stateKey="marketingEmails" />
              <div style={{ marginTop: 24 }}>
                <button className="btn-primary" onClick={handleSave}>
                  <FiSave /> Save Preferences
                </button>
              </div>
            </div>
          )}

          {active === 'security' && (
            <div className="card">
              <h3 style={{ fontSize: 16, marginBottom: 20 }}>Change Password</h3>
              <form onSubmit={handlePasswordChange} style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
                {passError && (
                  <div style={{ color: 'var(--red)', fontSize: 13, background: 'var(--red-dim)', padding: '10px 14px', borderRadius: 8 }}>
                    {passError}
                  </div>
                )}
                <div className="form-group">
                  <label className="form-label">Current Password</label>
                  <input
                    type="password"
                    placeholder="Enter current password"
                    value={passwords.current}
                    onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">New Password</label>
                  <input
                    type="password"
                    placeholder="Min 6 characters"
                    value={passwords.newPass}
                    onChange={(e) => setPasswords({ ...passwords, newPass: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Confirm New Password</label>
                  <input
                    type="password"
                    placeholder="Repeat new password"
                    value={passwords.confirm}
                    onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                  />
                </div>
                <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start' }}>
                  Update Password
                </button>
              </form>

              <div style={{ marginTop: 40 }}>
                <h3 style={{ fontSize: 16, marginBottom: 16 }}>Two-Factor Authentication</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 4 }}>Authenticator App</div>
                    <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Add an extra layer of security</div>
                  </div>
                  <button className="btn-secondary" style={{ fontSize: 13 }}>Enable 2FA</button>
                </div>
              </div>
            </div>
          )}

          {active === 'account' && (
            <div className="card">
              <h3 style={{ fontSize: 16, marginBottom: 20 }}>Account Information</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 32 }}>
                {[
                  ['Full Name', `${user?.firstName} ${user?.lastName}`],
                  ['Email', user?.email],
                  ['Role', user?.role === 'admin' ? 'Administrator' : 'Investor'],
                  ['Member Since', user?.joinDate || '2025-01-15'],
                ].map(([l, v]) => (
                  <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--border)', fontSize: 14 }}>
                    <span style={{ color: 'var(--text-muted)' }}>{l}</span>
                    <span style={{ fontWeight: 500 }}>{v}</span>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: 24 }}>
                <h4 style={{ fontSize: 15, color: 'var(--red)', marginBottom: 8 }}>Danger Zone</h4>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16 }}>
                  Permanently delete your account and all data. This cannot be undone.
                </p>
                <button style={{
                  background: 'var(--red-dim)',
                  border: '1px solid rgba(255,77,106,0.3)',
                  color: 'var(--red)',
                  padding: '10px 20px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: 13,
                  cursor: 'pointer',
                }}>
                  Delete Account
                </button>
              </div>
            </div>
          )}

          {active === 'privacy' && (
            <div className="card">
              <h3 style={{ fontSize: 16, marginBottom: 20 }}>Privacy Settings</h3>
              {[
                { label: 'Public Profile', desc: 'Allow others to view your profile' },
                { label: 'Data Analytics', desc: 'Help us improve with anonymous usage data' },
                { label: 'Personalized Recommendations', desc: 'Show tailored investment suggestions' },
              ].map((item, i) => {
                const key = ['emailAlerts', 'marketingEmails', 'weeklyReport'][i];
                return <ToggleRow key={item.label} label={item.label} desc={item.desc} stateKey={key} />;
              })}
              <div style={{ marginTop: 24 }}>
                <button className="btn-primary" onClick={handleSave}>
                  <FiSave /> Save Privacy Settings
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
