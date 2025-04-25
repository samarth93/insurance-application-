import React from 'react';
import './GarageCard.css';
import { FaStar, FaMapMarkerAlt, FaPhone, FaClock, FaDirections } from 'react-icons/fa';

const GarageCard = ({ garage }) => {
  const {
    name,
    address,
    distance,
    phone,
    rating,
    reviewCount,
    isOpen,
    openHours,
    isInNetwork,
    services,
    imageUrl,
    latitude,
    longitude
  } = garage;

  const openGoogleMaps = () => {
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}&destination_place_id=${encodeURIComponent(name + ' ' + address)}`;
    window.open(mapsUrl, '_blank');
  };

  return (
    <div className="garage-card">
      <div className="garage-image">
        <img src={imageUrl || '/images/default-garage.jpg'} alt={name} />
        {isInNetwork && <div className="in-network-badge">In Network</div>}
      </div>
      <div className="garage-details">
        <h3>{name}</h3>
        <div className="rating">
          <FaStar className="star-icon" />
          <span>{rating} ({reviewCount} reviews)</span>
        </div>
        <div className="address" onClick={openGoogleMaps} style={{ cursor: 'pointer' }}>
          <FaMapMarkerAlt className="icon" />
          <span>{address} • {distance} miles away</span>
        </div>
        <div className="contact">
          <FaPhone className="icon" />
          <span>{phone}</span>
        </div>
        <div className="hours">
          <FaClock className="icon" />
          <span className={isOpen ? 'open' : 'closed'}>
            {isOpen ? `Open · ${openHours}` : `Closed · Opens at ${openHours.split(' - ')[0]}`}
          </span>
        </div>
        
        {services && services.length > 0 && (
          <div className="services">
            <h4>Services</h4>
            <div className="service-tags">
              {services.slice(0, 5).map((service, index) => (
                <span key={index} className="service-tag">{service}</span>
              ))}
              {services.length > 5 && (
                <span className="service-tag">+{services.length - 5} more</span>
              )}
            </div>
          </div>
        )}
        
        <div className="action-buttons">
          <button className="directions-btn" onClick={openGoogleMaps}>
            <FaDirections /> Directions
          </button>
          <button className="book-btn">Book Appointment</button>
        </div>
      </div>
    </div>
  );
};

export default GarageCard;
 