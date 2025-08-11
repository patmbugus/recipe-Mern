# FlavorShare Backend

A modern Node.js/Express backend for the FlavorShare recipe sharing platform with MongoDB integration.

## 🗄️ MongoDB Database Schema

### 1. User Collection (`users`)
```javascript
{
  _id: ObjectId,           // MongoDB auto-generated ID
  username: String,         // Unique username (required)
  email: String,           // Unique email (required)
  passwordHash: String,    // Bcrypt hashed password (required)
  profileImage: String,    // URL to profile image (optional)
  favorites: [ObjectId],   // Array of favorite recipe IDs
  createdAt: Date,         // Account creation timestamp
  updatedAt: Date          // Last update timestamp
}
```

### 2. Recipe Collection (`recipes`)
```javascript
{
  _id: ObjectId,           // MongoDB auto-generated ID
  title: String,           // Recipe title (required)
  description: String,     // Recipe description (required)
  ingredients: [String],   // Array of ingredients (required)
  steps: [String],         // Array of cooking steps (required)
  images: [String],        // Array of image URLs (optional)
  cuisine: String,         // Cuisine type (required)
  dietaryType: String,     // Dietary preference (enum: Vegan, Vegetarian, Gluten-Free, None)
  prepTime: Number,        // Preparation time in minutes (required)
  createdBy: ObjectId,     // Reference to User who created the recipe
  likes: [ObjectId],       // Array of user IDs who liked the recipe
  rating: Number,          // Average rating (0-5)
  createdAt: Date,         // Recipe creation timestamp
  updatedAt: Date          // Last update timestamp
}
```

### 3. Comment Collection (`comments`)
```javascript
{
  _id: ObjectId,           // MongoDB auto-generated ID
  recipeId: ObjectId,      // Reference to Recipe
  userId: ObjectId,        // Reference to User who made the comment
  text: String,            // Comment text (required)
  createdAt: Date          // Comment creation timestamp
}
```

## 🔗 MongoDB Connection Setup

### Prerequisites
1. **Install MongoDB** on your system
2. **Install MongoDB Compass** (optional but recommended for database management)

### Option 1: Local MongoDB Installation

#### Windows:
1. Download MongoDB Community Server from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Install with default settings
3. MongoDB service should start automatically
4. Default connection: `mongodb://localhost:27017`

#### macOS:
```bash
# Using Homebrew
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb/brew/mongodb-community
```

#### Linux (Ubuntu):
```bash
# Import MongoDB public GPG key
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -

# Create list file for MongoDB
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Update package database
sudo apt-get update

# Install MongoDB
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod
```

### Option 2: MongoDB Atlas (Cloud - Recommended for Production)

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account
3. Create a new cluster
4. Set up database access (username/password)
5. Set up network access (IP whitelist)
6. Get connection string

## ⚙️ Environment Configuration

Create a `.env` file in the backend directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/flavorshare

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Optional: MongoDB Atlas Connection
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/flavorshare?retryWrites=true&w=majority
```

## 🚀 Running the Backend

### 1. Install Dependencies
```bash
cd flavorshare/backend
npm install
```

### 2. Start MongoDB Service
Make sure MongoDB is running on your system.

### 3. Seed the Database (Optional)
```bash
npm run seed
```

### 4. Start the Server
```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

## 🔍 Database Operations

### Connect to MongoDB
```javascript
// In server.js
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('MongoDB connected successfully');
})
.catch(err => {
    console.error('MongoDB connection error:', err);
});
```

### Basic CRUD Operations

#### Create (POST)
```javascript
// Create a new recipe
const newRecipe = new Recipe({
    title: 'Spaghetti Carbonara',
    description: 'Classic Italian pasta dish',
    ingredients: ['pasta', 'eggs', 'cheese'],
    steps: ['Boil pasta', 'Mix ingredients'],
    cuisine: 'Italian',
    prepTime: 30,
    createdBy: userId
});

await newRecipe.save();
```

#### Read (GET)
```javascript
// Get all recipes
const recipes = await Recipe.find().populate('createdBy', 'username');

// Get recipe by ID
const recipe = await Recipe.findById(recipeId).populate('createdBy', 'username');

// Search recipes
const searchResults = await Recipe.find({
    $or: [
        { title: { $regex: searchTerm, $options: 'i' } },
        { description: { $regex: searchTerm, $options: 'i' } }
    ]
});
```

#### Update (PUT)
```javascript
// Update a recipe
const updatedRecipe = await Recipe.findByIdAndUpdate(
    recipeId,
    { title: 'New Title', updatedAt: Date.now() },
    { new: true }
);
```

#### Delete (DELETE)
```javascript
// Delete a recipe
await Recipe.findByIdAndDelete(recipeId);
```

## 🛡️ Security Features

- **JWT Authentication** for protected routes
- **Password Hashing** with bcryptjs
- **Input Validation** with express-validator
- **Rate Limiting** to prevent abuse
- **CORS Configuration** for frontend integration
- **Helmet** for security headers

## 📊 Database Indexes

MongoDB automatically creates indexes on:
- `_id` field (primary key)
- `username` and `email` in users collection (unique)
- `createdBy` in recipes collection (for user queries)

### Recommended Custom Indexes
```javascript
// In your models or database setup
// Users collection
db.users.createIndex({ "email": 1 }, { unique: true });
db.users.createIndex({ "username": 1 }, { unique: true });

// Recipes collection
db.recipes.createIndex({ "title": "text", "description": "text" });
db.recipes.createIndex({ "cuisine": 1 });
db.recipes.createIndex({ "dietaryType": 1 });
db.recipes.createIndex({ "prepTime": 1 });
db.recipes.createIndex({ "createdAt": -1 });

// Comments collection
db.comments.createIndex({ "recipeId": 1 });
db.comments.createIndex({ "createdAt": -1 });
```

## 🧪 Testing the API

### Health Check
```bash
curl http://localhost:5000/api/health
```

### Authentication
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Recipes
```bash
# Get all recipes
curl http://localhost:5000/api/recipes

# Get recipe by ID
curl http://localhost:5000/api/recipes/[RECIPE_ID]
```

## 🚨 Troubleshooting

### Common Issues

1. **MongoDB Connection Failed**
   - Check if MongoDB service is running
   - Verify connection string in `.env`
   - Check firewall settings

2. **Port Already in Use**
   - Change PORT in `.env` file
   - Kill process using the port: `npx kill-port 5000`

3. **JWT Errors**
   - Ensure JWT_SECRET is set in `.env`
   - Check token expiration

4. **CORS Issues**
   - Verify frontend URL in CORS configuration
   - Check if frontend is running on correct port

### Debug Mode
```bash
# Enable debug logging
DEBUG=* npm run dev
```

## 📚 Additional Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [Express.js Documentation](https://expressjs.com/)
- [JWT.io](https://jwt.io/) for token debugging