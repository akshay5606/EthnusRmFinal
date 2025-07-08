import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Events from './pages/Events';
import Cart from './pages/Cart';
import Purchases from './pages/Purchases';
import Login from './pages/Login';
import Register from './pages/Register';

const NavBar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('Logged out successfully.');
    navigate('/login');
  };

  return (
    <nav style={{ display: 'flex', justifyContent: 'center', gap: '24px', padding: '12px', background: '#fff', borderBottom: '1px solid #ccc' }}>
      <Link to="/">Events</Link>
      <Link to="/cart">Cart</Link>
      <Link to="/purchases">Purchases</Link>
      {!token ? (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      ) : (
        <button onClick={handleLogout}>Logout</button>
      )}
    </nav>
  );
};

function App() {
  return (
    <Router>
      <div className="app-container">
        <header style={{ textAlign: 'center', backgroundColor: '#000', color: 'white', padding: '16px 0', fontSize: '24px' }}>
          🎉 Event Management System
        </header>
        
        <NavBar />

        <main>
          <Routes>
            <Route path="/" element={<Events />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/purchases" element={<Purchases />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>

        <footer className="bordered-footer" style={{
          marginTop: 'auto',
          background: 'white',
          padding: '20px 16px',
          borderTop: '1px solid #ccc',
          textAlign: 'center'
        }}>
          <div style={{ marginBottom: '10px' }}>
            <a href="/">Home</a> | <a href="/cart">Cart</a> | <a href="/purchases">Purchases</a> | <a href="/login">Login</a> | <a href="/register">Register</a>
          </div>
          <div>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">🐦 Twitter</a> &nbsp;
            <a href="https://facebook.com" target="_blank" rel="noreferrer">📘 Facebook</a> &nbsp;
            <a href="https://instagram.com" target="_blank" rel="noreferrer">📷 Instagram</a> &nbsp;
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">💼 LinkedIn</a>
          </div>
          <p style={{ fontSize: '13px', marginTop: '8px', color: '#888' }}>© {new Date().getFullYear()} Event Management System by Ramit</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
