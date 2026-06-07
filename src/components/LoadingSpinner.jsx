const LoadingSpinner = ({ size = 40, text = 'Loading...' }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 16,
      padding: 48,
    }}
  >
    <div
      style={{
        width: size,
        height: size,
        border: '3px solid var(--border)',
        borderTopColor: 'var(--accent)',
        borderRadius: '50%',
        animation: 'spin 0.7s linear infinite',
      }}
    />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    {text && (
      <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>{text}</p>
    )}
  </div>
);

export default LoadingSpinner;
