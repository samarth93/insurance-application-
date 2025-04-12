import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { vehicleData } from '../../data/vehicleData';
import './VehicleDetails.css';

const VehicleDetails = () => {
    const history = useHistory();
    const location = useLocation();
    const [vehicleInfo, setVehicleInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const vehicleNumber = searchParams.get('number');
        console.log('Searching for vehicle:', vehicleNumber);
        
        if (vehicleNumber) {
            const vehicle = vehicleData.find(v => v.vehicleNumber === vehicleNumber.toUpperCase());
            console.log('Found vehicle:', vehicle);
            if (vehicle) {
                setVehicleInfo(vehicle);
            }
        }
        setLoading(false);
    }, [location]);

    const handleConfirm = () => {
        if (vehicleInfo) {
            // Store vehicle details in localStorage
            const vehicleDetails = {
                vehicleNumber: vehicleInfo.vehicleNumber,
                model: vehicleInfo.model,
                manufacturingYear: vehicleInfo.manufacturingYear,
                vehicleType: vehicleInfo.vehicleType,
                fuelType: vehicleInfo.fuelType,
                engineCC: vehicleInfo.engineCC
            };
            console.log('Storing vehicle details:', vehicleDetails);
            localStorage.setItem('vehicleDetails', JSON.stringify(vehicleDetails));
        }
        history.push('/cars/useofcar');
    };

    const handleBack = () => {
        history.push('/');
    };

    if (loading) {
        return (
            <div className="vehicle-details-container">
                <div className="loading-spinner">Loading...</div>
            </div>
        );
    }

    if (!vehicleInfo) {
        return (
            <div className="vehicle-details-container">
                <div className="error-message">
                    <h2>Vehicle Not Found</h2>
                    <p>The vehicle number you entered is not in our database.</p>
                    <button onClick={handleBack} className="back-button">
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="vehicle-details-container">
            <div className="vehicle-details-card">
                <h2>Vehicle Details</h2>
                
                <div className="details-section">
                    <div className="detail-row">
                        <span className="detail-label">Vehicle Number:</span>
                        <span className="detail-value">{vehicleInfo.vehicleNumber}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Owner Name:</span>
                        <span className="detail-value">{vehicleInfo.ownerName}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Vehicle Model:</span>
                        <span className="detail-value">{vehicleInfo.model}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Insurance Status:</span>
                        <span className={`detail-value status-${vehicleInfo.insuranceStatus}`}>
                            {vehicleInfo.insuranceStatus.toUpperCase()}
                        </span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Pincode:</span>
                        <span className="detail-value">{vehicleInfo.pincode}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Registration Date:</span>
                        <span className="detail-value">{vehicleInfo.registrationDate}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Last Insurance Date:</span>
                        <span className="detail-value">{vehicleInfo.lastInsuranceDate}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Vehicle Type:</span>
                        <span className="detail-value">{vehicleInfo.vehicleType}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Fuel Type:</span>
                        <span className="detail-value">{vehicleInfo.fuelType}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Engine CC:</span>
                        <span className="detail-value">{vehicleInfo.engineCC} cc</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Manufacturing Year:</span>
                        <span className="detail-value">{vehicleInfo.manufacturingYear}</span>
                    </div>
                </div>

                <div className="button-group">
                    <button onClick={handleBack} className="back-button">
                        Back
                    </button>
                    <button onClick={handleConfirm} className="confirm-button">
                        Confirm & Proceed
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VehicleDetails; 