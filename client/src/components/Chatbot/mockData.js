// Mock data for vehicle details and insurance plans

// Sample vehicle details based on vehicle number
export const vehicleData = {
  // Car mock data
  'MH01AB1234': {
    type: 'car',
    brand: 'Honda',
    model: 'City',
    variant: 'VX CVT',
    year: 2020,
    fuelType: 'Petrol',
    engineCC: '1498 CC',
    transmission: 'Automatic',
    registrationDate: '15-Jun-2020',
    color: 'Platinum White Pearl',
    seatingCapacity: 5,
    rto: 'Mumbai Central RTO'
  },
  'KA01CD5678': {
    type: 'car',
    brand: 'Maruti Suzuki',
    model: 'Swift',
    variant: 'ZXi',
    year: 2021,
    fuelType: 'Petrol',
    engineCC: '1197 CC',
    transmission: 'Manual',
    registrationDate: '10-Jan-2021',
    color: 'Premium Silver',
    seatingCapacity: 5,
    rto: 'Bangalore Central RTO'
  },
  'DL01EF9012': {
    type: 'car',
    brand: 'Hyundai',
    model: 'Creta',
    variant: 'SX(O)',
    year: 2022,
    fuelType: 'Diesel',
    engineCC: '1493 CC',
    transmission: 'Automatic',
    registrationDate: '05-Mar-2022',
    color: 'Galaxy Blue',
    seatingCapacity: 5,
    rto: 'Delhi Central RTO'
  },
  // Bike mock data
  'MH02GH3456': {
    type: 'bike',
    brand: 'Honda',
    model: 'CB Shine',
    variant: 'Disc',
    year: 2019,
    fuelType: 'Petrol',
    engineCC: '125 CC',
    transmission: 'Manual',
    registrationDate: '20-Nov-2019',
    color: 'Black',
    rto: 'Mumbai West RTO'
  },
  'KA02IJ7890': {
    type: 'bike',
    brand: 'Royal Enfield',
    model: 'Classic 350',
    variant: 'Signals',
    year: 2020,
    fuelType: 'Petrol',
    engineCC: '349 CC',
    transmission: 'Manual',
    registrationDate: '12-Jul-2020',
    color: 'Stealth Black',
    rto: 'Bangalore South RTO'
  },
  'DL02KL1234': {
    type: 'bike',
    brand: 'Bajaj',
    model: 'Pulsar NS200',
    variant: 'ABS',
    year: 2021,
    fuelType: 'Petrol',
    engineCC: '199.5 CC',
    transmission: 'Manual',
    registrationDate: '18-Apr-2021',
    color: 'Racing Red',
    rto: 'Delhi East RTO'
  }
};

// Default fallback vehicle data if number not found
export const defaultVehicleData = {
  car: {
    type: 'car',
    brand: 'Honda',
    model: 'City',
    variant: 'VX CVT',
    year: 2022,
    fuelType: 'Petrol',
    engineCC: '1498 CC',
    transmission: 'Automatic',
    registrationDate: '25-Dec-2022',
    color: 'Radiant Red Metallic',
    seatingCapacity: 5,
    rto: 'Mumbai Central RTO'
  },
  bike: {
    type: 'bike',
    brand: 'Honda',
    model: 'CB Hornet 160R',
    variant: 'ABS',
    year: 2022,
    fuelType: 'Petrol',
    engineCC: '160 CC',
    transmission: 'Manual',
    registrationDate: '15-Nov-2022',
    color: 'Sports Red',
    rto: 'Thane RTO'
  }
};

// Insurance plan templates
export const insurancePlans = {
  car: [
    {
      id: 'car_basic',
      name: 'Basic Plan',
      coverageType: 'Third-party',
      premium: 2500,
      coverage: [
        'Third-party Liability',
        'Personal Accident Cover'
      ],
      description: 'Mandatory legal cover for third-party damage',
      isPopular: false
    },
    {
      id: 'car_standard',
      name: 'Standard Plan',
      coverageType: 'Comprehensive',
      premium: 5800,
      coverage: [
        'Third-party Liability',
        'Own Damage',
        'Personal Accident Cover',
        'Fire & Theft Protection'
      ],
      description: 'Complete protection for your vehicle and third-party damage',
      isPopular: true
    },
    {
      id: 'car_premium',
      name: 'Premium Plan',
      coverageType: 'Comprehensive Plus',
      premium: 8200,
      coverage: [
        'Third-party Liability',
        'Own Damage',
        'Personal Accident Cover',
        'Zero Depreciation',
        'Engine Protection',
        'Roadside Assistance',
        'Return to Invoice',
        'Consumables Cover'
      ],
      description: 'Highest level of protection with all add-ons included',
      isPopular: false
    }
  ],
  bike: [
    {
      id: 'bike_basic',
      name: 'Basic Plan',
      coverageType: 'Third-party',
      premium: 1200,
      coverage: [
        'Third-party Liability',
        'Personal Accident Cover'
      ],
      description: 'Mandatory legal cover for third-party damage',
      isPopular: false
    },
    {
      id: 'bike_standard',
      name: 'Comprehensive Plan',
      coverageType: 'Comprehensive',
      premium: 2800,
      coverage: [
        'Third-party Liability',
        'Own Damage',
        'Personal Accident Cover',
        'Fire & Theft Protection'
      ],
      description: 'Complete protection for your bike and third-party damage',
      isPopular: true
    },
    {
      id: 'bike_premium',
      name: 'Premium Plan',
      coverageType: 'Comprehensive Plus',
      premium: 3900,
      coverage: [
        'Third-party Liability',
        'Own Damage',
        'Personal Accident Cover',
        'Zero Depreciation',
        'Engine Protection',
        'Roadside Assistance',
        'Return to Invoice'
      ],
      description: 'Highest level of protection with all add-ons included',
      isPopular: false
    }
  ],
  health: [
    {
      id: 'health_basic',
      name: 'Basic Plan',
      coverageType: 'Essential',
      premium: 7999,
      coverage: [
        'Hospitalization Cover up to ₹3 Lakhs',
        'Room Rent up to ₹3,000/day',
        'Pre & Post Hospitalization',
        'Ambulance Charges up to ₹1,000'
      ],
      description: 'Essential coverage for medical emergencies',
      isPopular: false
    },
    {
      id: 'health_standard',
      name: 'Standard Plan',
      coverageType: 'Comprehensive',
      premium: 12499,
      coverage: [
        'Hospitalization Cover up to ₹5 Lakhs',
        'Room Rent up to ₹5,000/day',
        'Pre & Post Hospitalization',
        'Critical Illness Cover',
        'Ambulance Charges up to ₹2,000',
        'Ayurvedic Treatment Cover'
      ],
      description: 'Comprehensive health coverage for individuals and families',
      isPopular: true
    },
    {
      id: 'health_premium',
      name: 'Premium Plan',
      coverageType: 'Comprehensive Plus',
      premium: 18999,
      coverage: [
        'Hospitalization Cover up to ₹10 Lakhs',
        'No Room Rent Capping',
        'Pre & Post Hospitalization',
        'Critical Illness Cover',
        'Maternity Benefits',
        'Alternative Treatments',
        'International Emergency Cover',
        'Health Check-ups'
      ],
      description: 'Complete health protection with maximum benefits',
      isPopular: false
    }
  ]
}; 
 