# MongoDB Atlas Setup Guide

This project has been updated to use MongoDB Atlas instead of local MongoDB. Here's how to set it up and use it.

## Environment Variables

Make sure your `.env` file contains the MongoDB Atlas connection string:

```env
myMongo=mongodb+srv://username:password@cluster.mongodb.net/database_name?retryWrites=true&w=majority
```

Replace the connection string with your actual MongoDB Atlas connection string.

## Database Configuration

The project now uses a centralized database configuration in `config/database.js` with:

- **Connection Options**: Optimized for MongoDB Atlas performance
- **Error Handling**: Comprehensive error handling and logging
- **Event Listeners**: Connection status monitoring
- **Graceful Shutdown**: Proper cleanup on application termination

## Available Scripts

### Test Database Connection
```bash
npm run test-db
```
Tests the MongoDB Atlas connection to ensure it's working properly.

### Seed Database
```bash
# Seed all data
npm run seed-all

# Or seed individually
npm run seed-admin
npm run seed-projects
npm run seed-blogs
```

### Development
```bash
# Start development server
npm run dev

# Start production server
npm start
```

## What Changed

1. **Main Application (`app.js`)**: Now uses the centralized database configuration
2. **Seed Files**: Updated to use environment variables instead of hardcoded local MongoDB URLs
3. **Database Config**: New `config/database.js` file with robust connection handling
4. **Package.json**: Added helpful scripts for database operations

## Connection Features

- **Connection Pooling**: Maintains up to 10 socket connections
- **Timeout Handling**: 5-second server selection timeout, 45-second socket timeout
- **Event Monitoring**: Logs connection, disconnection, and reconnection events
- **Error Recovery**: Automatic reconnection attempts
- **Graceful Shutdown**: Properly closes connections on application termination

## Troubleshooting

If you encounter connection issues:

1. **Check Environment Variables**: Ensure `myMongo` is set correctly in your `.env` file
2. **Test Connection**: Run `npm run test-db` to verify connectivity
3. **Check Network**: Ensure your IP is whitelisted in MongoDB Atlas
4. **Verify Credentials**: Double-check username and password in the connection string

## Security Notes

- Never commit your `.env` file to version control
- Use environment-specific connection strings for development, staging, and production
- Consider using MongoDB Atlas VPC peering for enhanced security in production 