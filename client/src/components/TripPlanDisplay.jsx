import React, { useState, useEffect } from 'react';
import '../styles/TripPlanDisplay.css';
import TripMap from './TripMap';
import { images } from '../utils/imageData';
import { getAccommodationData, getRestaurantData } from '../utils/accommodationData';
import { getActivityData } from '../utils/activityData';
import amadeusService from '../utils/amadeusService';
import { convertHotelData, convertActivityData } from '../utils/amadeusDataAdapter';

const TripPlanDisplay = ({ tripPlan, travelStyle }) => {
  const [amadeusHotels, setAmadeusHotels] = useState([]);
  const [amadeusActivities, setAmadeusActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Fetch Amadeus hotel and activity data when the component mounts
  useEffect(() => {
    const fetchAmadeusData = async () => {
      if (!tripPlan || !tripPlan.itinerary || tripPlan.itinerary.length === 0) return;
      
      setLoading(true);
      try {
        // Get the first destination from the itinerary
        const firstDay = tripPlan.itinerary[0];
        const destination = firstDay.transportation ? firstDay.transportation.to : '';
        
        if (destination) {
          // Find a matching destination in Uttarakhand
          const destinations = [
            { name: 'Dehradun', cityCode: 'DED', lat: 30.3165, lng: 78.0322 },
            { name: 'Rishikesh', cityCode: 'DED', lat: 30.0869, lng: 78.2676 },
            { name: 'Nainital', cityCode: 'DED', lat: 29.3919, lng: 79.4542 },
            { name: 'Mussoorie', cityCode: 'DED', lat: 30.4598, lng: 78.0644 },
            { name: 'Haridwar', cityCode: 'DED', lat: 29.9457, lng: 78.1642 },
            { name: 'Auli', cityCode: 'DED', lat: 30.5427, lng: 79.5644 }
          ];
          
          const matchedDestination = destinations.find(dest => 
            destination.toLowerCase().includes(dest.name.toLowerCase())
          ) || destinations[0]; // Default to Dehradun if no match
          
          // Get check-in and check-out dates from the itinerary
          const checkInDate = firstDay.date;
          const lastDay = tripPlan.itinerary[tripPlan.itinerary.length - 1];
          const checkOutDate = lastDay.date;
          
          // Fetch hotels
          try {
            const hotelData = await amadeusService.searchHotels(
              matchedDestination.cityCode,
              checkInDate,
              checkOutDate,
              1 // Default to 1 adult
            );
            const hotels = convertHotelData(hotelData);
            setAmadeusHotels(hotels);
          } catch (error) {
            console.error('Error fetching Amadeus hotels:', error);
          }
          
          // Fetch activities
          try {
            const activityData = await amadeusService.searchActivities(
              matchedDestination.lat,
              matchedDestination.lng,
              20 // 20km radius
            );
            const activities = convertActivityData(activityData);
            setAmadeusActivities(activities);
          } catch (error) {
            console.error('Error fetching Amadeus activities:', error);
          }
        }
      } catch (error) {
        console.error('Error in fetchAmadeusData:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAmadeusData();
  }, [tripPlan]);
  if (!tripPlan || !tripPlan.itinerary) {
    return <div className="error-message">No trip plan available</div>;
  }

  const getBackgroundStyle = () => {
    const overlay = 'linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9))';
    const backgroundUrl = images.tripPlanBackgrounds[travelStyle] || images.backgrounds.mountain;
    
    return {
      backgroundImage: `${overlay}, url(${backgroundUrl})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed'
    };
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderLink = (url, text) => {
    if (!url) return text;
    return (
      <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="link-with-icon"
      >
        {text} <span className="link-icon">↗</span>
      </a>
    );
  };

  const renderLocation = (location) => {
    if (!location) return null;
    // Create OpenStreetMap URL for any location
    const locationName = typeof location === 'string' ? location : location.name || '';
    const mapUrl = `https://www.openstreetmap.org/search?query=${encodeURIComponent(locationName)}`;
    
    return (
      <span className="location">
        📍 {renderLink(
          mapUrl,
          locationName
        )}
      </span>
    );
  };
  
  const renderAccommodationImage = (accommodation) => {
    if (!accommodation || !accommodation.name) return null;
    
    // Try to find a matching Amadeus hotel first
    const amadeusHotel = amadeusHotels.find(hotel => 
      hotel.name.toLowerCase().includes(accommodation.name.toLowerCase()) ||
      accommodation.name.toLowerCase().includes(hotel.name.toLowerCase())
    );
    
    // Fall back to static data if no Amadeus match
    const accommodationData = amadeusHotel || getAccommodationData(accommodation.name);
    
    return (
      <div className="accommodation-image-container">
        <img 
          src={accommodationData.image} 
          alt={accommodation.name} 
          className="accommodation-image"
        />
        <div className="accommodation-details-overlay">
          {accommodationData.rating && (
            <span className="accommodation-rating">⭐ {accommodationData.rating}/5</span>
          )}
          {accommodationData.price && (
            <span className="accommodation-price">{typeof accommodationData.price === 'string' ? 
              accommodationData.price : 
              `₹${accommodationData.price}`}</span>
          )}
          {amadeusHotel && (
            <span className="amadeus-badge">Amadeus</span>
          )}
        </div>
        <div className="accommodation-buttons">
          {accommodationData.link && (
            <a 
              href={accommodationData.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="view-more-link"
            >
              View Details
            </a>
          )}
          {accommodationData.bookingLink && (
            <a 
              href={accommodationData.bookingLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="booking-link"
            >
              Book Now
            </a>
          )}
        </div>
      </div>
    );
  };
  
  const renderRestaurantImage = (meal) => {
    if (!meal || !meal.venue) return null;
    
    const restaurantData = getRestaurantData(meal.venue);
    
    return (
      <div className="restaurant-image-container">
        <img 
          src={restaurantData.image} 
          alt={meal.venue} 
          className="restaurant-image"
        />
        <div className="restaurant-details-overlay">
          {restaurantData.cuisine && (
            <span className="restaurant-cuisine">{restaurantData.cuisine}</span>
          )}
          {restaurantData.rating && (
            <span className="restaurant-rating">⭐ {restaurantData.rating}/5</span>
          )}
          {restaurantData.price && (
            <span className="restaurant-price">{restaurantData.price}</span>
          )}
          {restaurantData.location && (
            <span className="restaurant-location">📍 {restaurantData.location}</span>
          )}
        </div>
        <div className="restaurant-buttons">
          {restaurantData.link && (
            <a 
              href={restaurantData.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="view-more-link"
            >
              View Menu
            </a>
          )}
          {restaurantData.bookingLink && (
            <a 
              href={restaurantData.bookingLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="booking-link"
            >
              Reserve Table
            </a>
          )}
        </div>
      </div>
    );
  };
  
  const renderActivityImage = (activity) => {
    if (!activity || !activity.name) return null;
    
    // Try to find a matching Amadeus activity first
    const amadeusActivity = amadeusActivities.find(act => 
      act.name.toLowerCase().includes(activity.name.toLowerCase()) ||
      activity.name.toLowerCase().includes(act.name.toLowerCase())
    );
    
    // Fall back to static data if no Amadeus match
    const activityData = amadeusActivity || getActivityData(activity.name);
    
    return (
      <div className="activity-image-container">
        <img 
          src={activityData.image} 
          alt={activity.name} 
          className="activity-image"
        />
        <div className="activity-details-overlay">
          {activityData.location && (
            <span className="activity-location">📍 {activityData.location}</span>
          )}
          {activityData.duration && (
            <span className="activity-duration-info">⏱️ {activityData.duration}</span>
          )}
          {activityData.rating && (
            <span className="activity-rating">
              ⭐ {activityData.rating}/5</span>
          )}
          {activityData.availability && (
            <span className="activity-availability">🗓️ {activityData.availability}</span>
          )}
          {activityData.difficulty && (
            <span className="activity-difficulty">🔄 {activityData.difficulty}</span>
          )}
          {amadeusActivity && (
            <span className="amadeus-badge">Amadeus</span>
          )}
        </div>
        <div className="activity-buttons">
          {activityData.link && (
            <a 
              href={activityData.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="view-more-link"
            >
              View Details
            </a>
          )}
          {activityData.bookingLink && (
            <a 
              href={activityData.bookingLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="booking-link"
            >
              Book Now
            </a>
          )}
        </div>
      </div>
    );
  };

  // Extract destination from the first day's transportation or use a default
  const getDestination = () => {
    if (!tripPlan || !tripPlan.itinerary || tripPlan.itinerary.length === 0) return 'Uttarakhand';
    
    // Try to get destination from the first day's transportation
    const firstDay = tripPlan.itinerary[0];
    if (firstDay.transportation && firstDay.transportation.to) {
      return firstDay.transportation.to;
    }
    
    // If no specific destination found, return default
    return 'Uttarakhand';
  };

  return (
    <div className="trip-plan" style={getBackgroundStyle()}>
      <h2>Your {travelStyle} Trip to {getDestination()}</h2>
      
      {/* Total Cost Summary */}
      <div className="cost-summary">
        <h3>Trip Summary</h3>
        <p className="total-cost">Total Cost: {formatCurrency(tripPlan.totalCost || 0)}</p>
        <p>Duration: {tripPlan.itinerary.length} days</p>
      </div>

      {/* Recommendations */}
      {tripPlan.recommendations && (
        <div className="recommendations">
          <h3>Recommendations</h3>
          <div className="recommendations-content">
            {tripPlan.recommendations.whatToPack && (
              <div className="what-to-pack">
                <h4>What to Pack</h4>
                <ul>
                  {tripPlan.recommendations.whatToPack.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
            {tripPlan.recommendations.tips && (
              <div className="travel-tips">
                <h4>Travel Tips</h4>
                <ul>
                  {tripPlan.recommendations.tips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Daily Itinerary */}
      <div className="itinerary">
        <h3>Daily Itinerary</h3>
        {tripPlan.itinerary.map((day, index) => (
          <div key={index} className="day-plan">
            <h4 className="day-header">
              Day {day.day} - {formatDate(day.date)}
            </h4>
            
            {/* Activities */}
            <div className="activities">
              <h5>Activities</h5>
              {day.activities.map((activity, actIndex) => (
                <div key={actIndex} className="activity-card">
                  <div className="activity-content">
                    <div className="activity-details">
                      <div className="activity-header">
                        <span className="activity-time">{activity.time}</span>
                        <span className="activity-duration">{activity.duration}</span>
                      </div>
                      <h6>{activity.name}</h6>
                      <p>{activity.description}</p>
                      {renderLocation(activity.location)}
                      <p className="cost">Cost: {formatCurrency(activity.cost)}</p>
                    </div>
                    {renderActivityImage(activity)}
                  </div>
                </div>
              ))}
            </div>

            {/* Accommodation */}
            {day.accommodation && day.accommodation.name !== 'N/A' && (
              <div className="accommodation">
                <h5>Accommodation</h5>
                <div className="accommodation-card">
                  <div className="accommodation-content">
                    <div className="accommodation-details">
                      <h6>{day.accommodation.name}</h6>
                      <p>Location: {renderLocation(day.accommodation.location)}</p>
                      <p>Type: {day.accommodation.type}</p>
                      <p>Includes: {day.accommodation.includes.join(', ')}</p>
                      <p className="cost">Cost: {formatCurrency(day.accommodation.cost)}</p>
                    </div>
                    {renderAccommodationImage(day.accommodation)}
                  </div>
                </div>
              </div>
            )}

            {/* Meals */}
            {day.meals && day.meals.length > 0 && (
              <div className="meals">
                <h5>Meals</h5>
                <div className="meals-container">
                  {day.meals.map((meal, mealIndex) => (
                    <div key={mealIndex} className="meal-card">
                      <div className="meal-content">
                        <div className="meal-details">
                          <h6>{meal.type}</h6>
                          <p>Venue: {meal.venue}</p>
                          <p>Cuisine: {meal.cuisine}</p>
                          <p className="cost">Cost: {formatCurrency(meal.cost)}</p>
                        </div>
                        {renderRestaurantImage(meal)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Transportation */}
            {day.transportation && (
              <div className="transportation">
                <h5>Transportation</h5>
                <div className="transport-card">
                  <p>Mode: {day.transportation.mode}</p>
                  <p>From: {day.transportation.from}</p>
                  <p>To: {day.transportation.to}</p>
                  <p>Duration: {day.transportation.duration}</p>
                  <p className="cost">Cost: {formatCurrency(day.transportation.cost)}</p>
                </div>
              </div>
            )}

            <div className="daily-total">
              Daily Total: {formatCurrency(day.dailyTotal)}
            </div>
          </div>
        ))}
      </div>

      <div className="action-buttons">
        <button onClick={() => window.print()}>
          Export as PDF
        </button>
        <button onClick={() => {/* Add share functionality */}}>
          Share Trip Plan
        </button>
      </div>
    </div>
  );
};

export default TripPlanDisplay;