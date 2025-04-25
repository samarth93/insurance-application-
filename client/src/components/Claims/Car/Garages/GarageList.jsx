import React from 'react';
import GarageCard from './GarageCard';
import './GarageList.css';

const GarageList = ({ garages }) => {
  if (garages.length === 0) {
    return (
      <div className="no-results">
        <p>No garages found matching your criteria.</p>
        <p>Try adjusting your filters or search query.</p>
      </div>
    );
  }

  return (
    <div className="garage-list">
      {garages.map((garage) => (
        <GarageCard key={garage.id} garage={garage} />
      ))}
    </div>
  );
};

export default GarageList; 
 