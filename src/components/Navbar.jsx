import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';
import { FiTrendingUp, FiMenu, FiX, FiLogOut, FiUser } from 'react-icons/fi';

const Navbar = ({ sidebarOpen, setSidebarOpen }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const initials = user
    ? (user.firstName?.[0] || '') + (user.lastName?.[0] || '')
    : '';

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        {/* Logo */}
        <Link to={user ? '/dashboard' : '/'} className="navbar-logo">
          <div className="navbar-logo-icon">
            <FiTrendingUp />
          </div>
          <span className="navbar-logo-text">
            Fund<span>Wise</span>
          </span>
        </Link>

        {/* Public nav links */}
        {!user && (
          <ul className="navbar-links">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
          </ul>
        )}

        {/* Actions */}
        <div className="navbar-actions">
          {user ? (
            <>
              {/* Mobile sidebar toggle */}
              <button
                className="navbar-mobile-toggle"
                onClick={() => setSidebarOpen && setSidebarOpen(!sidebarOpen)}
              >
                {sidebarOpen ? <FiX /> : <FiMenu />}
              </button>

              {/* Avatar + dropdown */}
              <div style={{ position: 'relative' }}>
                <div
                  className="navbar-avatar"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  title={user.firstName + ' ' + user.lastName}
                >
                  {initials || <FiUser />}
                </div>
                {dropdownOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: '46px',
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border-light)',
                      borderRadius: 'var(--radius-sm)',
                      minWidth: '180px',
                      zIndex: 999,
                      overflow: 'hidden',
                      boxShadow: 'var(--shadow-card)',
                    }}
                  >
                    <div
                      style={{
                        padding: '12px 16px',
                        borderBottom: '1px solid var(--border)',
                      }}
                    >
                      <div
                        style={{
                          fontSize: '14px',
                          fontWeight: 600,
                          color: 'var(--text-primary)',
                        }}
                      >
                        {user.firstName} {user.lastName}
                      </div>
                      <div
                        style={{ fontSize: '12px', color: 'var(--text-muted)' }}
                      >
                        {user.email}
                      </div>
                    </div>
                    <Link
                      to="/profile"
                      onClick={() => setDropdownOpen(false)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        padding: '10px 16px',
                        color: 'var(--text-secondary)',
                        fontSize: '14px',
                        textDecoration: 'none',
                      }}
                    >
                      <FiUser /> Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        padding: '10px 16px',
                        color: 'var(--red)',
                        fontSize: '14px',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        width: '100%',
                        textAlign: 'left',
                      }}
                    >
                      <FiLogOut /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-secondary" style={{ padding: '9px 20px', fontSize: '13px' }}>
                Sign In
              </Link>
              <Link to="/register" className="btn-primary" style={{ padding: '9px 20px', fontSize: '13px' }}>
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
