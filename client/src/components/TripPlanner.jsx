import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { GoogleGenerativeAI } from '@google/generative-ai';
import axiosInstance from '../utils/axiosConfig';
import TripPlanDisplay from './TripPlanDisplay';
import TripMap from './TripMap';
import WeatherForecast from './WeatherForecast';
import AmadeusSearch from './AmadeusSearch';
import '../styles/TripPlanner.css';
import '../styles/PlannerLayout.css';

const TripPlanner = ({ preselectedDestination = '', onPlanGenerated = () => {} }) => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    startingPoint: '',
    numberOfPeople: '1',
    duration: '',
    startDate: '',
    accommodation: 'moderate',
    travelStyle: 'adventure',
    destination: preselectedDestination || ''
  });
  
  // Update form when preselectedDestination changes
  useEffect(() => {
    if (preselectedDestination) {
      setFormData(prev => ({
        ...prev,
        destination: preselectedDestination
      }));
    }
  }, [preselectedDestination]);
  const [loading, setLoading] = useState(false);
  const [tripPlan, setTripPlan] = useState(null);
  const [apiError, setApiError] = useState(null);
  const [genAI, setGenAI] = useState(null);

  // Initialize Gemini AI
  useEffect(() => {
    try {
      const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
      if (apiKey) {
        const ai = new GoogleGenerativeAI(apiKey);
        setGenAI(ai);
        setApiError(null);
      } else {
        setApiError('Gemini API key not found');
      }
    } catch (error) {
      console.error('Error initializing Gemini AI:', error);
      setApiError('Failed to initialize Gemini AI');
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    
    // Handle number inputs
    if (type === 'number') {
      // Ensure empty or invalid inputs become empty strings, not NaN
      const numberValue = value === '' ? '' : Math.max(1, parseInt(value) || 1);
      setFormData(prev => ({
        ...prev,
        [name]: numberValue.toString() // Store as string to avoid NaN
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const cleanJsonResponse = (responseText) => {
    let jsonText = '';
    try {
      // Extract JSON content
      if (responseText.includes('```')) {
        const matches = responseText.match(/```(?:json)?\s*([\s\S]*?)(?:```|$)/i);
        if (matches && matches[1]) {
          jsonText = matches[1].trim();
        }
      } else {
        jsonText = responseText.trim();
      }

      // Basic cleanup
      jsonText = jsonText
        .replace(/[\r\n\t]/g, ' ')
        .replace(/\s{2,}/g, ' ')
        .replace(/,\s*([}\]])/g, '$1')
        .replace(/([{,])\s*'([^']+)'\s*:/g, '$1"$2":')
        .replace(/:\s*'([^']+)'/g, ':"$1"')
        .replace(/([{,])\s*([a-zA-Z0-9_]+)\s*:/g, '$1"$2":')
        .replace(/\\/g, '')
        .replace(/"\s+"/g, '" "')
        .replace(/\]\s*\[/g, '],[')
        .replace(/}\s*{/g, '},{')
        .replace(/\}\s*\]/g, '}]')
        .replace(/\[\s*\{/g, '[{')
        .replace(/\s*\([^)]*\)/g, '')
        .replace(/₹[\d,]+/g, '')
        .replace(/:\s*N\/A\b/g, ':null')
        .replace(/:\s*undefined\b/g, ':null')
        .replace(/:\s*""/g, ':null')
        .replace(/\s*free\s*/gi, '0')
        .replace(/,\s*([}\]])/g, '$1')
        .replace(/([}\]])\s*,\s*$/g, '$1');

      // Find complete JSON object
      const jsonMatch = jsonText.match(/{[\s\S]*}/);
      if (!jsonMatch) {
        throw new Error('No valid JSON object found');
      }

      // Try parsing
      const parsed = JSON.parse(jsonMatch[0]);
      
      // Validate structure
      if (!parsed.itinerary || !Array.isArray(parsed.itinerary)) {
        throw new Error('Missing or invalid itinerary array');
      }

      return parsed;
    } catch (error) {
      console.error('JSON cleaning error:', error);
      console.error('Original text:', responseText);
      console.error('Cleaned text:', jsonText);
      throw new Error(`Failed to clean JSON response: ${error.message}`);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setApiError(null);

      // Generate plan directly from form data
      const generatedPlan = await generateAIPlan(formData);
      setTripPlan(generatedPlan);
      
      // Call the callback with the generated plan
      if (onPlanGenerated && typeof onPlanGenerated === 'function') {
        onPlanGenerated(generatedPlan);
      }

    } catch (error) {
      console.error('Error:', error);
      setApiError(error.message || 'Failed to create trip plan');
    } finally {
      setLoading(false);
    }
  };

  const generateAIPlan = async (formInputs) => {
    if (!genAI) {
      throw new Error('Gemini AI not initialized');
    }

    // Calculate daily budget based on accommodation preference and number of people
    let dailyBudget;
    switch (formInputs.accommodation) {
      case 'budget':
        dailyBudget = 3000 * parseInt(formInputs.numberOfPeople);
        break;
      case 'moderate':
        dailyBudget = 7000 * parseInt(formInputs.numberOfPeople);
        break;
      case 'luxury':
        dailyBudget = 12000 * parseInt(formInputs.numberOfPeople);
        break;
      default:
        dailyBudget = 7000 * parseInt(formInputs.numberOfPeople);
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    
    const prompt = `Create a ${formInputs.duration}-day trip plan ${formInputs.destination ? `specifically for ${formInputs.destination}` : 'for Uttarakhand'} starting from ${formInputs.startingPoint}.

      Trip Details:
      - Starting City: ${formInputs.startingPoint}
      - Number of Travelers: ${formInputs.numberOfPeople}
      - Daily Budget: ₹${dailyBudget}
      - Start Date: ${formInputs.startDate}
      - Travel Style: ${formInputs.travelStyle}
      - Accommodation: ${formInputs.accommodation}

      Rules:
      1. Start journey from ${formInputs.startingPoint}
      2. Include travel from ${formInputs.startingPoint} on first day
      3. All costs are total for ${formInputs.numberOfPeople} people
      4. Stay within ₹${dailyBudget} per day
      5. Focus on ${formInputs.travelStyle} activities
      6. Use ${formInputs.accommodation} level stays
      7. Use realistic travel times
      8. Include actual transport options
      9. Add local experiences
      10. Consider weather for ${formInputs.startDate}

      Return ONLY a complete, valid JSON object with this exact structure (no trailing commas):
      {
        "itinerary": [
          {
            "day": 1,
            "date": "${formInputs.startDate}",
            "activities": [
              {
                "name": "string",
                "time": "HH:MM",
                "duration": "string",
                "description": "string",
                "cost": 0
              }
            ],
            "accommodation": {
              "name": "string",
              "location": "string",
              "type": "${formInputs.accommodation}",
              "cost": 0,
              "includes": ["string"]
            },
            "meals": [
              {
                "type": "string",
                "venue": "string",
                "cuisine": "string",
                "cost": 0
              }
            ],
            "transportation": {
              "mode": "string",
              "from": "${formInputs.startingPoint}",
              "to": "string",
              "duration": "string",
              "cost": 0
            },
            "dailyTotal": 0
          }
        ],
        "totalCost": 0,
        "recommendations": {
          "whatToPack": ["string"],
          "tips": ["string"]
        }
      }`;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Log the response for debugging
      console.log('AI Response:', text);
      
      return cleanJsonResponse(text);
    } catch (error) {
      console.error('AI generation error:', error);
      throw new Error('Failed to generate valid trip plan');
    }
  };

  return (
    <div className={`trip-planner ${theme}`}>
      {apiError && (
        <div className="error-message">
          <p>Error: {apiError}</p>
          <p>Please check your API configuration</p>
        </div>
      )}
      <div className="planner-container">
        {loading && (
          <div className="loading-overlay">
            <div className="loading-spinner"></div>
            <p>Generating your personalized trip plan...</p>
          </div>
        )}
        <h1>Plan Your Uttarakhand Adventure</h1>
        
        <div className="planner-layout">
          <div className="planner-form-container">
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label>Destination</label>
                <input
                  type="text"
                  name="destination"
                  placeholder="e.g., Kedarnath, Rishikesh"
                  value={formData.destination}
                  onChange={handleInputChange}
                  readOnly={!!preselectedDestination}
                />
              </div>
              
              <div className="form-group">
                <label>Starting Point</label>
                <input
                  type="text"
                  name="startingPoint"
                  placeholder="e.g., Delhi, Mumbai"
                  value={formData.startingPoint}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Number of People</label>
                <input
                  type="number"
                  name="numberOfPeople"
                  min="1"
                  value={formData.numberOfPeople}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Duration (in days)</label>
                <input
                  type="number"
                  name="duration"
                  min="1"
                  value={formData.duration}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Accommodation Preference</label>
                <select
                  name="accommodation"
                  value={formData.accommodation}
                  onChange={handleInputChange}
                >
                  <option value="budget">Budget (₹1000-3000/night)</option>
                  <option value="moderate">Moderate (₹3000-7000/night)</option>
                  <option value="luxury">Luxury (₹7000+/night)</option>
                </select>
              </div>

              <div className="form-group">
                <label>Travel Style</label>
                <select
                  name="travelStyle"
                  value={formData.travelStyle}
                  onChange={handleInputChange}
                >
                  <option value="adventure">Adventure</option>
                  <option value="relaxed">Relaxed</option>
                  <option value="cultural">Cultural</option>
                </select>
              </div>

              <button type="submit" disabled={loading}>
                {loading ? 'Generating Plan...' : 'Generate Trip Plan'}
              </button>
            </form>
          </div>
          
          <div className="planner-widgets">
            <div className="widget-map">
              <TripMap />
            </div>
            <div className="widget-weather">
              <WeatherForecast />
            </div>
            <div className="widget-amadeus">
              <AmadeusSearch 
                onSelectFlight={(flight) => {
                  // Update transportation in the form data
                  const updatedFormData = {...formData};
                  // We'll use this data when generating the trip plan
                  console.log('Selected flight:', flight);
                }}
                onSelectHotel={(hotel) => {
                  // Update accommodation preference based on selected hotel
                  const updatedFormData = {...formData, accommodation: hotel.type};
                  setFormData(updatedFormData);
                  console.log('Selected hotel:', hotel);
                }}
                onSelectActivity={(activity) => {
                  // Update travel style based on selected activity
                  console.log('Selected activity:', activity);
                }}
              />
            </div>
          </div>
        </div>

        {tripPlan && (
          <div className="modal-overlay">
            <div className="modal-content">
              <button className="close-button" onClick={() => setTripPlan(null)}>×</button>
              <TripPlanDisplay tripPlan={tripPlan} travelStyle={formData.travelStyle} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TripPlanner;