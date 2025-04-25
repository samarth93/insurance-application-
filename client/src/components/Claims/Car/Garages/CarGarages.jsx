import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaStar, FaPhone, FaList, FaMapMarked, FaFilter, FaSearch } from 'react-icons/fa';
import { carGarages } from '../../../../data/carGarages';
import GarageList from './GarageList';
import GarageMap from './GarageMap';
import './CarGarages.css';

const CarGarages = () => {
  const [garages, setGarages] = useState([]);
  const [filteredGarages, setFilteredGarages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState('list');
  const [filters, setFilters] = useState({
    distance: 10,
    inNetworkOnly: false,
    openNow: false,
    searchQuery: '',
  });

  useEffect(() => {
    // In a real app, this would be an API call
    setGarages(carGarages);
    setFilteredGarages(carGarages);
    setLoading(false);
  }, []);

  useEffect(() => {
    // Apply filters
    let results = [...garages];
    
    // Filter by distance
    results = results.filter(garage => garage.distance <= filters.distance);
    
    // Filter in-network only
    if (filters.inNetworkOnly) {
      results = results.filter(garage => garage.isInNetwork);
    }
    
    // Filter open now
    if (filters.openNow) {
      results = results.filter(garage => garage.isOpen);
    }
    
    // Filter by search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      results = results.filter(
        garage => 
          garage.name.toLowerCase().includes(query) || 
          garage.address.toLowerCase().includes(query) ||
          garage.services.some(service => service.toLowerCase().includes(query)) ||
          garage.specialties.some(specialty => specialty.toLowerCase().includes(query))
      );
    }
    
    setFilteredGarages(results);
  }, [filters, garages]);

  const handleSearchChange = (e) => {
    setFilters({
      ...filters,
      searchQuery: e.target.value
    });
  };

  const handleToggleFilter = (filterName) => {
    setFilters({
      ...filters,
      [filterName]: !filters[filterName]
    });
  };

  const handleDistanceChange = (e) => {
    setFilters({
      ...filters,
      distance: parseFloat(e.target.value)
    });
  };

  const toggleView = (view) => {
    setActiveView(view);
  };

  if (loading) {
    return <div className="loading-container">Loading garages...</div>;
  }

  return (
    <div className="car-garages-container">
      <div className="garage-header">
        <h1>Find Approved Car Garages</h1>
        <p>Locate preferred repair facilities in your area</p>
      </div>

      <div className="view-toggle">
        <button 
          className={`toggle-btn ${activeView === 'list' ? 'active' : ''}`}
          onClick={() => toggleView('list')}
        >
          List View
        </button>
        <button 
          className={`toggle-btn ${activeView === 'map' ? 'active' : ''}`}
          onClick={() => toggleView('map')}
        >
          Map View
        </button>
      </div>

      <div className="garage-filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by name, address, or service..."
            value={filters.searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        
        <div className="filter-options">
          <div className="filter-group">
            <label>Distance: {filters.distance} miles</label>
            <input
              type="range"
              min="1"
              max="20"
              step="1"
              value={filters.distance}
              onChange={handleDistanceChange}
            />
          </div>
          
          <div className="filter-checkbox">
            <input
              type="checkbox"
              id="inNetworkOnly"
              checked={filters.inNetworkOnly}
              onChange={() => handleToggleFilter('inNetworkOnly')}
            />
            <label htmlFor="inNetworkOnly">In-Network Only</label>
          </div>
          
          <div className="filter-checkbox">
            <input
              type="checkbox"
              id="openNow"
              checked={filters.openNow}
              onChange={() => handleToggleFilter('openNow')}
            />
            <label htmlFor="openNow">Open Now</label>
          </div>
        </div>
      </div>

      <div className="results-count">
        Found {filteredGarages.length} garages
      </div>

      <div className="garage-content">
        {activeView === 'list' ? (
          <GarageList garages={filteredGarages} />
        ) : (
          <GarageMap garages={filteredGarages} />
        )}
      </div>
    </div>
  );
};

export default CarGarages; 
 