import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import TransactionCard from '../components/TransactionCard';
import transactions from '../data/transactions.json';
import { formatCurrency } from '../utils/formatCurrency';
import '../styles/Pages.css';
import {
  FiCreditCard, FiSmartphone, FiBriefcase, FiArrowUpRight,
  FiArrowDownLeft, FiCheckCircle,
} from 'react-icons/fi';

const Payment = () => {
  const { user, updateUser } = useAuth();
  const [tab, setTab] = useState('fund'); // 'fund' | 'withdraw'
  const [method, setMethod] = useState('card');
  const [amount, setAmount] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [txns, setTxns] = useState(transactions);

  const balance = user?.walletBalance ?? 285000;

  const handleSubmit = async () => {
    if (!amount || Number(amount) <= 0) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));

    const isDeposit = tab === 'fund';
    const val = Number(amount);
    const newBalance = isDeposit ? balance + val : balance - val;

    updateUser && updateUser({ walletBalance: newBalance });

    const newTxn = {
      id: 't' + Date.now(),
      type: isDeposit ? 'deposit' : 'withdrawal',
      description: isDeposit ? 'Wallet Top-up' : 'Bank Withdrawal',
      amount: isDeposit ? val : -val,
      date: new Date().toISOString().split('T')[0],
      status: 'success',
    };
    setTxns([newTxn, ...txns]);
    setSuccess(
      isDeposit
        ? `₦${Number(amount).toLocaleString()} added to your wallet!`
        : `₦${Number(amount).toLocaleString()} withdrawal initiated!`
    );
    setAmount('');
    setLoading(false);
    setTimeout(() => setSuccess(''), 4000);
  };

  const quickAmounts = [5000, 10000, 25000, 50000, 100000];

  return (
    <div className="payment-page">
      <div className="page-header">
        <h1 style={{ fontSize: 26, marginBottom: 4 }}>Payments</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
          Fund wallet or withdraw earnings
        </p>
      </div>

      <div className="payment-grid">
        {/* Left */}
        <div>
          {/* Wallet Balance */}
          <div className="wallet-balance-card">
            <div className="wallet-balance-label">Available Balance</div>
            <div className="wallet-balance-value">{formatCurrency(balance)}</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 8 }}>
              Last updated: just now
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: 0, background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)', padding: 4, marginBottom: 24 }}>
            {[
              { id: 'fund', label: 'Fund Wallet', icon: FiArrowDownLeft },
              { id: 'withdraw', label: 'Withdraw', icon: FiArrowUpRight },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                style={{
                  flex: 1,
                  padding: '10px 16px',
                  borderRadius: 'var(--radius-sm)',
                  border: 'none',
                  background: tab === id ? 'var(--bg-card)' : 'transparent',
                  color: tab === id ? 'var(--text-primary)' : 'var(--text-muted)',
                  fontFamily: 'var(--font-body)',
                  fontSize: 14,
                  fontWeight: tab === id ? 600 : 400,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                }}
              >
                <Icon /> {label}
              </button>
            ))}
          </div>

          {/* Payment Methods */}
          <div style={{ marginBottom: 20 }}>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 10 }}>Payment Method</p>
            <div className="payment-methods">
              {[
                { id: 'card', label: 'Debit Card', icon: FiCreditCard },
                { id: 'transfer', label: 'Bank Transfer', icon: FiBriefcase },
                { id: 'ussd', label: 'USSD', icon: FiSmartphone },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  className={`payment-method-btn ${method === id ? 'active' : ''}`}
                  onClick={() => setMethod(id)}
                >
                  <Icon /> {label}
                </button>
              ))}
            </div>
          </div>

          {/* Amount */}
          <div className="form-group" style={{ marginBottom: 16 }}>
            <label className="form-label">Amount (₦)</label>
            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{ fontSize: 18, padding: '14px 16px' }}
            />
          </div>

          {/* Quick amounts */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
            {quickAmounts.map((a) => (
              <button
                key={a}
                onClick={() => setAmount(String(a))}
                style={{
                  padding: '6px 14px',
                  borderRadius: 100,
                  border: '1px solid var(--border)',
                  background: amount === String(a) ? 'var(--accent-dim)' : 'transparent',
                  borderColor: amount === String(a) ? 'var(--accent)' : 'var(--border)',
                  color: amount === String(a) ? 'var(--accent)' : 'var(--text-secondary)',
                  fontSize: 13,
                  cursor: 'pointer',
                }}
              >
                ₦{a.toLocaleString()}
              </button>
            ))}
          </div>

          {success && (
            <div style={{
              background: 'var(--accent-dim)',
              border: '1px solid rgba(0,212,170,0.2)',
              borderRadius: 'var(--radius-sm)',
              padding: '12px 16px',
              color: 'var(--accent)',
              fontSize: 14,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: 16,
            }}>
              <FiCheckCircle /> {success}
            </div>
          )}

          <button
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: 15 }}
            onClick={handleSubmit}
            disabled={loading || !amount}
          >
            {loading ? 'Processing...' : tab === 'fund' ? 'Fund Wallet' : 'Withdraw Funds'}
          </button>
        </div>

        {/* Right — Transactions */}
        <div className="chart-card" style={{ height: 'fit-content' }}>
          <div className="chart-title" style={{ marginBottom: 4 }}>Transaction History</div>
          <div className="chart-subtitle" style={{ marginBottom: 20 }}>All recent activity</div>
          <div className="transaction-list">
            {txns.map((t) => (
              <TransactionCard key={t.id} transaction={t} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
