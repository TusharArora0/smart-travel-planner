import Amadeus from 'amadeus';

class AmadeusService {
  constructor() {
    // Initialize the Amadeus SDK with API credentials
    this.amadeus = new Amadeus({
      clientId: process.env.REACT_APP_AMADEUS_CLIENT_ID,
      clientSecret: process.env.REACT_APP_AMADEUS_CLIENT_SECRET
    });
  }

  // Search for flights
  async searchFlights(originCode, destinationCode, departureDate, adults = 1) {
    try {
      const response = await this.amadeus.shopping.flightOffersSearch.get({
        originLocationCode: originCode,
        destinationLocationCode: destinationCode,
        departureDate: departureDate,
        adults: adults,
        max: 5
      });
      
      return response.data;
    } catch (error) {
      console.error('Error searching flights:', error);
      throw error;
    }
  }

  // Search for hotels
  async searchHotels(cityCode, checkInDate, checkOutDate, adults = 1) {
    try {
      const response = await this.amadeus.shopping.hotelOffers.get({
        cityCode: cityCode,
        checkInDate: checkInDate,
        checkOutDate: checkOutDate,
        adults: adults,
        radius: 50,
        radiusUnit: 'KM',
        includeClosed: false,
        bestRateOnly: true,
        view: 'FULL',
        sort: 'PRICE'
      });
      
      return response.data;
    } catch (error) {
      console.error('Error searching hotels:', error);
      throw error;
    }
  }

  // Get hotel details
  async getHotelDetails(hotelId) {
    try {
      const response = await this.amadeus.shopping.hotelOffersByHotel.get({
        hotelId: hotelId
      });
      
      return response.data;
    } catch (error) {
      console.error('Error getting hotel details:', error);
      throw error;
    }
  }

  // Search for activities/points of interest
  async searchActivities(latitude, longitude, radius = 20) {
    try {
      const response = await this.amadeus.shopping.activities.get({
        latitude: latitude,
        longitude: longitude,
        radius: radius
      });
      
      return response.data;
    } catch (error) {
      console.error('Error searching activities:', error);
      throw error;
    }
  }

  // Get activity details
  async getActivityDetails(activityId) {
    try {
      const response = await this.amadeus.shopping.activity(activityId).get();
      return response.data;
    } catch (error) {
      console.error('Error getting activity details:', error);
      throw error;
    }
  }

  // Search for points of interest
  async searchPointsOfInterest(latitude, longitude, radius = 20) {
    try {
      const response = await this.amadeus.referenceData.locations.pointsOfInterest.get({
        latitude: latitude,
        longitude: longitude,
        radius: radius
      });
      
      return response.data;
    } catch (error) {
      console.error('Error searching points of interest:', error);
      throw error;
    }
  }

  // Get city information
  async getCityInfo(cityCode) {
    try {
      const response = await this.amadeus.referenceData.locations.get({
        keyword: cityCode,
        subType: 'CITY'
      });
      
      return response.data;
    } catch (error) {
      console.error('Error getting city info:', error);
      throw error;
    }
  }
}

// Create a singleton instance
const amadeusService = new AmadeusService();
export default amadeusService;