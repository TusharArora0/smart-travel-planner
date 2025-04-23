import React, { useEffect, useState } from 'react';
import '../styles/Activities.css';
import { images, categoryBackgrounds } from '../utils/imageData';
import { Link } from 'react-router-dom';

const Activities = () => {
  const [activeActivity, setActiveActivity] = useState(null);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Add animation delay to cards on load
    const timeout = setTimeout(() => {
      const cards = document.querySelectorAll('.activity-card');
      cards.forEach((card, index) => {
        card.style.opacity = 0;
        card.style.animation = `fadeIn 0.5s ease-out ${index * 0.1}s forwards`;
      });
    }, 300);
    
    return () => clearTimeout(timeout);
  }, []);

  const activities = [
    {
      name: 'River Rafting',
      location: 'Rishikesh',
      image: 'https://media.istockphoto.com/id/1142877679/photo/young-people-enjoying-whitewater-river-rafting-in-river-ganges-rishikesh-india.jpg?s=612x612&w=0&k=20&c=sskxkTsmcseiloBTkv7UGTtb2ZjPTBi-q2aiY83zGXQ=',
      category: 'adventure',
      difficulty: 'Moderate',
      duration: '2-3 hours',
      price: '₹1500 onwards',
      description: 'Experience thrilling white water rafting in the holy Ganges. Perfect for beginners and experienced rafters alike.',
      bookingUrl: 'https://www.riverraftingrishikesh.co.in/'
    },
    {
      name: 'Trekking',
      location: 'Valley of Flowers',
      image: images.adventure.trekking,
      category: 'adventure',
      difficulty: 'Challenging',
      duration: '6-7 days',
      price: '₹12000 onwards',
      description: 'Trek through the stunning Valley of Flowers National Park, a UNESCO World Heritage site.',
      bookingUrl: 'https://uttarakhandtourism.gov.in/destination/valley-of-flowers'
    },
    {
      name: 'Skiing',
      location: 'Auli',
      image: images.adventure.skiing,
      category: 'adventure',
      difficulty: 'Beginner to Advanced',
      duration: '1-7 days',
      price: '₹3000 onwards',
      description: 'Learn skiing or perfect your technique at one of India\'s best ski resorts.',
      bookingUrl: 'https://uttarakhandtourism.gov.in/destination/auli'
    },
    {
      name: 'Paragliding',
      location: 'Mukteshwar',
      image: images.adventure.paragliding,
      category: 'adventure',
      difficulty: 'No experience needed',
      duration: '15-30 minutes',
      price: '₹2500 onwards',
      description: 'Soar through the skies and enjoy breathtaking views of the Himalayas.',
      bookingUrl: 'https://www.thrillophilia.com/tours/paragliding-in-nainital'
    },
    {
      name: 'Rock Climbing',
      location: 'Rishikesh',
      image: images.adventure.rockClimbing || 'https://images.unsplash.com/photo-1522163182402-834f871fd851?w=800&q=80&auto=format',
      category: 'adventure',
      difficulty: 'Moderate',
      duration: '3-4 hours',
      price: '₹1800 onwards',
      description: 'Test your strength and skill on natural rock faces with experienced instructors.',
      bookingUrl: 'https://wildwondersadventure.com/climbing.html'
    },
    {
      name: 'Camping',
      location: 'Chopta',
      image: images.adventure.camping,
      category: 'adventure',
      difficulty: 'Easy',
      duration: '1-2 days',
      price: '₹2000 onwards',
      description: 'Camp under the stars in one of the most serene locations in Uttarakhand.',
      bookingUrl: 'https://www.makemytrip.com/holidays-india/chopta-travel-packages.html'
    }
  ];

  const getActivityStyle = (category) => {
    if (!category) return {};
    
    const categoryKey = category.toLowerCase();
    return {
      background: categoryBackgrounds[categoryKey]?.gradient || 
        'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.7))'
    };
  };
  
  const heroStyle = {
    backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1533130061792-64b345e4a833?w=1600&q=80&auto=format')`
  };

  // Handle image load errors
  const handleImageError = (e) => {
    e.target.src = "https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=800&q=80&auto=format";
  };
  
  const handleActivityHover = (index) => {
    setActiveActivity(index);
  };

  return (
    <div className="activities-page">
      <div className="activities-hero" style={heroStyle}>
        <h1>Adventure Activities</h1>
        <p>Discover thrilling experiences in the Land of Gods</p>
      </div>

      <div className="activities-content">
        <div className="activities-intro">
          <h2>Choose Your Adventure</h2>
          <p>From gentle nature walks to adrenaline-pumping adventures, find activities that match your spirit of exploration in the beautiful landscapes of Uttarakhand.</p>
        </div>

        <div className="activities-grid">
          {activities.map((activity, index) => (
            <div 
              key={index} 
              className="activity-card"
              onMouseEnter={() => handleActivityHover(index)}
              onMouseLeave={() => handleActivityHover(null)}
            >
              <div className="activity-image">
                <img 
                  src={activity.image} 
                  alt={activity.name} 
                  loading="lazy" 
                  onError={handleImageError}
                />
                <div 
                  className="activity-category" 
                  style={getActivityStyle(activity.category)}
                >
                  {activity.category?.toUpperCase() || 'ADVENTURE'}
                </div>
                <div className="activity-difficulty">{activity.difficulty}</div>
              </div>
              <div className="activity-info">
                <h3>{activity.name}</h3>
                <div className="activity-location">
                  <span>📍 {activity.location}</span>
                </div>
                <p className="activity-description">{activity.description}</p>
                <div className="activity-details">
                  <span>⏱️ {activity.duration}</span>
                  <span>💰 {activity.price}</span>
                </div>
                <a 
                  href={activity.bookingUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="book-activity"
                >
                  Book Activity
                  <span className="btn-icon">→</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="activities-cta">
          <h2>Looking for Custom Adventures?</h2>
          <p>We can create a personalized adventure package for you and your group based on your preferences and skill level.</p>
          <Link to="/contact" className="contact-btn">
            Contact Our Team
            <span className="btn-icon">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Activities; 