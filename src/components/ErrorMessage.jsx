import { FiAlertCircle } from 'react-icons/fi';

const ErrorMessage = ({ message }) => (
  <div
    style={{
      background: 'var(--red-dim)',
      border: '1px solid rgba(255,77,106,0.2)',
      borderRadius: 'var(--radius-sm)',
      padding: '12px 16px',
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      color: 'var(--red)',
      fontSize: 14,
    }}
  >
    <FiAlertCircle style={{ flexShrink: 0 }} />
    {message}
  </div>
);

export default ErrorMessage;
