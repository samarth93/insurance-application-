Authentication Issue Fixes

1. Database Connection Issues:
   - Improved database connection with retry mechanism
   - Added error handling for MongoDB connection failures
   - Added health check endpoint to verify database status

2. Authentication Flow:
   - Fixed JWT token generation and verification
   - Added input validation for login and registration
   - Improved error handling in auth.controller.js
   - Added fallback to mock users when database is unavailable

3. Client-Server Communication:
   - Updated API URLs to match running server port
   - Improved CORS configuration for better browser compatibility
   - Added additional logging for request debugging

4. Error Handling:
   - Improved error messaging for client and server
   - Added proper error object handling in services
   - Enhanced logging for easier debugging
