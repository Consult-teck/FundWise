// About.jsx
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/Pages.css';
import { FiTarget, FiHeart, FiZap, FiGlobe } from 'react-icons/fi';

const team = [
  { name: 'Kelechi Ama', role: 'CEO & Co-Founder', init: 'KA' },
  { name: 'Tolu Adeyemi', role: 'CTO', init: 'TA' },
  { name: 'Zainab Musa', role: 'Head of Finance', init: 'ZM' },
  { name: 'Ike Obi', role: 'Head of Product', init: 'IO' },
];

const values = [
  { icon: FiTarget, title: 'Our Mission', desc: 'To democratize investment and savings for every Nigerian, making financial growth accessible to all income levels.' },
  { icon: FiHeart, title: 'Our Values', desc: 'Transparency, integrity, and innovation drive everything we build. We put our users\' financial wellbeing first.' },
  { icon: FiZap, title: 'Our Vision', desc: 'A Nigeria where every citizen has the tools and knowledge to build lasting wealth and financial security.' },
  { icon: FiGlobe, title: 'Our Reach', desc: 'Over 50,000 active users across 36 states managing ₦4.2 billion in assets through the FundWise platform.' },
];

const About = () => (
  <div className="public-page page-wrapper">
    <Navbar />
    <div className="public-hero">
      <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--accent)', fontWeight: 600, marginBottom: 12 }}>
        About FundWise
      </div>
      <h1 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, marginBottom: 16 }}>
        Built to grow
        <br />Nigerian wealth
      </h1>
      <p style={{ fontSize: 17, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
        FundWise was founded in 2023 by a team of finance and technology experts
        passionate about making smart investing accessible to every Nigerian.
      </p>
    </div>

    <div className="public-content">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 20, marginBottom: 80 }}>
        {values.map((v) => (
          <div key={v.title} className="feature-card">
            <div className="feature-icon"><v.icon /></div>
            <h3 className="feature-title">{v.title}</h3>
            <p className="feature-desc">{v.desc}</p>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--accent)', fontWeight: 600, marginBottom: 12 }}>
          Meet The Team
        </div>
        <h2 style={{ fontSize: 36, fontWeight: 800 }}>The people behind FundWise</h2>
      </div>

      <div className="team-grid">
        {team.map((t) => (
          <div key={t.name} className="team-card">
            <div className="team-avatar">{t.init}</div>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{t.name}</div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{t.role}</div>
          </div>
        ))}
      </div>
    </div>
    <Footer />
  </div>
);

export default About;
