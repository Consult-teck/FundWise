import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Auth.css';
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiTrendingUp,
  FiArrowRight,
} from 'react-icons/fi';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.email || !form.password) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 900));

    // Demo: accept any credentials, admin if email contains "admin"
    const userData = {
      id: 'u1',
      firstName: 'Demo',
      lastName: 'User',
      email: form.email,
      role: form.email.includes('admin') ? 'admin' : 'user',
      walletBalance: 285000,
      joinDate: '2025-01-15',
    };
    login(userData);
    navigate('/dashboard');
    setLoading(false);
  };

  return (
    <div className="auth-page">
      {/* Left Panel */}
      <div className="auth-left">
        <div className="auth-brand">
          <div className="auth-brand-icon">
            <FiTrendingUp />
          </div>
          <span className="auth-brand-name">
            Fund<span>Wise</span>
          </span>
        </div>
        <h2 className="auth-left-title">
          Welcome back
          <br />
          to your future
        </h2>
        <p className="auth-left-subtitle">
          Sign in to continue managing your savings and investments. Your
          portfolio is waiting.
        </p>
        <div className="auth-testimonial">
          <p className="auth-testimonial-text">
            "FundWise helped me grow my savings by 23% in just one year. The
            platform is incredibly easy to use and transparent."
          </p>
          <div className="auth-testimonial-author">Adaeze Okonkwo</div>
          <div className="auth-testimonial-role">Software Engineer, Lagos</div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="auth-right">
        <div className="auth-right-inner">
          <h1 className="auth-title">Sign In</h1>
          <p className="auth-subtitle">
            Don't have an account?{' '}
            <Link to="/register">Create one free</Link>
          </p>

          <form className="auth-form" onSubmit={handleSubmit}>
            {error && (
              <div className="form-error">
                <FiLock /> {error}
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div className="form-input-wrapper">
                <FiMail className="form-input-icon" />
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="form-input-wrapper">
                <FiLock className="form-input-icon" />
                <input
                  type={showPass ? 'text' : 'password'}
                  name="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="form-input-toggle"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <div style={{ textAlign: 'right', marginTop: -8 }}>
              <a href="#" style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="btn-submit"
              disabled={loading}
            >
              {loading ? 'Signing in...' : <>Sign In <FiArrowRight /></>}
            </button>

            <div className="auth-divider">
              <div className="auth-divider-line" />
              <span className="auth-divider-text">Demo Credentials</span>
              <div className="auth-divider-line" />
            </div>

            <div
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)',
                padding: '12px 16px',
                fontSize: 13,
                color: 'var(--text-secondary)',
                lineHeight: 1.8,
              }}
            >
              <strong style={{ color: 'var(--text-primary)' }}>Any email + any password</strong> will log you in.
              <br />
              Use <strong style={{ color: 'var(--accent)' }}>admin@</strong> email for admin access.
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
