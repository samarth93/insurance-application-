import React, { useEffect, useState } from 'react';
import { FaMapMarkerAlt, FaStar, FaMotorcycle } from 'react-icons/fa';
import './RepairShopMap.css';

const RepairShopMap = ({ shops }) => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [activeInfoWindow, setActiveInfoWindow] = useState(null);
  const [userPosition, setUserPosition] = useState(null);

  // Initialize Google Maps
  useEffect(() => {
    // Check if Google Maps API is already loaded
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => setMapLoaded(true);
      document.head.appendChild(script);
      return () => {
        document.head.removeChild(script);
      };
    } else {
      setMapLoaded(true);
    }
  }, []);

  // Get user position
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting user location:", error);
          // Default to a central location if user location is not available
          setUserPosition({
            lat: 40.7128, // New York coordinates as default
            lng: -74.0060
          });
        }
      );
    }
  }, []);

  // Initialize map when Google Maps is loaded and user position is available
  useEffect(() => {
    if (mapLoaded && window.google && userPosition) {
      const mapOptions = {
        center: userPosition,
        zoom: 12,
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
      };
      
      const newMap = new window.google.maps.Map(
        document.getElementById('repair-shop-map'),
        mapOptions
      );
      
      // Add user marker
      new window.google.maps.Marker({
        position: userPosition,
        map: newMap,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: "#4285F4",
          fillOpacity: 1,
          strokeColor: "#FFFFFF",
          strokeWeight: 2,
        },
        title: "Your Location"
      });
      
      setMap(newMap);
    }
  }, [mapLoaded, userPosition]);

  // Add shop markers when map is initialized
  useEffect(() => {
    if (map && shops.length > 0) {
      // Clear existing markers
      markers.forEach(marker => marker.setMap(null));
      const newMarkers = [];
      
      // Add markers for each repair shop
      shops.forEach(shop => {
        // Check if shop has coordinates
        if (shop.latitude && shop.longitude) {
          const position = {
            lat: shop.latitude,
            lng: shop.longitude
          };
          
          // Create info window content
          const contentString = `
            <div class="map-info-window">
              <h3>${shop.name}</h3>
              <div class="info-rating">
                <span class="star">★</span> ${shop.rating} (${shop.reviewCount} reviews)
              </div>
              <div class="info-address">${shop.address}</div>
              <div class="info-distance">${shop.distance} miles away</div>
              <div class="info-status ${shop.isOpen ? 'open' : 'closed'}">
                ${shop.isOpen ? 'Open Now' : 'Closed'}
              </div>
              <div class="info-specialties">
                ${shop.specialties && shop.specialties.length > 0 
                  ? 'Specializes in: ' + shop.specialties.slice(0, 2).join(', ') + 
                    (shop.specialties.length > 2 ? '...' : '')
                  : ''}
              </div>
              <button class="info-button" onclick="window.open('https://www.google.com/maps/dir/?api=1&destination=${position.lat},${position.lng}&destination_place_id=${encodeURIComponent(shop.name + ' ' + shop.address)}', '_blank')">
                Get Directions
              </button>
            </div>
          `;
          
          // Create info window
          const infoWindow = new window.google.maps.InfoWindow({
            content: contentString,
            maxWidth: 250
          });
          
          // Create marker
          const marker = new window.google.maps.Marker({
            position: position,
            map: map,
            title: shop.name,
            icon: {
              url: shop.isInNetwork 
                ? 'https://maps.google.com/mapfiles/ms/icons/green-dot.png' 
                : 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
            }
          });
          
          // Add click event for marker
          marker.addListener('click', () => {
            // Close previously opened info window
            if (activeInfoWindow) {
              activeInfoWindow.close();
            }
            
            infoWindow.open({
              anchor: marker,
              map: map
            });
            
            setActiveInfoWindow(infoWindow);
          });
          
          newMarkers.push(marker);
        }
      });
      
      setMarkers(newMarkers);
      
      // Fit map to markers
      if (newMarkers.length > 0) {
        const bounds = new window.google.maps.LatLngBounds();
        
        // Add user position to bounds
        bounds.extend(userPosition);
        
        // Add all shop markers to bounds
        newMarkers.forEach(marker => {
          bounds.extend(marker.getPosition());
        });
        
        map.fitBounds(bounds);
      }
    }
  }, [map, shops]);

  if (shops.length === 0) {
    return (
      <div className="no-results">
        <p>No repair shops found matching your criteria.</p>
        <p>Try adjusting your filters or search query.</p>
      </div>
    );
  }

  return (
    <div className="repair-shop-map-container">
      {!mapLoaded && <div className="map-loading">Loading map...</div>}
      <div 
        id="repair-shop-map" 
        className="repair-shop-map"
        style={{ display: mapLoaded ? 'block' : 'none' }}
      ></div>
      <div className="map-legend">
        <div className="legend-item">
          <div className="legend-icon network"></div>
          <span>In-Network Shop</span>
        </div>
        <div className="legend-item">
          <div className="legend-icon out-network"></div>
          <span>Out-of-Network Shop</span>
        </div>
        <div className="legend-item">
          <div className="legend-icon user"></div>
          <span>Your Location</span>
        </div>
      </div>
    </div>
  );
};

export default RepairShopMap; 
 