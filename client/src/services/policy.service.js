import axios from 'axios';
import AuthService from './auth.service';

// For production
// const API_URL = 'https://acko.herokuapp.com';

// For local development
const API_URL = 'http://localhost:8081';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('acko_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Policy service
const PolicyService = {
  // Get all policies
  getPolicies: async () => {
    try {
      const response = await api.get('/policies');
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  // Get a specific policy
  getPolicy: async (policyId) => {
    try {
      const response = await api.get(`/policies/${policyId}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  // Create a new policy
  createPolicy: async (policyData) => {
    try {
      const response = await api.post('/policies', policyData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  // Update a policy
  updatePolicy: async (policyId, policyData) => {
    try {
      const response = await api.patch(`/policies/${policyId}`, policyData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  // Add a claim to a policy
  addClaim: async (policyId, claimData) => {
    try {
      const response = await api.post(`/policies/${policyId}/claims`, claimData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  // Convert existing policy data to new format
  convertExistingPolicy: async () => {
    try {
      // Get user ID from localStorage or from current user
      const userId = localStorage.getItem('ackoUserId') || AuthService.getCurrentUser()?.id;
      if (!userId) {
        throw new Error('User ID not found. Please log in again.');
      }

      // Get car details from localStorage
      const carNumber = localStorage.getItem('carNumber') || 'KA01AB1234';
      const carMake = localStorage.getItem('carMake') || 'Ford';
      const carModel = localStorage.getItem('carModel') || 'Titanium AT';
      const carYear = localStorage.getItem('carYear') || new Date().getFullYear().toString();
      
      // Get premium details
      const totalPremium = localStorage.getItem('totalacko');
      if (!totalPremium) {
        throw new Error('Premium details not found. Please restart the policy purchase process.');
      }

      // Calculate premium components
      const basePremium = Math.round(parseFloat(totalPremium) * 0.7);
      const thirdPartyPremium = Math.round(parseFloat(totalPremium) * 0.15);
      const gst = Math.round(parseFloat(totalPremium) * 0.15);
      
      // Generate a policy number
      const randomNum = Math.floor(100000 + Math.random() * 900000);
      const policyNumber = `ACKO-${randomNum}`;
      
      // Create policy data with more realistic values
      const policyData = {
        policyNumber: policyNumber,
        policyType: localStorage.getItem('policyType') || 'Comprehensive Car Insurance',
        startDate: new Date(),
        endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
        status: 'active',
        vehicleDetails: {
          make: carMake,
          model: carModel,
          year: parseInt(carYear),
          registrationNumber: carNumber
        },
        coverage: {
          thirdPartyLiability: true,
          ownDamage: true,
          personalAccidentCover: localStorage.getItem('paCover') === 'true',
          consumablesCover: localStorage.getItem('consumablesCover') === 'true' || true,
          zeroDepreciation: localStorage.getItem('zeroDepreciation') === 'true' || false,
          engineProtection: localStorage.getItem('engineProtection') === 'true' || false,
          roadSideAssistance: localStorage.getItem('roadSideAssistance') === 'true' || true
        },
        premium: {
          basePremium: basePremium,
          ownDamagePremium: basePremium,
          thirdPartyPremium: thirdPartyPremium,
          addOnsPremium: Math.round(parseFloat(totalPremium) * 0.05),
          ncbDiscount: localStorage.getItem('ncbDiscount') || 0,
          gst: gst,
          totalPremium: totalPremium
        }
      };

      console.log("Creating policy with data:", policyData);

      // Create policy
      const policyResponse = await api.post('/policies', policyData);
      return policyResponse.data;
    } catch (error) {
      console.error("Error creating policy:", error);
      throw error.response ? error.response.data : error;
    }
  }
};

export default PolicyService; 