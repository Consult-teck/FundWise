# FundWise — Investment & Savings Platform

A full React frontend for a Nigerian investment and savings platform.

## Quick Start

```bash
npm install
npm start
```

## Demo Login
- **Any email + any password** logs you in
- Use `admin@...` email to access the Admin panel

## Features
- Landing page with hero, features, pricing plans
- Auth (Login / Register) with form validation
- Protected dashboard with charts (Recharts)
- Savings Plans — create & track goals
- Investment Dashboard — portfolio analytics
- Payments — fund wallet, withdraw, transaction history
- Profile — view & edit personal info
- Settings — notifications, security, privacy
- Admin Panel — manage users (admin only)
- Responsive sidebar layout
- Dark theme with `--css-variables`

## Stack
React 18 · React Router v6 · Recharts · React Icons · UUID

## Project Structure
```
src/
├── components/   Navbar, Sidebar, PrivateRoute, TransactionCard...
├── pages/        All route pages
├── context/      AuthContext (localStorage auth)
├── data/         plans.json, transactions.json (mock data)
├── hooks/        useLocalStorage
├── utils/        formatCurrency
└── styles/       CSS per component/page
```
