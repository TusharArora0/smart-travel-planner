import React, { useEffect, useState } from 'react';
import '../styles/TourPackages.css';
import { categoryBackgrounds } from '../utils/imageData';

const TourPackages = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const packages = [
    {
      title: "Char Dham Yatra",
      duration: "11 Nights/12 Days",
      price: "₹60,718",
      image: "https://images.unsplash.com/photo-1606298855672-3efb63017be8?w=800&q=80&auto=format",
      highlights: [
        "Complete tour of all four Dhams: Yamunotri, Gangotri, Kedarnath & Badrinath",
        "Stay in comfortable hotels with all meals included",
        "Private vehicle from Delhi with experienced driver",
        "All temple visits and darshans arranged"
      ],
      includes: ["Private Transportation", "Hotel Accommodation", "All Meals", "Sightseeing", "Taxes"],
      category: "Religious",
      bookingUrl: "https://badrinath-kedarnath.gov.in/"
    },
    {
      title: "Adventure Sports Package",
      duration: "5 Days",
      price: "₹15,000",
      image: "https://media.istockphoto.com/id/1142877679/photo/young-people-enjoying-whitewater-river-rafting-in-river-ganges-rishikesh-india.jpg?s=612x612&w=0&k=20&c=sskxkTsmcseiloBTkv7UGTtb2ZjPTBi-q2aiY83zGXQ=",
      highlights: [
        "White water rafting in Rishikesh (Grade 2-4)",
        "Overnight camping experience along Ganges",
        "Rock climbing and rappelling activities",
        "Professional equipment and trained instructors"
      ],
      includes: ["Equipment", "Camping", "Meals", "Instructors", "Insurance"],
      category: "Adventure",
      bookingUrl: "https://www.makemytrip.com/holidays-india/rishikesh-tour-packages.html"
    },
    {
      title: "Hill Station Tour",
      duration: "7 Days",
      price: "₹20,000",
      image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80&auto=format",
      highlights: [
        "Explore Mussoorie - 'Queen of Hills' & Nainital",
        "Boating in Naini Lake and Mall Road experience",
        "Cable car ride to Gun Hill and Kempty Falls visit",
        "Comfortable accommodations with mountain views"
      ],
      includes: ["Hotels", "Transportation", "Sightseeing", "Some meals", "Guide"],
      category: "Leisure",
      bookingUrl: "https://www.makemytrip.com/holidays-india/mussoorie-tour-packages.html"
    },
    {
      title: "Winter Wonderland",
      duration: "6 Days",
      price: "₹18,000",
      image: "https://uttarakhandtourism.net/wp-content/uploads/2021/12/skiing.jpg",
      highlights: [
        "Skiing in Auli - India's premier ski destination",
        "Asia's longest cable car ride with Himalayan views",
        "Professional ski training for beginners and advanced",
        "Evening bonfire with cultural programs"
      ],
      includes: ["Ski equipment", "Resort stay", "Meals", "Instructor", "Cable car tickets"],
      category: "Adventure",
      bookingUrl: "https://www.makemytrip.com/holidays-india/auli-tour-packages.html"
    }
  ];

  // Get unique categories for filter buttons
  const categories = ['All', ...new Set(packages.map(pkg => pkg.category))];
  
  // Filter packages based on active filter
  const filteredPackages = activeFilter === 'All' 
    ? packages 
    : packages.filter(pkg => pkg.category === activeFilter);

  const getPackageStyle = (category) => ({
    backgroundImage: `${categoryBackgrounds[category.toLowerCase()]?.gradient || 
      'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.7))'}`
  });

  const heroStyle = {
    backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=1600&q=80&auto=format')`
  };

  // Handle image load errors
  const handleImageError = (e) => {
    // Fallback to a reliable default image
    e.target.src = "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?w=800&q=80&auto=format";
  };

  // Handle filter button click
  const handleFilterClick = (category) => {
    setActiveFilter(category);
  };

  return (
    <div className="packages-page">
      <div className="packages-hero" style={heroStyle}>
        <h1>Tour Packages</h1>
        <p>Curated experiences for every type of traveler</p>
      </div>

      <div className="packages-filter">
        {categories.map((category) => (
          <button 
            key={category}
            className={`filter-btn ${activeFilter === category ? 'active' : ''}`}
            onClick={() => handleFilterClick(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="packages-grid">
        {filteredPackages.map((pkg, index) => (
          <div 
            key={index} 
            className="package-card"
            style={{ 
              animation: `fadeIn 0.5s ease-out ${index * 0.1}s forwards`,
              opacity: 0
            }}
          >
            <div className="package-image">
              <img 
                src={pkg.image} 
                alt={pkg.title} 
                loading="lazy" 
                onError={handleImageError}
              />
              <div 
                className="package-category" 
                style={getPackageStyle(pkg.category)}
              >
                {pkg.category}
              </div>
            </div>
            <div className="package-content">
              <h2>{pkg.title}</h2>
              <div className="package-meta">
                <span>⏱️ {pkg.duration}</span>
                <span>💰 {pkg.price}</span>
              </div>
              <div className="package-highlights">
                <h3>Highlights</h3>
                <ul>
                  {pkg.highlights.map((highlight, i) => (
                    <li key={i}>{highlight}</li>
                  ))}
                </ul>
              </div>
              <div className="package-includes">
                <h3>Includes</h3>
                <div className="includes-grid">
                  {pkg.includes.map((item, i) => (
                    <span key={i}>✓ {item}</span>
                  ))}
                </div>
              </div>
              {pkg.bookingUrl ? (
                <a 
                  href={pkg.bookingUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="book-btn"
                >
                  Book Now
                  <span className="btn-icon">→</span>
                </a>
              ) : (
                <button className="book-btn">
                  Book Now
                  <span className="btn-icon">→</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredPackages.length === 0 && (
        <div className="no-packages">
          <h3>No packages found for this category</h3>
          <p>Try selecting a different category or check back later for new packages</p>
        </div>
      )}

      <div className="packages-cta">
        <h2>Need a Custom Package?</h2>
        <p>We can create a personalized itinerary just for you</p>
        <button className="custom-package-btn">
          Contact Us
          <span className="btn-icon">→</span>
        </button>
      </div>
    </div>
  );
};

export default TourPackages; 