import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/Pages.css';
import { FiMail, FiPhone, FiMapPin, FiSend, FiCheckCircle } from 'react-icons/fi';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSent(true);
    setLoading(false);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="public-page page-wrapper">
      <Navbar />
      <div className="public-hero">
        <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--accent)', fontWeight: 600, marginBottom: 12 }}>
          Contact Us
        </div>
        <h1 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, marginBottom: 16 }}>
          We'd love to hear from you
        </h1>
        <p style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          Have questions about our platform? Our team is ready to help.
        </p>
      </div>

      <div className="public-content">
        <div className="contact-grid">
          {/* Info */}
          <div>
            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 28 }}>Get in Touch</h3>
            {[
              { icon: FiMail, label: 'Email', val: 'support@fundwise.ng' },
              { icon: FiPhone, label: 'Phone', val: '+234 800 386 3947' },
              { icon: FiMapPin, label: 'Address', val: '12 Lekki Phase 1, Victoria Island, Lagos, Nigeria' },
            ].map((item) => (
              <div key={item.label} className="contact-info-item">
                <div className="contact-info-icon"><item.icon /></div>
                <div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 2 }}>{item.label}</div>
                  <div style={{ fontSize: 15, fontWeight: 500 }}>{item.val}</div>
                </div>
              </div>
            ))}

            <div style={{ marginTop: 40, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 24 }}>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Support Hours</div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.9 }}>
                Monday – Friday: 8am – 6pm<br />
                Saturday: 9am – 3pm<br />
                Sunday: Closed
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="card">
            {sent ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <FiCheckCircle style={{ fontSize: 52, color: 'var(--accent)', marginBottom: 16 }} />
                <h3 style={{ fontSize: 20, marginBottom: 8 }}>Message Sent!</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
                  We'll get back to you within 24 hours.
                </p>
                <button className="btn-secondary" style={{ marginTop: 24 }} onClick={() => setSent(false)}>
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <h3 style={{ fontSize: 18, fontWeight: 700 }}>Send a Message</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <div className="form-group">
                    <label className="form-label">Your Name</label>
                    <input placeholder="John Doe" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input type="email" placeholder="you@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Subject</label>
                  <input placeholder="How can we help?" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea
                    rows={5}
                    placeholder="Tell us more..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                    style={{ resize: 'vertical' }}
                  />
                </div>
                <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start' }} disabled={loading}>
                  <FiSend /> {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
