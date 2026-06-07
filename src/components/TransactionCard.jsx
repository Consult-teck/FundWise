import {
  FiArrowDownLeft,
  FiArrowUpRight,
  FiTrendingUp,
  FiPieChart,
  FiDollarSign,
} from 'react-icons/fi';
import { formatCurrency } from '../utils/formatCurrency';

const iconMap = {
  deposit: { icon: FiArrowDownLeft, color: 'var(--accent)', bg: 'var(--accent-dim)' },
  withdrawal: { icon: FiArrowUpRight, color: 'var(--red)', bg: 'var(--red-dim)' },
  investment: { icon: FiPieChart, color: 'var(--gold)', bg: 'var(--gold-dim)' },
  savings: { icon: FiDollarSign, color: '#60a5fa', bg: 'rgba(96,165,250,0.12)' },
  return: { icon: FiTrendingUp, color: 'var(--accent)', bg: 'var(--accent-dim)' },
};

const TransactionCard = ({ transaction }) => {
  const { icon: Icon, color, bg } = iconMap[transaction.type] || iconMap.deposit;
  const isPositive = transaction.amount > 0;

  return (
    <div className="transaction-item">
      <div
        className="transaction-icon"
        style={{ background: bg, color }}
      >
        <Icon />
      </div>
      <div className="transaction-details">
        <div className="transaction-name">{transaction.description}</div>
        <div className="transaction-date">
          {new Date(transaction.date).toLocaleDateString('en-NG', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}
        </div>
      </div>
      <div
        className="transaction-amount"
        style={{ color: isPositive ? 'var(--accent)' : 'var(--red)' }}
      >
        {isPositive ? '+' : ''}
        {formatCurrency(transaction.amount)}
      </div>
    </div>
  );
};

export default TransactionCard;
