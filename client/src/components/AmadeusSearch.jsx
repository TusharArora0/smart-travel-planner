import React, { useState, useEffect } from 'react';
import amadeusService from '../utils/amadeusService';
import { convertFlightData, convertHotelData, convertActivityData } from '../utils/amadeusDataAdapter';
import '../styles/AmadeusSearch.css';

const AmadeusSearch = ({ onSelectFlight, onSelectHotel, onSelectActivity }) => {
  const [searchType, setSearchType] = useState('flights');
  const [searchParams, setSearchParams] = useState({
    // Flight params
    originCode: '',
    destinationCode: '',
    departureDate: '',
    adults: 1,
    
    // Hotel params
    cityCode: '',
    checkInDate: '',
    checkOutDate: '',
    
    // Activity params
    latitude: '',
    longitude: '',
    radius: 20
  });
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Common Uttarakhand destinations with their IATA codes and coordinates
  const destinations = [
    { name: 'Dehradun', iataCode: 'DED', cityCode: 'DED', lat: 30.3165, lng: 78.0322 },
    { name: 'Delhi (Nearest Major Airport)', iataCode: 'DEL', cityCode: 'DEL', lat: 28.5562, lng: 77.1000 },
    { name: 'Rishikesh', cityCode: 'DED', lat: 30.0869, lng: 78.2676 },
    { name: 'Nainital', cityCode: 'DED', lat: 29.3919, lng: 79.4542 },
    { name: 'Mussoorie', cityCode: 'DED', lat: 30.4598, lng: 78.0644 },
    { name: 'Haridwar', cityCode: 'DED', lat: 29.9457, lng: 78.1642 },
    { name: 'Auli', cityCode: 'DED', lat: 30.5427, lng: 79.5644 }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDestinationSelect = (e) => {
    const selectedDestination = destinations.find(dest => dest.name === e.target.value);
    if (selectedDestination) {
      if (searchType === 'flights') {
        setSearchParams(prev => ({
          ...prev,
          destinationCode: selectedDestination.iataCode
        }));
      } else if (searchType === 'hotels') {
        setSearchParams(prev => ({
          ...prev,
          cityCode: selectedDestination.cityCode
        }));
      } else if (searchType === 'activities') {
        setSearchParams(prev => ({
          ...prev,
          latitude: selectedDestination.lat,
          longitude: selectedDestination.lng
        }));
      }
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      let results = [];
      
      if (searchType === 'flights') {
        const flightData = await amadeusService.searchFlights(
          searchParams.originCode,
          searchParams.destinationCode,
          searchParams.departureDate,
          searchParams.adults
        );
        results = convertFlightData(flightData);
      } else if (searchType === 'hotels') {
        const hotelData = await amadeusService.searchHotels(
          searchParams.cityCode,
          searchParams.checkInDate,
          searchParams.checkOutDate,
          searchParams.adults
        );
        results = convertHotelData(hotelData);
      } else if (searchType === 'activities') {
        const activityData = await amadeusService.searchActivities(
          searchParams.latitude,
          searchParams.longitude,
          searchParams.radius
        );
        results = convertActivityData(activityData);
      }
      
      setSearchResults(results);
    } catch (error) {
      console.error('Search error:', error);
      setError('Failed to fetch results. Please check your search parameters and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (item) => {
    if (searchType === 'flights' && onSelectFlight) {
      onSelectFlight(item);
    } else if (searchType === 'hotels' && onSelectHotel) {
      onSelectHotel(item);
    } else if (searchType === 'activities' && onSelectActivity) {
      onSelectActivity(item);
    }
  };

  const renderSearchForm = () => {
    switch (searchType) {
      case 'flights':
        return (
          <div className="search-form-fields">
            <div className="form-group">
              <label>Origin (IATA Code)</label>
              <input
                type="text"
                name="originCode"
                placeholder="e.g., DEL for Delhi"
                value={searchParams.originCode}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Destination</label>
              <select onChange={handleDestinationSelect} required>
                <option value="">Select Destination</option>
                {destinations.map(dest => (
                  <option key={dest.name} value={dest.name}>{dest.name}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label>Departure Date</label>
              <input
                type="date"
                name="departureDate"
                value={searchParams.departureDate}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Number of Passengers</label>
              <input
                type="number"
                name="adults"
                min="1"
                max="9"
                value={searchParams.adults}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        );
        
      case 'hotels':
        return (
          <div className="search-form-fields">
            <div className="form-group">
              <label>Destination</label>
              <select onChange={handleDestinationSelect} required>
                <option value="">Select Destination</option>
                {destinations.map(dest => (
                  <option key={dest.name} value={dest.name}>{dest.name}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label>Check-in Date</label>
              <input
                type="date"
                name="checkInDate"
                value={searchParams.checkInDate}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Check-out Date</label>
              <input
                type="date"
                name="checkOutDate"
                value={searchParams.checkOutDate}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Number of Guests</label>
              <input
                type="number"
                name="adults"
                min="1"
                max="9"
                value={searchParams.adults}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        );
        
      case 'activities':
        return (
          <div className="search-form-fields">
            <div className="form-group">
              <label>Destination</label>
              <select onChange={handleDestinationSelect} required>
                <option value="">Select Destination</option>
                {destinations.map(dest => (
                  <option key={dest.name} value={dest.name}>{dest.name}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label>Search Radius (km)</label>
              <input
                type="number"
                name="radius"
                min="1"
                max="100"
                value={searchParams.radius}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  const renderSearchResults = () => {
    if (loading) {
      return <div className="loading">Loading results...</div>;
    }
    
    if (error) {
      return <div className="error">{error}</div>;
    }
    
    if (searchResults.length === 0) {
      return <div className="no-results">No results found. Try adjusting your search parameters.</div>;
    }
    
    switch (searchType) {
      case 'flights':
        return (
          <div className="search-results-list">
            {searchResults.map((flight, index) => (
              <div key={index} className="result-card flight-card" onClick={() => handleSelect(flight)}>
                <div className="result-image">
                  <img src={flight.image} alt={`${flight.airline} flight`} />
                </div>
                <div className="result-details">
                  <h3>{flight.airline} {flight.flightNumber}</h3>
                  <p><strong>From:</strong> {flight.from} <strong>To:</strong> {flight.to}</p>
                  <p><strong>Departure:</strong> {new Date(flight.departureTime).toLocaleString()}</p>
                  <p><strong>Arrival:</strong> {new Date(flight.arrivalTime).toLocaleString()}</p>
                  <p><strong>Duration:</strong> {flight.duration}</p>
                  <p><strong>Stops:</strong> {flight.stops}</p>
                  <p className="price">₹{Math.round(parseFloat(flight.price) * 83)}</p>
                </div>
                <button className="select-button">Select</button>
              </div>
            ))}
          </div>
        );
        
      case 'hotels':
        return (
          <div className="search-results-list">
            {searchResults.map((hotel, index) => (
              <div key={index} className="result-card hotel-card" onClick={() => handleSelect(hotel)}>
                <div className="result-image">
                  <img src={hotel.image} alt={hotel.name} />
                </div>
                <div className="result-details">
                  <h3>{hotel.name}</h3>
                  <p><strong>Location:</strong> {hotel.location}</p>
                  <p><strong>Type:</strong> {hotel.type}</p>
                  <p><strong>Rating:</strong> {hotel.rating}/5</p>
                  <p><strong>Amenities:</strong> {hotel.includes.join(', ')}</p>
                  <p className="price">₹{Math.round(parseFloat(hotel.price) * 83)} per night</p>
                </div>
                <button className="select-button">Select</button>
              </div>
            ))}
          </div>
        );
        
      case 'activities':
        return (
          <div className="search-results-list">
            {searchResults.map((activity, index) => (
              <div key={index} className="result-card activity-card" onClick={() => handleSelect(activity)}>
                <div className="result-image">
                  <img src={activity.image} alt={activity.name} />
                </div>
                <div className="result-details">
                  <h3>{activity.name}</h3>
                  <p>{activity.description}</p>
                  <p><strong>Location:</strong> {activity.location}</p>
                  <p><strong>Duration:</strong> {activity.duration}</p>
                  <p><strong>Rating:</strong> {activity.rating}/5</p>
                  <p><strong>Difficulty:</strong> {activity.difficulty}</p>
                  <p className="price">{activity.price}</p>
                </div>
                <button className="select-button">Select</button>
              </div>
            ))}
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="amadeus-search">
      <h2>Search Travel Options</h2>
      
      <div className="search-type-tabs">
        <button 
          className={searchType === 'flights' ? 'active' : ''}
          onClick={() => setSearchType('flights')}
        >
          Flights
        </button>
        <button 
          className={searchType === 'hotels' ? 'active' : ''}
          onClick={() => setSearchType('hotels')}
        >
          Hotels
        </button>
        <button 
          className={searchType === 'activities' ? 'active' : ''}
          onClick={() => setSearchType('activities')}
        >
          Activities
        </button>
      </div>
      
      <form onSubmit={handleSearch} className="search-form">
        {renderSearchForm()}
        
        <button type="submit" className="search-button" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>
      
      <div className="search-results">
        {renderSearchResults()}
      </div>
    </div>
  );
};

export default AmadeusSearch;