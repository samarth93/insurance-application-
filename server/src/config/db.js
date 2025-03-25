const mongoose = require("mongoose");
require('dotenv').config();

// Track connection state to prevent multiple connection attempts
let isConnecting = false;
let connectionEstablished = false;

const connect = async () => {
    // If already connected or in the process of connecting, return
    if (connectionEstablished) {
        return true;
    }
    
    if (isConnecting) {
        console.log("Connection attempt already in progress...");
        return new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    isConnecting = true;
    
    try {
        // Set strictQuery to false to prepare for Mongoose 7 change
        mongoose.set('strictQuery', false);
        
        // Get MongoDB URIs from environment variables
        const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/acko";
        const MONGODB_ATLAS_URI = process.env.MONGODB_ATLAS_URI;
        
        // Check existing connection
        if (mongoose.connection.readyState === 1) {
            console.log("Already connected to MongoDB");
            connectionEstablished = true;
            isConnecting = false;
            return true;
        }
        
        console.log("Trying to connect to MongoDB Atlas...");
        
        try {
            // Connect directly to MongoDB Atlas with increased timeout
            await mongoose.connect(MONGODB_ATLAS_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                serverSelectionTimeoutMS: 15000, // Reduce timeout to 15 seconds
                socketTimeoutMS: 30000, // Reduce socket timeout to 30 seconds
            });
            console.log("Connected to MongoDB Atlas successfully");
            connectionEstablished = true;
            isConnecting = false;
            return true;
        } catch (atlasErr) {
            console.error("Error connecting to MongoDB Atlas:", atlasErr.message);

            // Fallback to local MongoDB
            console.log("Trying to connect to local MongoDB...");
            try {
                await mongoose.connect(MONGODB_URI, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    serverSelectionTimeoutMS: 15000,
                    socketTimeoutMS: 30000,
                });
                console.log("Connected to local MongoDB successfully");
                connectionEstablished = true;
                isConnecting = false;
                return true;
            } catch (localErr) {
                console.error("Error connecting to local MongoDB:", localErr.message);
                console.log("Application will continue without database connection");
                // Return a resolved value to indicate connection attempt completed
                isConnecting = false;
                return false;
            }
        }
    } catch (error) {
        console.error("Unexpected error during database connection:", error);
        isConnecting = false;
        return false;
    }
};

// Monitor database connection
mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected!');
    connectionEstablished = false;
});

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
    connectionEstablished = false;
});

module.exports = connect;