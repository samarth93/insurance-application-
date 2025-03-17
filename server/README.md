# ACKO Insurance API Server

This is the backend API server for the ACKO Insurance application. It provides authentication, user management, and policy management functionality.

## Features

- User authentication (signup, login)
- User profile management
- Policy management
- Claims management

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)

## Installation

1. Clone the repository
2. Navigate to the server directory
3. Install dependencies

```bash
cd server
npm install
```

4. Create a `.env` file in the root directory with the following variables:

```
PORT=8080
MONGODB_URI=mongodb://localhost:27017/acko
MONGODB_ATLAS_URI=your_mongodb_atlas_uri
JWT_SECRET_KEY=your_jwt_secret_key
NODE_ENV=development
```

## Running the Server

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm run prod
```

## API Endpoints

### Authentication

- `POST /auth/signup` - Register a new user
- `POST /auth/login` - Login a user

### User Management

- `GET /user/profile` - Get current user profile
- `PATCH /user/profile` - Update current user profile
- `POST /user/change-password` - Change user password

### Policy Management

- `GET /policies` - Get all policies for current user
- `GET /policies/:id` - Get a specific policy
- `POST /policies` - Create a new policy
- `PATCH /policies/:id` - Update a policy

### Claims Management

- `POST /policies/:id/claims` - Add a claim to a policy

## Database Models

### User Model

- email (String, required, unique)
- password (String, required)
- name (String, required)
- mobile (Number, required)
- selectedPlan (String)
- premium (Number)
- paCover (Number)
- ncbDiscountAmount (Number)
- address (String)
- city (String)
- state (String)
- pincode (String)
- policies (Array of Policy IDs)

### Policy Model

- policyNumber (String, required, unique)
- policyType (String, required)
- startDate (Date, required)
- endDate (Date, required)
- status (String, enum: ['active', 'expired', 'cancelled'])
- vehicleDetails (Object)
- coverage (Object)
- premium (Object)
- claims (Array)
- userId (User ID, required)

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. To access protected routes, include the JWT token in the Authorization header:

```
Authorization: Bearer your_jwt_token
```

## Error Handling

All API responses follow a standard format:

```json
{
  "status": "success|error",
  "message": "Message describing the result",
  "data": {} // Optional data object
}
```

## License

ISC 