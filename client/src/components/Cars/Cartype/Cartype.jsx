import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import style from './cartype.module.css';

const CarType = () => {
    const [selectedType, setSelectedType] = useState('Hatchback');
    const [selectedModel, setSelectedModel] = useState('Swift');
    const [selectedFuel, setSelectedFuel] = useState('Petrol');
    const [alreadyClicked, setAlreadyClicked] = useState(null);

    useEffect(() => {
        // Pre-select the Hatchback button
        setTimeout(() => {
            const typeButton = document.querySelector('button[name="Hatchback"]');
            if (typeButton) {
                typeButton.parentElement.style.border = "1px solid #8C76DF";
                setAlreadyClicked(typeButton.parentElement);
            }
        }, 0);
    }, []);

    const handleTypeClick = (e) => {
        e.preventDefault();
        const name = e.target.name;
        
        // Reset border on previously selected button
        if (alreadyClicked) {
            alreadyClicked.style.border = "none";
        }
        
        // Set border on currently selected button
        e.target.parentElement.style.border = "1px solid #8C76DF";
        setAlreadyClicked(e.target.parentElement);
        setSelectedType(name);
        setSelectedModel(''); // Reset model when type changes
    };

    const handleModelChange = (e) => {
        setSelectedModel(e.target.value);
    };

    const handleFuelChange = (e) => {
        setSelectedFuel(e.target.value);
    };

    const handleContinue = () => {
        if (!selectedType || !selectedModel || !selectedFuel) {
            alert("Please select all options");
            return;
        }
    };

    const carTypes = ['Hatchback', 'Sedan', 'SUV', 'MUV'];
    const carModels = {
        'Hatchback': ['Swift', 'i20', 'Polo'],
        'Sedan': ['City', 'Verna', 'Ciaz'],
        'SUV': ['Creta', 'Seltos', 'Harrier'],
        'MUV': ['Innova', 'Ertiga', 'Carens']
    };
    const fuelTypes = ['Petrol', 'Diesel', 'CNG', 'Electric'];

    return (
        <div className={style.carTypeBody}>
            <h2 className={style.carTypeTitle}>What type of car do you have?</h2>
            <div className={style.carTypeGrid}>
                {carTypes.map((type) => (
                    <div key={type} className={style.carTypeOption}>
                        <button
                            name={type}
                            onClick={handleTypeClick}
                            className={selectedType === type ? style.selectedType : ""}
                        >
                            {type}
                        </button>
                    </div>
                ))}
            </div>

            <div className={style.selectContainer}>
                <h2 className={style.carModelTitle}>Select your car model</h2>
                <select 
                    className={style.modelSelect}
                    value={selectedModel}
                    onChange={handleModelChange}
                >
                    <option value="">Select a model</option>
                    {carModels[selectedType]?.map((model) => (
                        <option key={model} value={model}>{model}</option>
                    ))}
                </select>
            </div>

            <div className={style.selectContainer}>
                <h2 className={style.carModelTitle}>Select fuel type</h2>
                <select 
                    className={style.modelSelect}
                    value={selectedFuel}
                    onChange={handleFuelChange}
                >
                    {fuelTypes.map((fuel) => (
                        <option key={fuel} value={fuel}>{fuel}</option>
                    ))}
                </select>
            </div>

            <div className={style.continueButtonContainer}>
                <Link to="/cars/expiry">
                    <button
                        className={style.continueBtn}
                        onClick={handleContinue}
                        disabled={!selectedType || !selectedModel || !selectedFuel}
                    >
                        Continue
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default CarType;
