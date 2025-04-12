import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './Year.css';

const Year = () => {
    const history = useHistory();
    const [selectedYear, setSelectedYear] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        // Check if we have vehicle details in localStorage
        const storedDetails = localStorage.getItem('vehicleDetails');
        console.log('Stored vehicle details:', storedDetails);
        
        if (storedDetails) {
            try {
                const details = JSON.parse(storedDetails);
                console.log('Parsed vehicle details:', details);
                if (details.manufacturingYear) {
                    setSelectedYear(details.manufacturingYear);
                }
            } catch (error) {
                console.error('Error parsing vehicle details:', error);
            }
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedYear) {
            setError('Please select a year');
            return;
        }
        history.push('/cars/month');
    };

    const years = Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i);

    return (
        <div className="year-container">
            <h2>Select Manufacturing Year</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        className="year-select"
                    >
                        <option value="">Select Year</option>
                        {years.map((year) => (
                            <option key={year} value={year}>
                                {year}
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

export default Year; 