const mongoose = require("mongoose");
require('dotenv').config();

const connect = () => {
    // Set strictQuery to false to prepare for Mongoose 7 change
    mongoose.set('strictQuery', false);
    
    // Get MongoDB URIs from environment variables
    const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/acko";
    const MONGODB_ATLAS_URI = process.env.MONGODB_ATLAS_URI;
    
    console.log("Trying to connect to MongoDB Atlas...");
    
    // Connect directly to MongoDB Atlas with increased timeout
    return mongoose.connect(MONGODB_ATLAS_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
        socketTimeoutMS: 45000, // Increase socket timeout to 45 seconds
    }).then(() => {
        console.log("Connected to MongoDB Atlas successfully");
    }).catch((atlasErr) => {
        console.error("Error connecting to MongoDB Atlas:", atlasErr.message);
        
        // Fallback to local MongoDB
        console.log("Trying to connect to local MongoDB...");
        return mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000,
            socketTimeoutMS: 45000,
        }).then(() => {
            console.log("Connected to local MongoDB successfully");
        }).catch((localErr) => {
            console.error("Error connecting to local MongoDB:", localErr.message);
            console.log("Application will continue without database connection");
            // Return a resolved promise to prevent the application from crashing
            return Promise.resolve();
        });
    });
}

module.exports = connect;