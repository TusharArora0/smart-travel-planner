import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <nav className={`navbar ${theme} ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
          <div className="mobile-nav-links">
            <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link to="/destinations" onClick={() => setMobileMenuOpen(false)}>Destinations</Link>
            <Link to="/packages" onClick={() => setMobileMenuOpen(false)}>Tour Packages</Link>
            <Link to="/activities" onClick={() => setMobileMenuOpen(false)}>Activities</Link>
            <Link to="/gallery" onClick={() => setMobileMenuOpen(false)}>Gallery</Link>
            <Link to="/about" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
            <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
          </div>
        </div>
        <div className="site-title">
          <h1>Smart Trip Planner</h1>
        </div>
        <div className="nav-links">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
          <Link to="/destinations" className={location.pathname === '/destinations' ? 'active' : ''}>Destinations</Link>
          <Link to="/packages" className={location.pathname === '/packages' ? 'active' : ''}>Tour Packages</Link>
          <Link to="/activities" className={location.pathname === '/activities' ? 'active' : ''}>Activities</Link>
          <Link to="/gallery" className={location.pathname === '/gallery' ? 'active' : ''}>Gallery</Link>
          <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About Us</Link>
          <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Contact</Link>
        </div>
        <div className="nav-items">
          {user ? (
            <div className="user-menu">
              <span className="username">{user.name || user.email}</span>
              <button onClick={logout} className="auth-button">Logout</button>
            </div>
          ) : (
            <Link to="/login" className="auth-button">Sign In</Link>
          )}
          <button onClick={toggleTheme} className="theme-toggle">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <button 
            className={`mobile-menu-button ${mobileMenuOpen ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <span className="menu-icon-bar"></span>
            <span className="menu-icon-bar"></span>
            <span className="menu-icon-bar"></span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;