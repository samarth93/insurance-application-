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
        
        const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/insurance";
        
        // Try to connect to the database
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        
        console.log("Database connected successfully");
        connectionEstablished = true;
        isConnecting = false;
        return true;
        
    } catch (error) {
        console.error("Error in database connection:", error.message);
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