const express = require("express");
// Uncomment the model require
const Car = require("../models/car.model");
const router = express.Router();

// We'll keep the mock data as a fallback
const mockCars = [
    { 
        _id: "1", 
        make: "Toyota", 
        model: "Camry", 
        year: 2020,
        price: 25000,
        fuelType: "Petrol"
    },
    { 
        _id: "2", 
        make: "Honda", 
        model: "Civic", 
        year: 2019,
        price: 22000,
        fuelType: "Petrol"
    },
    { 
        _id: "3", 
        make: "Tesla", 
        model: "Model 3", 
        year: 2021,
        price: 45000,
        fuelType: "Electric"
    }
];

router.get("/", async (req, res) => {
    try {
        // Try to get data from the database
        const data = await Car.find();
        return res.status(200).send({ data })
    } catch (err) {
        console.error("Error fetching cars from database:", err.message);
        // Return mock data as fallback
        return res.status(200).send({ data: mockCars, source: "mock" })
    }
})

router.post("/", async (req, res) => {
    try {
        // Try to create in the database
        const data = await Car.create(req.body);
        return res.status(200).send(data)
    }
    catch (err) {
        console.error("Error creating car in database:", err.message);
        // Mock creating a new car as fallback
        const newCar = {
            _id: (mockCars.length + 1).toString(),
            ...req.body
        };
        mockCars.push(newCar);
        return res.status(200).send({ ...newCar, source: "mock" })
    }
})

router.get("/:id", async (req, res) => {
    try {
        // Try to find in the database
        const data = await Car.findById(req.params.id).lean().exec();
        if (!data) {
            // If not found in database, check mock data
            const car = mockCars.find(car => car._id === req.params.id);
            if (!car) {
                return res.status(404).send("Car not found");
            }
            return res.status(200).send({ ...car, source: "mock" })
        }
        return res.status(200).send(data)
    }
    catch (err) {
        console.error("Error finding car in database:", err.message);
        // Try mock data as fallback
        const car = mockCars.find(car => car._id === req.params.id);
        if (!car) {
            return res.status(404).send("Car not found");
        }
        return res.status(200).send({ ...car, source: "mock" })
    }
})

router.patch("/:id", async (req, res) => {
    try {
        // Try to update in the database
    const data = await Car.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        }).lean().exec();
        
        if (!data) {
            // If not found in database, try mock data
            const carIndex = mockCars.findIndex(car => car._id === req.params.id);
            if (carIndex === -1) {
                return res.status(404).send("Car not found");
            }
            
            mockCars[carIndex] = { 
                ...mockCars[carIndex], 
                ...req.body 
            };
            
            return res.status(200).send({ ...mockCars[carIndex], source: "mock" })
        }
        
    return res.status(200).send(data)
}
    catch (err) {
        console.error("Error updating car in database:", err.message);
        // Try mock data as fallback
        const carIndex = mockCars.findIndex(car => car._id === req.params.id);
        if (carIndex === -1) {
            return res.status(404).send("Car not found");
        }
        
        mockCars[carIndex] = { 
            ...mockCars[carIndex], 
            ...req.body 
        };
        
        return res.status(200).send({ ...mockCars[carIndex], source: "mock" })
    }
})

module.exports=router