/**
 * Utility functions to convert Amadeus API data to the format expected by our application
 */

/**
 * Converts Amadeus flight data to our application format
 * @param {Array} flightData - Flight data from Amadeus API
 * @returns {Array} - Formatted flight data for our application
 */
export const convertFlightData = (flightData) => {
  if (!flightData || !Array.isArray(flightData)) return [];
  
  return flightData.map(flight => {
    const itinerary = flight.itineraries[0];
    const firstSegment = itinerary.segments[0];
    const lastSegment = itinerary.segments[itinerary.segments.length - 1];
    const price = flight.price ? flight.price.total : 'N/A';
    
    return {
      id: flight.id,
      airline: firstSegment.carrierCode,
      flightNumber: firstSegment.number,
      departureTime: firstSegment.departure.at,
      arrivalTime: lastSegment.arrival.at,
      duration: itinerary.duration,
      stops: itinerary.segments.length - 1,
      price: price,
      from: firstSegment.departure.iataCode,
      to: lastSegment.arrival.iataCode,
      bookingLink: `https://www.amadeus.com/en/portfolio/travel-agencies/flight-booking-system`,
      // Add a placeholder image
      image: `https://www.airport-technology.com/wp-content/uploads/sites/14/2020/05/airplane-2.jpg`
    };
  });
};

/**
 * Converts Amadeus hotel data to our application format
 * @param {Array} hotelData - Hotel data from Amadeus API
 * @returns {Array} - Formatted hotel data for our application
 */
export const convertHotelData = (hotelData) => {
  if (!hotelData || !Array.isArray(hotelData)) return [];
  
  return hotelData.map(hotel => {
    const offer = hotel.offers && hotel.offers.length > 0 ? hotel.offers[0] : {};
    const price = offer.price ? offer.price.total : 'N/A';
    const roomType = offer.room ? offer.room.typeEstimated.category : 'Standard';
    
    // Determine accommodation type based on hotel rating
    let accommodationType = 'budget';
    if (hotel.hotel && hotel.hotel.rating) {
      const rating = parseInt(hotel.hotel.rating);
      if (rating >= 4) {
        accommodationType = 'luxury';
      } else if (rating >= 3) {
        accommodationType = 'moderate';
      }
    }
    
    return {
      id: hotel.hotel ? hotel.hotel.hotelId : '',
      name: hotel.hotel ? hotel.hotel.name : 'Unknown Hotel',
      location: hotel.hotel && hotel.hotel.address ? 
        `${hotel.hotel.address.cityName}, ${hotel.hotel.address.countryCode}` : 'Unknown Location',
      type: accommodationType,
      price: price,
      rating: hotel.hotel && hotel.hotel.rating ? hotel.hotel.rating : '3',
      amenities: offer.room && offer.room.description ? [offer.room.description] : [],
      includes: [roomType, 'WiFi', 'Breakfast'],
      image: hotel.hotel && hotel.hotel.media && hotel.hotel.media.length > 0 ? 
        hotel.hotel.media[0].uri : 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/d3/c0/a5/the-naini-retreat.jpg',
      bookingLink: `https://www.amadeus.com/en/portfolio/travel-agencies/hotel-booking-system`,
      cost: parseFloat(price) || 5000
    };
  });
};

/**
 * Converts Amadeus activity data to our application format
 * @param {Array} activityData - Activity data from Amadeus API
 * @returns {Array} - Formatted activity data for our application
 */
export const convertActivityData = (activityData) => {
  if (!activityData || !Array.isArray(activityData)) return [];
  
  return activityData.map(activity => {
    const price = activity.price ? activity.price.amount : 'N/A';
    
    // Determine difficulty based on activity category
    let difficulty = 'Easy';
    if (activity.categories && activity.categories.length > 0) {
      const category = activity.categories[0].name.toLowerCase();
      if (category.includes('adventure') || category.includes('sport')) {
        difficulty = 'Moderate';
      } else if (category.includes('extreme')) {
        difficulty = 'Difficult';
      }
    }
    
    return {
      id: activity.id,
      name: activity.name,
      description: activity.shortDescription || activity.description || '',
      location: activity.geoCode ? 
        `${activity.geoCode.latitude}, ${activity.geoCode.longitude}` : 'Unknown Location',
      price: `₹${Math.round(parseFloat(price) * 83)}`, // Convert to INR (approximate)
      duration: activity.duration || '2 hours',
      rating: activity.rating || '4.5',
      bookingLink: activity.bookingLink || `https://www.amadeus.com/en/portfolio/travel-agencies/destination-content`,
      availability: activity.bookableDateRange || 'Daily',
      difficulty: difficulty,
      inclusions: ["Guide", "Entry Fees", "Transportation"],
      image: activity.pictures && activity.pictures.length > 0 ? 
        activity.pictures[0] : 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/3c/5e/26/valley-of-flowers-trek.jpg',
      cost: Math.round(parseFloat(price) * 83) || 1500 // Convert to INR (approximate)
    };
  });
};

/**
 * Converts Amadeus point of interest data to our application format
 * @param {Array} poiData - Point of interest data from Amadeus API
 * @returns {Array} - Formatted POI data for our application
 */
export const convertPointsOfInterestData = (poiData) => {
  if (!poiData || !Array.isArray(poiData)) return [];
  
  return poiData.map(poi => {
    return {
      id: poi.id,
      name: poi.name,
      description: poi.description ? poi.description.text : '',
      location: poi.geoCode ? 
        `${poi.geoCode.latitude}, ${poi.geoCode.longitude}` : 'Unknown Location',
      category: poi.category,
      tags: poi.tags || [],
      image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/3c/5e/26/valley-of-flowers-trek.jpg', // Placeholder
      rating: '4.0',
      cost: 0 // Most POIs are free to visit
    };
  });
};