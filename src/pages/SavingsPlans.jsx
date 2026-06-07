import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import initialPlans from '../data/plans.json';
import { formatCurrency, getProgress } from '../utils/formatCurrency';
import '../styles/Pages.css';
import { FiPlus, FiX, FiCalendar, FiPercent, FiTarget } from 'react-icons/fi';

const SavingsPlans = () => {
  const [plans, setPlans] = useState(initialPlans);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState('all');
  const [form, setForm] = useState({
    name: '', target: '', saved: '', rate: '', duration: '', type: 'savings',
  });

  const filtered = plans.filter((p) =>
    filter === 'all' ? true : p.type === filter
  );

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.name || !form.target) return;
    const newPlan = {
      id: uuidv4(),
      name: form.name,
      target: Number(form.target),
      saved: Number(form.saved) || 0,
      invested: Number(form.saved) || 0,
      rate: Number(form.rate) || 0,
      returns: Number(form.rate) || 0,
      duration: form.duration || '12 months',
      type: form.type,
    };
    setPlans([...plans, newPlan]);
    setShowModal(false);
    setForm({ name: '', target: '', saved: '', rate: '', duration: '', type: 'savings' });
  };

  return (
    <div className="savings-page">
      <div className="plans-header-row">
        <div>
          <h1 style={{ fontSize: 26, marginBottom: 4 }}>Savings & Investment Plans</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
            {plans.length} active plans
          </p>
        </div>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          <FiPlus /> New Plan
        </button>
      </div>

      {/* Filter */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        {['all', 'savings', 'investment'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: '8px 18px',
              borderRadius: 100,
              border: '1px solid',
              borderColor: filter === f ? 'var(--accent)' : 'var(--border)',
              background: filter === f ? 'var(--accent-dim)' : 'transparent',
              color: filter === f ? 'var(--accent)' : 'var(--text-secondary)',
              fontSize: 13,
              fontWeight: 500,
              cursor: 'pointer',
              textTransform: 'capitalize',
            }}
          >
            {f === 'all' ? 'All Plans' : f === 'savings' ? 'Savings' : 'Investments'}
          </button>
        ))}
      </div>

      <div className="plans-list">
        {filtered.map((p) => {
          const amount = p.saved ?? p.invested ?? 0;
          const pct = getProgress(amount, p.target);
          return (
            <div key={p.id} className="plan-item-card">
              <div className="plan-item-header">
                <div className="plan-item-name">{p.name}</div>
                <div className={`plan-item-type ${p.type}`}>
                  {p.type === 'savings' ? 'Savings' : 'Investment'}
                </div>
              </div>

              <div className="plan-amounts">
                <div className="plan-amount-label">
                  {p.type === 'savings' ? 'Amount Saved' : 'Amount Invested'}
                </div>
                <div className="plan-amount-value" style={{ color: p.type === 'investment' ? 'var(--gold)' : 'var(--accent)' }}>
                  {formatCurrency(amount)}
                </div>
                <div className="plan-amount-total">
                  Target: {formatCurrency(p.target)}
                </div>
              </div>

              {/* Progress */}
              <div style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-muted)', marginBottom: 6 }}>
                  <span>Progress</span>
                  <span style={{ color: p.type === 'investment' ? 'var(--gold)' : 'var(--accent)', fontWeight: 600 }}>
                    {pct}%
                  </span>
                </div>
                <div className="progress-bar-track">
                  <div
                    className={`progress-bar-fill ${p.type === 'investment' ? 'gold' : ''}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>

              <div className="plan-meta">
                {p.rate != null && (
                  <div className="plan-meta-item">
                    <FiPercent />
                    <strong>{p.rate}%</strong>
                  </div>
                )}
                {p.returns != null && (
                  <div className="plan-meta-item">
                    <FiPercent />
                    <strong style={{ color: 'var(--gold)' }}>{p.returns}% returns</strong>
                  </div>
                )}
                {p.duration && (
                  <div className="plan-meta-item">
                    <FiCalendar /> <strong>{p.duration}</strong>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setShowModal(false)}>
          <div className="modal">
            <div className="modal-header">
              <h2 className="modal-title">Create New Plan</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                <FiX />
              </button>
            </div>
            <form onSubmit={handleAdd} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="form-group">
                <label className="form-label">Plan Name *</label>
                <input
                  placeholder="e.g. Vacation Fund"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Plan Type</label>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                >
                  <option value="savings">Savings</option>
                  <option value="investment">Investment</option>
                </select>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="form-group">
                  <label className="form-label">Target Amount (₦) *</label>
                  <input
                    type="number"
                    placeholder="500000"
                    value={form.target}
                    onChange={(e) => setForm({ ...form, target: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Initial Amount (₦)</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={form.saved}
                    onChange={(e) => setForm({ ...form, saved: e.target.value })}
                  />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="form-group">
                  <label className="form-label">Interest Rate (%)</label>
                  <input
                    type="number"
                    placeholder="10"
                    value={form.rate}
                    onChange={(e) => setForm({ ...form, rate: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Duration</label>
                  <input
                    placeholder="12 months"
                    value={form.duration}
                    onChange={(e) => setForm({ ...form, duration: e.target.value })}
                  />
                </div>
              </div>
              <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                <button type="button" className="btn-secondary" style={{ flex: 1 }} onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                  Create Plan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavingsPlans;
