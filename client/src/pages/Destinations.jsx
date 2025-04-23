import React, { useEffect, useState } from 'react';
import '../styles/Destinations.css';
import { images } from '../utils/imageData';
import TripPlanner from '../components/TripPlanner';
import TripPlanDisplay from '../components/TripPlanDisplay';

const Destinations = () => {
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [showPlannerModal, setShowPlannerModal] = useState(false);
  const [tripPlan, setTripPlan] = useState(null);
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const destinations = [
    {
      name: 'Kedarnath',
      image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&auto=format&q=80',
      description: 'One of the holiest Hindu temples dedicated to Lord Shiva',
      altitude: '3,583 m',
      bestTime: 'May-June, September-October'
    },
    {
      name: 'Rishikesh',
      image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&auto=format&q=80',
      description: 'Yoga Capital of the World & Adventure Sports Hub',
      altitude: '372 m',
      bestTime: 'Throughout the year'
    },
    {
      name: 'Nainital',
      image: 'https://images.unsplash.com/photo-1599939571322-792a326991f2?w=800&auto=format&q=80',
      description: 'Beautiful lake city surrounded by mountains',
      altitude: '2,084 m',
      bestTime: 'March-June, September-November'
    },
    {
      name: 'Mussoorie',
      image: 'https://images.unsplash.com/photo-1627301517152-11505d049286?w=800&auto=format&q=80',
      description: 'Queen of Hills - Famous hill station with scenic beauty',
      altitude: '2,005 m',
      bestTime: 'March-June, September-November'
    },
    {
      name: 'Auli',
      image: 'https://images.unsplash.com/photo-1613310023042-ad79320c00ff?w=800&auto=format&q=80',
      description: 'Popular Ski Resort & Adventure Sports Destination',
      altitude: '2,800 m',
      bestTime: 'November-March'
    },
    {
      name: 'Valley of Flowers',
      image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=800&auto=format&q=80',
      description: 'UNESCO World Heritage Site known for its meadows of endemic alpine flowers',
      altitude: '3,658 m',
      bestTime: 'July-September'
    }
  ];

  const heroStyle = {
    backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1506461883276-594a12b11cf3?w=1600&auto=format&q=80')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  };

  const ctaStyle = {
    backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), 
      url('https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1600&auto=format&q=80')`
  };

  return (
    <div className="destinations-page">
      <div className="destinations-hero" style={heroStyle}>
        <h1>Explore Uttarakhand</h1>
        <div className="hero-text">
          <p className="hero-main">Discover the Divine Beauty of Dev Bhoomi</p>
          <p className="hero-sub">From Sacred Temples to Adventure Paradise</p>
        </div>
      </div>
      <div className="destinations-grid">
        {destinations.map((dest, index) => (
          <div key={index} className="destination-item">
            <div className="image-container">
              <img src={dest.image} alt={dest.name} loading="lazy" />
            </div>
            <div className="destination-details">
              <h2>{dest.name}</h2>
              <p>{dest.description}</p>
              <div className="destination-info">
                <span>
                  <i className="altitude-icon">🏔️</i>
                  {dest.altitude}
                </span>
                <span>
                  <i className="calendar-icon">🗓️</i>
                  {dest.bestTime}
                </span>
              </div>
              <button 
                className="explore-btn" 
                onClick={() => {
                  setSelectedDestination(dest);
                  setShowPlannerModal(true);
                }}
              >
                Plan Your Visit
                <span className="btn-icon">→</span>
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="destinations-cta" style={ctaStyle}>
        <h2>Ready to Start Your Journey?</h2>
        <p>Let us help you plan the perfect Uttarakhand adventure</p>
        <button onClick={() => setShowPlannerModal(true)}>
          Plan Your Trip Now
          <span className="btn-icon">→</span>
        </button>
      </div>

      {/* Trip Planner Modal */}
      {showPlannerModal && (
        <div className="modal-overlay">
          <div className="modal-content trip-planner-modal">
            <button className="close-button" onClick={() => {
              setShowPlannerModal(false);
              setTripPlan(null);
            }}>×</button>
            
            {!tripPlan ? (
              <div className="trip-planner-container">
                <h2>Plan Your Visit to {selectedDestination ? selectedDestination.name : 'Uttarakhand'}</h2>
                <TripPlanner 
                  preselectedDestination={selectedDestination ? selectedDestination.name : ''}
                  onPlanGenerated={(plan) => {
                    setTripPlan(plan);
                  }}
                />
              </div>
            ) : (
              <TripPlanDisplay 
                tripPlan={tripPlan} 
                travelStyle="adventure" 
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Destinations;