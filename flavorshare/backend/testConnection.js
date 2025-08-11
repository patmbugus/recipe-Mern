const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

async function testConnection() {
  try {
    console.log('🔌 Testing MongoDB connection...');
    console.log('Connection string:', process.env.MONGODB_URI || 'mongodb://localhost:27017/flavorshare');
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/flavorshare', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ MongoDB connected successfully!');
    console.log('Database:', mongoose.connection.db.databaseName);
    console.log('Host:', mongoose.connection.host);
    console.log('Port:', mongoose.connection.port);
    
    // Test basic operations
    console.log('\n🧪 Testing basic operations...');
    
    // List collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Collections:', collections.map(c => c.name));
    
    // Test a simple query
    const db = mongoose.connection.db;
    const result = await db.admin().ping();
    console.log('Ping result:', result);
    
    console.log('\n🎉 All tests passed! MongoDB is working correctly.');
    
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    console.log('\n🔧 Troubleshooting tips:');
    console.log('1. Make sure MongoDB is running on your system');
    console.log('2. Check if the connection string in .env is correct');
    console.log('3. Verify MongoDB service is started');
    console.log('4. Check firewall settings');
    
    if (error.message.includes('ECONNREFUSED')) {
      console.log('\n💡 MongoDB service might not be running. Try:');
      console.log('   - Windows: Check Services app for MongoDB');
      console.log('   - macOS: brew services start mongodb/brew/mongodb-community');
      console.log('   - Linux: sudo systemctl start mongod');
    }
  } finally {
    // Close connection
    await mongoose.connection.close();
    console.log('\n🔌 Connection closed.');
    process.exit(0);
  }
}

// Run the test
testConnection();
