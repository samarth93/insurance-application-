import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './CarType.css';

const CarType = () => {
    const history = useHistory();
    const [selectedType, setSelectedType] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedType) {
            setError('Please select a car type');
            return;
        }
        history.push('/cars/useofcar');
    };

    const carTypes = [
        'Hatchback',
        'Sedan',
        'SUV',
        'MUV',
        'Luxury',
        'Sports'
    ];

    return (
        <div className="car-type-container">
            <h2>Select Car Type</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="car-type-select"
                    >
                        <option value="">Select Car Type</option>
                        {carTypes.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                    {error && <p className="error-message">{error}</p>}
                </div>
                <button type="submit" className="submit-button">
                    Next
                </button>
            </form>
        </div>
    );
};

export default CarType; 