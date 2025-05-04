import axios from 'axios';

// For production
// const API_URL = 'https://acko.herokuapp.com';

// For local development
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8082';

console.log('Using API URL:', API_URL); // Add this line for debugging

// Create axios instance with timeout
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 15000 // 15 second timeout for slower connections
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('acko_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
      console.log('Adding auth token to request');
    } else {
      console.log('No auth token available for request');
    }
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Handle token expiration
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.message);
    if (error.response) {
      console.error('Error Status:', error.response.status);
      console.error('Error Data:', error.response.data);
      
      if (error.response.status === 401) {
        console.log('Authentication error detected, logging out');
      // Token expired or invalid
      localStorage.removeItem('acko_token');
      localStorage.removeItem('acko_user');
      window.location.href = '/login';
      }
    } else if (error.request) {
      console.error('No response received:', error.request);
    }
    return Promise.reject(error);
  }
);

// Authentication service
const AuthService = {
  // Register a new user
  register: async (userData) => {
    try {
      const response = await api.post('/auth/signup', userData);
      if (response.data.data && response.data.data.token) {
        localStorage.setItem('acko_token', response.data.data.token);
        localStorage.setItem('acko_user', JSON.stringify(response.data.data.user));
      }
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      if (error.code === 'ECONNABORTED') {
        throw new Error('Request timed out. Please try again.');
      } else if (!error.response) {
        throw new Error('Network error. Please check your connection and try again.');
      }
      
      // Handle validation errors specifically
      if (error.response && error.response.data) {
        if (error.response.data.errors) {
          // Pass the validation errors to the component
          const errorObj = new Error(error.response.data.message || 'Validation failed');
          errorObj.errors = error.response.data.errors;
          throw errorObj;
        } else {
          throw error.response.data;
        }
      }
      
      throw new Error('An unexpected error occurred');
    }
  },

  // Login a user
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      if (response.data.data && response.data.data.token) {
        localStorage.setItem('acko_token', response.data.data.token);
        localStorage.setItem('acko_user', JSON.stringify(response.data.data.user));
      }
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      if (error.code === 'ECONNABORTED') {
        throw new Error('Request timed out. Please try again.');
      } else if (!error.response) {
        throw new Error('Network error. Please check your connection and try again.');
      }
      throw error.response ? error.response.data : new Error('An unexpected error occurred');
    }
  },

  // Logout a user
  logout: () => {
    localStorage.removeItem('acko_token');
    localStorage.removeItem('acko_user');
    localStorage.removeItem('ackoUserId');
    localStorage.removeItem('ackoid');
  },

  // Get current user
  getCurrentUser: () => {
    const user = localStorage.getItem('acko_user');
    return user ? JSON.parse(user) : null;
  },

  // Check if user is logged in
  isLoggedIn: () => {
    return !!localStorage.getItem('acko_token');
  },

  // Get user profile
  getProfile: async () => {
    try {
      // Use both the specific endpoint for profile and a fallback with check-user if necessary
      const email = AuthService.getCurrentUser()?.email;
      if (!email) {
        throw new Error('No email available to fetch profile');
      }

      try {
        const response = await api.get(`/auth/check-user/${email}`);
        return response.data;
      } catch (error) {
        console.error('Error with check-user endpoint:', error);
        // If direct profile endpoint not available, use the check-user endpoint
        throw error;
      }
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  // Update user profile
  updateProfile: async (userData) => {
    try {
      const response = await api.patch('/user/profile', userData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  // Change password
  changePassword: async (currentPassword, newPassword) => {
    try {
      const response = await api.post('/user/change-password', {
        currentPassword,
        newPassword
      });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  }
};

export default AuthService; 