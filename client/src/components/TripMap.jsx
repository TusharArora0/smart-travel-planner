import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import '../styles/TripMap.css';

// Fix Leaflet default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const TripMap = ({ destinations }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  
  const mapRef = useRef(null);
  
  const mapStyles = {
    height: "75vh",
    width: "100%"
  };

  const defaultCenter = {
    lat: 30.0668,  // Uttarakhand center coordinates
    lng: 79.0193
  };

  const locations = [
    { name: "Kedarnath", lat: 30.7346, lng: 79.0669, description: "One of the holiest Hindu temples dedicated to Lord Shiva", bestTime: "May-June, September-October" },
    { name: "Rishikesh", lat: 30.0869, lng: 78.2676, description: "Yoga Capital of the World & Adventure Sports Hub", bestTime: "Throughout the year" },
    { name: "Nainital", lat: 29.3919, lng: 79.4542, description: "Beautiful lake city surrounded by mountains", bestTime: "March-June, September-November" },
    { name: "Mussoorie", lat: 30.4598, lng: 78.0644, description: "Queen of Hills - Famous hill station with scenic beauty", bestTime: "March-June, September-November" },
    { name: "Auli", lat: 30.5302, lng: 79.5663, description: "Popular Ski Resort & Adventure Sports Destination", bestTime: "November-March" },
    { name: "Valley of Flowers", lat: 30.7283, lng: 79.6050, description: "UNESCO World Heritage Site known for its meadows of endemic alpine flowers", bestTime: "July-September" },
    { name: "Haridwar", lat: 29.9457, lng: 78.1642, description: "Holy city where the Ganges exits the Himalayan foothills", bestTime: "February-March, September-October" },
    { name: "Jim Corbett National Park", lat: 29.5300, lng: 78.7747, description: "Oldest national park in India known for Bengal tigers", bestTime: "November-June" },
    { name: "Dehradun", lat: 30.3165, lng: 78.0322, description: "Capital city of Uttarakhand with pleasant climate", bestTime: "March-June, September-November" },
    { name: "Badrinath", lat: 30.7433, lng: 79.4938, description: "Important Hindu pilgrimage site dedicated to Lord Vishnu", bestTime: "May-June, September-October" }
  ];

  return (
    <div className="trip-map-container">
      <h2>Explore Destinations</h2>
      <div className="leaflet-container" style={mapStyles}>
        <MapContainer 
          center={defaultCenter} 
          zoom={8} 
          style={mapStyles} 
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {locations.map((location, index) => (
            <Marker 
              key={index} 
              position={[location.lat, location.lng]}
              eventHandlers={{
                click: () => {
                  setSelectedLocation(location);
                },
              }}
            >
              {selectedLocation && selectedLocation.name === location.name && (
                <Popup onClose={() => setSelectedLocation(null)}>
                  <div className="info-window-content">
                    <h3>{selectedLocation.name}</h3>
                    <p>{selectedLocation.description}</p>
                    <p><strong>Best time to visit:</strong> {selectedLocation.bestTime}</p>
                    <button 
                      onClick={() => window.open(`https://www.openstreetmap.org/?mlat=${selectedLocation.lat}&mlon=${selectedLocation.lng}#map=15/${selectedLocation.lat}/${selectedLocation.lng}`, '_blank')}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        marginTop: '8px'
                      }}
                    >
                      View on OpenStreetMap
                    </button>
                  </div>
                </Popup>
              )}
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default TripMap;