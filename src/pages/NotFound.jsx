import { Link } from 'react-router-dom';
import '../styles/Pages.css';
import { FiHome, FiArrowLeft } from 'react-icons/fi';

const NotFound = () => (
  <div className="notfound-page">
    <div>
      <div className="notfound-code">404</div>
      <h1 className="notfound-title">Page Not Found</h1>
      <p className="notfound-subtitle">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
        <Link to="/" className="btn-primary">
          <FiHome /> Go Home
        </Link>
        <button className="btn-secondary" onClick={() => window.history.back()}>
          <FiArrowLeft /> Go Back
        </button>
      </div>
    </div>
  </div>
);

export default NotFound;
