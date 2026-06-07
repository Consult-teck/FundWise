import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Sidebar.css';
import {
  FiGrid,
  FiPieChart,
  FiCreditCard,
  FiUser,
  FiSettings,
  FiShield,
} from 'react-icons/fi';
import { RiSaveLine } from 'react-icons/ri';

const Sidebar = ({ open }) => {
  const { user } = useAuth();
  const initials = user
    ? (user.firstName?.[0] || '') + (user.lastName?.[0] || '')
    : '';

  return (
    <aside className={`sidebar${open ? ' open' : ''}`}>
      <div className="sidebar-section">
        <div className="sidebar-section-label">Overview</div>
        <NavLink to="/dashboard" className={({ isActive }) => 'sidebar-link' + (isActive ? ' active' : '')}>
          <FiGrid /> Dashboard
        </NavLink>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-section-label">Finance</div>
        <NavLink to="/savings" className={({ isActive }) => 'sidebar-link' + (isActive ? ' active' : '')}>
          <RiSaveLine /> Savings Plans
        </NavLink>
        <NavLink to="/investments" className={({ isActive }) => 'sidebar-link' + (isActive ? ' active' : '')}>
          <FiPieChart /> Investments
        </NavLink>
        <NavLink to="/payment" className={({ isActive }) => 'sidebar-link' + (isActive ? ' active' : '')}>
          <FiCreditCard /> Payments
        </NavLink>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-section-label">Account</div>
        <NavLink to="/profile" className={({ isActive }) => 'sidebar-link' + (isActive ? ' active' : '')}>
          <FiUser /> Profile
        </NavLink>
        <NavLink to="/settings" className={({ isActive }) => 'sidebar-link' + (isActive ? ' active' : '')}>
          <FiSettings /> Settings
        </NavLink>
        {user?.role === 'admin' && (
          <NavLink to="/admin" className={({ isActive }) => 'sidebar-link' + (isActive ? ' active' : '')}>
            <FiShield /> Admin <span className="badge-count">!</span>
          </NavLink>
        )}
      </div>

      <div className="sidebar-bottom">
        <div className="sidebar-user">
          <div className="sidebar-user-avatar">{initials}</div>
          <div className="sidebar-user-info">
            <div className="sidebar-user-name">
              {user?.firstName} {user?.lastName}
            </div>
            <div className="sidebar-user-role">
              {user?.role === 'admin' ? 'Administrator' : 'Investor'}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
