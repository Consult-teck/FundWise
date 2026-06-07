import { useState } from 'react';
import { formatCurrency } from '../utils/formatCurrency';
import '../styles/Pages.css';
import {
  FiUsers, FiDollarSign, FiActivity, FiShield,
  FiSearch, FiCheck, FiX,
} from 'react-icons/fi';

const mockUsers = [
  { id: 'u1', name: 'Adaeze Okonkwo', email: 'adaeze@email.com', balance: 450000, invested: 340000, status: 'active', role: 'user', joined: '2025-01-10' },
  { id: 'u2', name: 'Emeka Nwosu', email: 'emeka@email.com', balance: 120000, invested: 75000, status: 'active', role: 'user', joined: '2025-02-05' },
  { id: 'u3', name: 'Fatima Bello', email: 'fatima@email.com', balance: 780000, invested: 600000, status: 'active', role: 'user', joined: '2025-01-20' },
  { id: 'u4', name: 'Chidi Okafor', email: 'chidi@email.com', balance: 55000, invested: 20000, status: 'suspended', role: 'user', joined: '2025-03-12' },
  { id: 'u5', name: 'Ngozi Eze', email: 'ngozi@email.com', balance: 310000, invested: 250000, status: 'active', role: 'user', joined: '2025-02-28' },
];

const Admin = () => {
  const [users, setUsers] = useState(mockUsers);
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState('users');

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  const toggleStatus = (id) => {
    setUsers(users.map((u) =>
      u.id === id
        ? { ...u, status: u.status === 'active' ? 'suspended' : 'active' }
        : u
    ));
  };

  const totalBalance = users.reduce((s, u) => s + u.balance, 0);
  const totalInvested = users.reduce((s, u) => s + u.invested, 0);
  const activeUsers = users.filter((u) => u.status === 'active').length;

  return (
    <div className="admin-page">
      <div className="page-header">
        <h1 style={{ fontSize: 26, marginBottom: 4 }}>
          <FiShield style={{ color: 'var(--accent)', marginRight: 8 }} />
          Admin Panel
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
          Manage users and platform activity
        </p>
      </div>

      {/* Admin Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 32 }}>
        {[
          { label: 'Total Users', value: users.length, icon: FiUsers, color: 'var(--accent)' },
          { label: 'Active Users', value: activeUsers, icon: FiActivity, color: '#60a5fa' },
          { label: 'Platform Balance', value: formatCurrency(totalBalance), icon: FiDollarSign, color: 'var(--gold)' },
          { label: 'Total Invested', value: formatCurrency(totalInvested), icon: FiDollarSign, color: 'var(--accent)' },
        ].map((s) => (
          <div key={s.label} className="stat-card">
            <div style={{ width: 38, height: 38, background: `${s.color}22`, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color, fontSize: 17, marginBottom: 12 }}>
              <s.icon />
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 4 }}>
              {s.label}
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: s.color }}>
              {s.value}
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        {['users', 'transactions'].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              padding: '8px 20px',
              borderRadius: 100,
              border: '1px solid',
              borderColor: tab === t ? 'var(--accent)' : 'var(--border)',
              background: tab === t ? 'var(--accent-dim)' : 'transparent',
              color: tab === t ? 'var(--accent)' : 'var(--text-secondary)',
              fontSize: 13,
              fontWeight: 500,
              cursor: 'pointer',
              textTransform: 'capitalize',
            }}
          >
            {t === 'users' ? 'All Users' : 'Transactions'}
          </button>
        ))}
      </div>

      {tab === 'users' && (
        <div className="card">
          {/* Search */}
          <div style={{ position: 'relative', marginBottom: 20, maxWidth: 320 }}>
            <FiSearch style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ paddingLeft: 38 }}
            />
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Balance</th>
                  <th>Invested</th>
                  <th>Joined</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((u) => (
                  <tr key={u.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{
                          width: 34, height: 34, borderRadius: '50%',
                          background: 'linear-gradient(135deg, var(--accent), var(--gold))',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 12, fontWeight: 700, color: 'var(--bg-primary)', flexShrink: 0,
                        }}>
                          {u.name.split(' ').map((n) => n[0]).join('')}
                        </div>
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-primary)' }}>{u.name}</div>
                          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{u.email}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ color: 'var(--accent)', fontWeight: 600 }}>{formatCurrency(u.balance)}</td>
                    <td style={{ color: 'var(--gold)', fontWeight: 600 }}>{formatCurrency(u.invested)}</td>
                    <td>{u.joined}</td>
                    <td>
                      <span className={`badge ${u.status === 'active' ? 'badge-green' : 'badge-red'}`}>
                        {u.status === 'active' ? <FiCheck /> : <FiX />}
                        {u.status}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() => toggleStatus(u.id)}
                        style={{
                          padding: '6px 14px',
                          borderRadius: 6,
                          border: '1px solid',
                          borderColor: u.status === 'active' ? 'rgba(255,77,106,0.3)' : 'rgba(0,212,170,0.3)',
                          background: u.status === 'active' ? 'var(--red-dim)' : 'var(--accent-dim)',
                          color: u.status === 'active' ? 'var(--red)' : 'var(--accent)',
                          fontSize: 12,
                          cursor: 'pointer',
                        }}
                      >
                        {u.status === 'active' ? 'Suspend' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'transactions' && (
        <div className="card">
          <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>
            Transaction management coming soon. Connect a backend to view all platform transactions.
          </p>
        </div>
      )}
    </div>
  );
};

export default Admin;
