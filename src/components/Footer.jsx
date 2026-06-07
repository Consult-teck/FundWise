// Footer.jsx
import { Link } from 'react-router-dom';
import { FiTrendingUp, FiTwitter, FiLinkedin, FiInstagram } from 'react-icons/fi';

export const Footer = () => (
  <footer
    style={{
      background: 'var(--bg-secondary)',
      borderTop: '1px solid var(--border)',
      padding: '60px 24px 32px',
    }}
  >
    <div
      style={{
        maxWidth: 1200,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1.5fr 1fr 1fr 1fr',
        gap: 40,
        marginBottom: 48,
      }}
    >
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <div
            style={{
              width: 34,
              height: 34,
              background: 'var(--accent)',
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--bg-primary)',
            }}
          >
            <FiTrendingUp />
          </div>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 18,
              fontWeight: 800,
            }}
          >
            Fund<span style={{ color: 'var(--accent)' }}>Wise</span>
          </span>
        </div>
        <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: 260 }}>
          Smart investment and savings platform helping you grow wealth intelligently.
        </p>
        <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
          {[FiTwitter, FiLinkedin, FiInstagram].map((Icon, i) => (
            <a
              key={i}
              href="#"
              style={{
                width: 36,
                height: 36,
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-muted)',
                fontSize: 15,
              }}
            >
              <Icon />
            </a>
          ))}
        </div>
      </div>

      {[
        {
          title: 'Product',
          links: [
            ['Features', '/'],
            ['Savings Plans', '/savings'],
            ['Investments', '/investments'],
            ['Pricing', '/'],
          ],
        },
        {
          title: 'Company',
          links: [
            ['About Us', '/about'],
            ['Contact', '/contact'],
            ['Careers', '/'],
            ['Blog', '/'],
          ],
        },
        {
          title: 'Legal',
          links: [
            ['Privacy Policy', '/'],
            ['Terms of Service', '/'],
            ['Cookie Policy', '/'],
          ],
        },
      ].map((col) => (
        <div key={col.title}>
          <div
            style={{
              fontSize: 12,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              color: 'var(--text-muted)',
              fontWeight: 600,
              marginBottom: 16,
            }}
          >
            {col.title}
          </div>
          {col.links.map(([label, to]) => (
            <Link
              key={label}
              to={to}
              style={{
                display: 'block',
                fontSize: 14,
                color: 'var(--text-secondary)',
                marginBottom: 10,
              }}
            >
              {label}
            </Link>
          ))}
        </div>
      ))}
    </div>
    <div
      style={{
        borderTop: '1px solid var(--border)',
        paddingTop: 24,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: 1200,
        margin: '0 auto',
      }}
    >
      <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
        © 2025 FundWise. All rights reserved.
      </p>
      <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
        Built with React & Recharts
      </p>
    </div>
  </footer>
);

export default Footer;
