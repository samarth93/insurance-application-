const mongoose = require("mongoose");
require('dotenv').config();

// Track connection state to prevent multiple connection attempts
let isConnecting = false;
let connectionEstablished = false;

const connect = async () => {
    if (connectionEstablished) {
        return true;
    }
    
    if (isConnecting) {
        console.log("Connection attempt already in progress...");
        return new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    isConnecting = true;
    
    try {
        mongoose.set('strictQuery', false);
        
        // For now, we'll just return true without attempting to connect
        console.log("Running in offline mode - database connection skipped");
        connectionEstablished = true;
        isConnecting = false;
        return true;
        
    } catch (error) {
        console.error("Error in database setup:", error.message);
        console.log("Application will continue without database connection");
        isConnecting = false;
        return true; // Return true to allow the app to continue
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