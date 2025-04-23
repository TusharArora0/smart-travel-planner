import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TripPlanner from './components/TripPlanner';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Destinations from './pages/Destinations';
import Activities from './pages/Activities';
import TourPackages from './pages/TourPackages';
import Gallery from './pages/Gallery';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import Login from './pages/Login';
import { ThemeProvider } from './context/ThemeContext';
import './App.css';
import ErrorBoundary from './components/ErrorBoundary';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <div className="App">
            <Navbar />
            <Routes>
              <Route path="/" element={
                <>
                  <ErrorBoundary>
                    <Hero />
                    <TripPlanner />
                  </ErrorBoundary>
                </>
              } />
              <Route path="/destinations" element={<Destinations />} />
              <Route path="/activities" element={<Activities />} />
              <Route path="/packages" element={<TourPackages />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              {/* Add more routes as needed */}
            </Routes>
          </div>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;