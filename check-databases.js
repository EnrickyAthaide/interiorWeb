// Script to check all databases and collections in MongoDB Atlas
const mongoose = require('mongoose');
require('dotenv').config();

async function checkDatabases() {
  try {
    console.log('🔌 Connecting to MongoDB Atlas...');
    
    // Connect without specifying a database name to list all databases
    const connectionString = process.env.myMongo;
    const baseConnectionString = connectionString.split('/').slice(0, -1).join('/') + '/';
    
    await mongoose.connect(baseConnectionString);
    console.log('✅ Connected to MongoDB Atlas');
    
    // List all databases
    const adminDb = mongoose.connection.db.admin();
    const dbList = await adminDb.listDatabases();
    
    console.log('\n📊 Available Databases:');
    dbList.databases.forEach(db => {
      console.log(`- ${db.name} (${(db.sizeOnDisk / 1024 / 1024).toFixed(2)} MB)`);
    });
    
    // For each database, list collections
    for (const dbInfo of dbList.databases) {
      if (dbInfo.name !== 'admin' && dbInfo.name !== 'local') {
        console.log(`\n📁 Collections in database "${dbInfo.name}":`);
        
        try {
          const db = mongoose.connection.useDb(dbInfo.name);
          const collections = await db.db.listCollections().toArray();
          
          if (collections.length === 0) {
            console.log('  (No collections found)');
          } else {
            collections.forEach(collection => {
              console.log(`  - ${collection.name}`);
            });
          }
        } catch (error) {
          console.log(`  Error accessing database: ${error.message}`);
        }
      }
    }
    
    console.log('\n✅ Database check completed!');
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Error checking databases:', error);
    process.exit(1);
  }
}

checkDatabases(); 