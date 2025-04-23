import React from 'react';
import '../styles/Hero.css';
import { images } from '../utils/imageData';
import { Link } from 'react-router-dom';

const Hero = () => {
  const heroStyle = {
    backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), 
      url(${images.hero.main})`
  };

  return (
    <div className="hero" style={heroStyle}>
      <div className="hero-overlay">
        <div className="hero-content">
          <h1 className="ai-fade-in">Discover Uttarakhand</h1>
          <p>Plan your perfect journey through the Land of Gods</p>
          <Link to="/destinations" className="cta-button">
            Explore Destinations
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;