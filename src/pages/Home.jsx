import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/Home.css';
import {
  FiTrendingUp,
  FiShield,
  FiZap,
  FiPieChart,
  FiDollarSign,
  FiUsers,
  FiCheckCircle,
} from 'react-icons/fi';

const features = [
  {
    icon: FiTrendingUp,
    iconClass: '',
    title: 'Smart Investments',
    desc: 'Access curated investment portfolios with competitive returns. Real-time tracking and AI-driven insights.',
  },
  {
    icon: FiShield,
    iconClass: 'gold',
    title: 'Secure Savings',
    desc: 'Grow your savings with guaranteed interest rates. Your funds are protected by industry-leading security.',
  },
  {
    icon: FiZap,
    iconClass: '',
    title: 'Instant Payments',
    desc: 'Fund your wallet and move money instantly. Supports all major Nigerian banks and payment methods.',
  },
  {
    icon: FiPieChart,
    iconClass: 'gold',
    title: 'Portfolio Analytics',
    desc: 'Visualize your financial health with interactive charts and detailed performance breakdowns.',
  },
  {
    icon: FiDollarSign,
    iconClass: '',
    title: 'Flexible Plans',
    desc: 'Choose from savings plans starting as low as ₦5,000/month. Customize duration and contribution.',
  },
  {
    icon: FiUsers,
    iconClass: 'gold',
    title: 'Referral Rewards',
    desc: 'Earn bonuses by inviting friends. Every successful referral adds to your wallet balance.',
  },
];

const plans = [
  {
    name: 'Starter',
    return: 8,
    desc: 'Perfect for first-time investors',
    features: ['Min. ₦10,000 investment', '8% annual returns', '3–6 month lock-in', 'Monthly payouts'],
  },
  {
    name: 'Growth',
    return: 14,
    desc: 'Most popular for serious savers',
    features: ['Min. ₦50,000 investment', '14% annual returns', '12-month duration', 'Quarterly dividends'],
    featured: true,
  },
  {
    name: 'Premium',
    return: 20,
    desc: 'Maximum returns for high earners',
    features: ['Min. ₦200,000 investment', '20% annual returns', '24-month duration', 'Priority support'],
  },
];

const Home = () => {
  return (
    <div className="home-page page-wrapper">
      <Navbar />

      {/* Hero */}
      <section className="hero">
        <div className="hero-badge">
          <FiTrendingUp /> Trusted by 50,000+ Nigerians
        </div>
        <h1 className="hero-title">
          Grow Your Wealth
          <br />
          <span className="highlight">The Smart Way</span>
        </h1>
        <p className="hero-subtitle">
          FundWise helps you save smarter and invest better. Start with as
          little as ₦10,000 and watch your money work for you.
        </p>
        <div className="hero-actions">
          <Link to="/register" className="btn-primary" style={{ fontSize: 16, padding: '14px 32px' }}>
            Start Investing Free
          </Link>
          <Link to="/about" className="btn-secondary" style={{ fontSize: 16, padding: '14px 32px' }}>
            Learn More
          </Link>
        </div>

        <div className="hero-stats">
          {[
            { value: '₦4.2B+', label: 'Assets Under Management' },
            { value: '50K+', label: 'Active Investors' },
            { value: '18.5%', label: 'Average Annual Return' },
            { value: '99.9%', label: 'Uptime Reliability' },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div className="hero-stat-value">{s.value}</div>
              <div className="hero-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <div className="section-eyebrow">Why FundWise</div>
        <h2 className="section-title">Everything you need to build wealth</h2>
        <p className="section-subtitle">
          From savings goals to investment portfolios — all in one powerful,
          easy-to-use platform.
        </p>
        <div className="features-grid">
          {features.map((f) => (
            <div key={f.title} className="feature-card">
              <div className={`feature-icon ${f.iconClass}`}>
                <f.icon />
              </div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Plans */}
      <section className="plans-preview">
        <div className="plans-preview-inner">
          <div className="section-eyebrow">Investment Plans</div>
          <h2 className="section-title">Choose your growth path</h2>
          <p className="section-subtitle">
            Transparent pricing. No hidden fees. Start, pause or withdraw
            anytime.
          </p>
          <div className="plans-grid">
            {plans.map((p) => (
              <div key={p.name} className={`plan-card ${p.featured ? 'featured' : ''}`}>
                <div className="plan-name">{p.name}</div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>
                  {p.desc}
                </div>
                <div className="plan-return">
                  {p.return}%<span> p.a.</span>
                </div>
                <ul className="plan-features">
                  {p.features.map((feat) => (
                    <li key={feat}>
                      <FiCheckCircle style={{ color: 'var(--accent)', flexShrink: 0 }} />
                      {feat}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/register"
                  className={p.featured ? 'btn-primary' : 'btn-secondary'}
                  style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="section-eyebrow">Join Thousands of Smart Investors</div>
        <h2 className="cta-title">
          Your financial future
          <br />
          starts today
        </h2>
        <p className="cta-subtitle">
          Sign up in 2 minutes. No paperwork, no hidden charges. Just smart
          growth.
        </p>
        <Link to="/register" className="btn-primary" style={{ fontSize: 16, padding: '16px 40px' }}>
          Create Free Account
        </Link>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
