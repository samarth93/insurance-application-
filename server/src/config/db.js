const mongoose = require("mongoose");
require('dotenv').config();

// Track connection state to prevent multiple connection attempts
let isConnecting = false;
let connectionEstablished = false;
let retryCount = 0;
const MAX_RETRIES = 3;

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
        
        // Use environment variable with fallback to hardcoded string
        const uri = process.env.MONGODB_URI || 
                   "mongodb+srv://Personal-user:WqfJaZkxZ3jC1voT@cluster0.hjwtc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
        
        console.log("Attempting database connection to MongoDB Atlas...");
        
        // Try to connect to the database
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            connectTimeoutMS: 15000, // 15 seconds timeout
            serverSelectionTimeoutMS: 15000, // 15 seconds timeout
            heartbeatFrequencyMS: 30000, // Check server status every 30 seconds
            maxPoolSize: 10 // Maximum number of connections in the connection pool
        });
        
        console.log("Database connected successfully to MongoDB Atlas");
        connectionEstablished = true;
        isConnecting = false;
        retryCount = 0; // Reset retry count on successful connection
        return true;
        
    } catch (error) {
        console.error("Error in database connection:", error.message);
        connectionEstablished = false;
        isConnecting = false;
        
        // Implement retry logic with exponential backoff
        if (retryCount < MAX_RETRIES) {
            retryCount++;
            const delay = Math.pow(2, retryCount) * 1000; // Exponential backoff
            console.log(`Retrying database connection in ${delay/1000} seconds... (Attempt ${retryCount}/${MAX_RETRIES})`);
            
            setTimeout(() => {
                connect(); // Retry connection
            }, delay);
        } else {
            console.error("Maximum retry attempts reached. Application will continue without database connection");
            console.log("Auth system will fall back to mock users");
        }
        
        return true; // Return true to allow the app to continue
    }
};

// Monitor database connection
mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected!');
    connectionEstablished = false;
    
    // Try to reconnect if not already connecting
    if (!isConnecting && retryCount < MAX_RETRIES) {
        console.log("Attempting to reconnect to MongoDB...");
        connect();
    }
});

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
    connectionEstablished = false;
});

mongoose.connection.on('connected', () => {
    console.log('MongoDB connected!');
    connectionEstablished = true;
});

module.exports = connect;