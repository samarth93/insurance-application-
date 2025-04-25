# ACKO Insurance Application

This is a full-stack insurance application with a React frontend and Node.js backend.

## Prerequisites

- Node.js (v14 or higher)
- NPM (v6 or higher)

## Installation

1. Clone the repository
2. Install dependencies for both client and server:

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

## Running the Application

### Using PowerShell (Recommended)

The easiest way to run the application is using our PowerShell scripts:

```powershell
# Run both server and client
.\run-app.ps1

# Or run them separately in different terminals
.\run-server.ps1
.\run-client.ps1
```

### If the main server fails

If you encounter issues with the main server, you can use our backup server:

```powershell
.\run-backup-server.ps1
```

### Using Command Prompt

If you prefer command prompt, you can use the batch files:

```cmd
# Run both server and client
start-app.bat

# Or the simplified version
run-simplified.bat
```

## Access the Application

- Server: http://localhost:8081
- Client: http://localhost:3000

## Troubleshooting

If you encounter any issues:

1. Make sure MongoDB is running if you're using the full database version
2. Check that ports 3000 and 8081 are not already in use
3. Verify that all dependencies are installed correctly
4. If using the backup server, no database connection is required

## License

ISC
