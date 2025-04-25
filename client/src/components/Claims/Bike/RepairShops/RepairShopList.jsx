import React from 'react';
import RepairShopCard from './RepairShopCard';
import './RepairShopList.css';

const RepairShopList = ({ shops }) => {
  if (shops.length === 0) {
    return (
      <div className="no-results">
        <p>No repair shops found matching your criteria.</p>
        <p>Try adjusting your filters or search query.</p>
      </div>
    );
  }

  return (
    <div className="repair-shop-list">
      {shops.map((shop) => (
        <RepairShopCard key={shop.id} shop={shop} />
      ))}
    </div>
  );
};

export default RepairShopList; 
 