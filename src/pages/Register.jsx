import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Auth.css';
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiUser,
  FiPhone,
  FiTrendingUp,
  FiArrowRight,
  FiCheckCircle,
} from 'react-icons/fi';

const Register = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirm: '',
  });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const { firstName, lastName, email, password, confirm } = form;
    if (!firstName || !lastName || !email || !password) {
      setError('Please fill in all required fields.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    login({
      id: 'u_' + Date.now(),
      firstName,
      lastName,
      email,
      phone: form.phone,
      role: 'user',
      walletBalance: 0,
      joinDate: new Date().toISOString().split('T')[0],
    });
    navigate('/dashboard');
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
          Start your
          <br />
          wealth journey
        </h2>
        <p className="auth-left-subtitle">
          Join thousands of Nigerians building financial freedom through smart
          savings and investments.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            'No account maintenance fees',
            'Start with as little as ₦10,000',
            'Returns up to 20% per annum',
            'Withdraw anytime, no penalties',
          ].map((b) => (
            <div
              key={b}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                fontSize: 14,
                color: 'var(--text-secondary)',
              }}
            >
              <FiCheckCircle style={{ color: 'var(--accent)', flexShrink: 0 }} />
              {b}
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel */}
      <div className="auth-right">
        <div className="auth-right-inner">
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>

          <form className="auth-form" onSubmit={handleSubmit}>
            {error && (
              <div className="form-error">{error}</div>
            )}

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">First Name *</label>
                <div className="form-input-wrapper">
                  <FiUser className="form-input-icon" />
                  <input
                    name="firstName"
                    placeholder="John"
                    value={form.firstName}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Last Name *</label>
                <div className="form-input-wrapper">
                  <FiUser className="form-input-icon" />
                  <input
                    name="lastName"
                    placeholder="Doe"
                    value={form.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Email Address *</label>
              <div className="form-input-wrapper">
                <FiMail className="form-input-icon" />
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <div className="form-input-wrapper">
                <FiPhone className="form-input-icon" />
                <input
                  type="tel"
                  name="phone"
                  placeholder="+234 800 000 0000"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Password *</label>
                <div className="form-input-wrapper">
                  <FiLock className="form-input-icon" />
                  <input
                    type={showPass ? 'text' : 'password'}
                    name="password"
                    placeholder="Min 6 characters"
                    value={form.password}
                    onChange={handleChange}
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
              <div className="form-group">
                <label className="form-label">Confirm Password *</label>
                <div className="form-input-wrapper">
                  <FiLock className="form-input-icon" />
                  <input
                    type="password"
                    name="confirm"
                    placeholder="Repeat password"
                    value={form.confirm}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="btn-submit"
              disabled={loading}
            >
              {loading ? 'Creating account...' : <>Create Account <FiArrowRight /></>}
            </button>

            <p
              style={{
                fontSize: 12,
                color: 'var(--text-muted)',
                textAlign: 'center',
              }}
            >
              By signing up you agree to our{' '}
              <a href="/terms" onClick={(e) => e.preventDefault()}>Terms of Service</a> and{' '}
              <a href="/privacy" onClick={(e) => e.preventDefault()}>Privacy Policy</a>.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
