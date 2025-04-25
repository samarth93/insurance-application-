import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaStar, FaPhone, FaList, FaMapMarked, FaFilter, FaSearch } from 'react-icons/fa';
import { bikeRepairShops } from '../../../../data/bikeRepairShops';
import RepairShopList from './RepairShopList';
import RepairShopMap from './RepairShopMap';
import './BikeRepairShops.css';

const BikeRepairShops = () => {
  const [repairShops, setRepairShops] = useState([]);
  const [filteredShops, setFilteredShops] = useState([]);
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
    setRepairShops(bikeRepairShops);
    setFilteredShops(bikeRepairShops);
    setLoading(false);
  }, []);

  useEffect(() => {
    // Apply filters
    let results = [...repairShops];
    
    // Filter by distance
    results = results.filter(shop => shop.distance <= filters.distance);
    
    // Filter in-network only
    if (filters.inNetworkOnly) {
      results = results.filter(shop => shop.isInNetwork);
    }
    
    // Filter open now
    if (filters.openNow) {
      results = results.filter(shop => shop.isOpen);
    }
    
    // Filter by search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      results = results.filter(
        shop => 
          shop.name.toLowerCase().includes(query) || 
          shop.address.toLowerCase().includes(query) ||
          shop.services.some(service => service.toLowerCase().includes(query)) ||
          shop.specialties.some(specialty => specialty.toLowerCase().includes(query))
      );
    }
    
    setFilteredShops(results);
  }, [filters, repairShops]);

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
    return <div className="loading-container">Loading repair shops...</div>;
  }

  return (
    <div className="bike-repair-shops-container">
      <div className="shop-header">
        <div className="header-content">
          <h1>Find Bike Repair Shops</h1>
          <p>Locate approved repair facilities for your two-wheeler</p>
        </div>
      </div>

      <div className="view-toggle">
        <button 
          className={`toggle-btn ${activeView === 'list' ? 'active' : ''}`}
          onClick={() => toggleView('list')}
        >
          <FaList /> List View
        </button>
        <button 
          className={`toggle-btn ${activeView === 'map' ? 'active' : ''}`}
          onClick={() => toggleView('map')}
        >
          <FaMapMarked /> Map View
        </button>
      </div>

      <div className="shop-filters">
        <div className="search-box">
          <FaSearch className="search-icon" />
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
        Found {filteredShops.length} repair shops
      </div>

      <div className="shop-content">
        {activeView === 'list' ? (
          <RepairShopList shops={filteredShops} />
        ) : (
          <RepairShopMap shops={filteredShops} />
        )}
      </div>
    </div>
  );
};

export default BikeRepairShops; 
 