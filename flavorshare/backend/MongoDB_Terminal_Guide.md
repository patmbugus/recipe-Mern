# 🗄️ MongoDB Terminal Commands Guide

This guide provides all the terminal commands you need to manually set up the FlavorShare database schema and populate it with mock data.

## 📋 Prerequisites

1. **MongoDB installed and running** on your system
2. **MongoDB Shell (mongosh)** or **MongoDB Compass** installed
3. **Terminal/Command Prompt** access

## 🚀 Quick Setup (Recommended)

### Option 1: Automated Setup Script
```bash
# Navigate to backend directory
cd "flavorshare/backend"

# Install dependencies
npm install

# Run the automated setup script
npm run setup-db
```

### Option 2: Manual Terminal Commands
Follow the step-by-step commands below.

## 🔧 Manual MongoDB Setup Commands

### 1. Connect to MongoDB
```bash
# Connect to MongoDB shell
mongosh

# Or connect to specific database
mongosh mongodb://localhost:27017/flavorshare
```

### 2. Create and Use Database
```javascript
// Switch to flavorshare database
use flavorshare

// Show current database
db
```

### 3. Create Collections
```javascript
// Create users collection
db.createCollection("users")

// Create recipes collection
db.createCollection("recipes")

// Create comments collection
db.createCollection("comments")

// List all collections
show collections
```

### 4. Create Database Indexes

#### Users Collection Indexes
```javascript
// Unique index on email
db.users.createIndex({ "email": 1 }, { unique: true })

// Unique index on username
db.users.createIndex({ "username": 1 }, { unique: true })

// Verify indexes
db.users.getIndexes()
```

#### Recipes Collection Indexes
```javascript
// Text search index on title and description
db.recipes.createIndex({ "title": "text", "description": "text" })

// Index on cuisine for filtering
db.recipes.createIndex({ "cuisine": 1 })

// Index on dietary type for filtering
db.recipes.createIndex({ "dietaryType": 1 })

// Index on preparation time for filtering
db.recipes.createIndex({ "prepTime": 1 })

// Index on creation date for sorting
db.recipes.createIndex({ "createdAt": -1 })

// Index on rating for sorting
db.recipes.createIndex({ "rating": -1 })

// Verify indexes
db.recipes.getIndexes()
```

#### Comments Collection Indexes
```javascript
// Index on recipe ID for quick lookups
db.comments.createIndex({ "recipeId": 1 })

// Index on creation date for sorting
db.comments.createIndex({ "createdAt": -1 })

// Verify indexes
db.comments.getIndexes()
```

### 5. Insert Mock Users
```javascript
// Insert users with hashed passwords (password123)
db.users.insertMany([
  {
    username: "chef_john",
    email: "john@example.com",
    passwordHash: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4tbQZ8Kz6O",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    favorites: [],
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15")
  },
  {
    username: "culinary_mary",
    email: "mary@example.com",
    passwordHash: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4tbQZ8Kz6O",
    profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    favorites: [],
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-20")
  },
  {
    username: "foodie_david",
    email: "david@example.com",
    passwordHash: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4tbQZ8Kz6O",
    profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    favorites: [],
    createdAt: new Date("2024-01-25"),
    updatedAt: new Date("2024-01-25")
  },
  {
    username: "baking_sarah",
    email: "sarah@example.com",
    passwordHash: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4tbQZ8Kz6O",
    profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    favorites: [],
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-02-01")
  },
  {
    username: "vegan_mike",
    email: "mike@example.com",
    passwordHash: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4tbQZ8Kz6O",
    profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    favorites: [],
    createdAt: new Date("2024-02-05"),
    updatedAt: new Date("2024-02-05")
  }
])

// Verify users were inserted
db.users.find().pretty()
```

### 6. Insert Mock Recipes
```javascript
// Get user IDs for reference
const userIds = db.users.find({}, {_id: 1}).toArray().map(u => u._id)

// Insert recipes
db.recipes.insertMany([
  {
    title: "Classic Spaghetti Carbonara",
    description: "A traditional Italian pasta dish made with eggs, cheese, pancetta, and black pepper. Simple yet incredibly flavorful.",
    ingredients: [
      "400g spaghetti",
      "200g pancetta or guanciale, cubed",
      "4 large eggs",
      "100g Pecorino Romano cheese, grated",
      "100g Parmigiano-Reggiano cheese, grated",
      "Freshly ground black pepper",
      "Salt for pasta water"
    ],
    steps: [
      "Bring a large pot of salted water to boil and cook spaghetti according to package directions.",
      "While pasta cooks, heat a large skillet over medium heat and cook pancetta until crispy, about 8-10 minutes.",
      "In a bowl, whisk together eggs, grated cheeses, and plenty of black pepper.",
      "Drain pasta, reserving 1 cup of pasta water.",
      "Add hot pasta to the skillet with pancetta, remove from heat.",
      "Quickly stir in egg mixture, adding pasta water as needed to create a creamy sauce.",
      "Serve immediately with extra cheese and black pepper on top."
    ],
    images: [
      "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=600&h=400&fit=crop"
    ],
    cuisine: "Italian",
    dietaryType: "None",
    prepTime: 25,
    createdBy: userIds[0],
    likes: [userIds[1]],
    rating: 4.8,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15")
  },
  {
    title: "Vegetarian Buddha Bowl",
    description: "A healthy and colorful bowl packed with quinoa, roasted vegetables, and a delicious tahini dressing.",
    ingredients: [
      "1 cup quinoa",
      "2 cups vegetable broth",
      "1 sweet potato, cubed",
      "2 cups broccoli florets",
      "1 red bell pepper, sliced",
      "1 cup chickpeas, drained and rinsed",
      "2 tbsp olive oil",
      "Salt and pepper to taste",
      "1/4 cup tahini",
      "2 tbsp lemon juice",
      "2 tbsp maple syrup",
      "2 tbsp water",
      "Fresh herbs for garnish"
    ],
    steps: [
      "Preheat oven to 400°F (200°C).",
      "Cook quinoa in vegetable broth according to package directions.",
      "Toss sweet potato, broccoli, bell pepper, and chickpeas with olive oil, salt, and pepper.",
      "Spread vegetables on a baking sheet and roast for 25-30 minutes until tender.",
      "Make tahini dressing by whisking together tahini, lemon juice, maple syrup, and water.",
      "Assemble bowls with quinoa base, roasted vegetables, and drizzle with tahini dressing.",
      "Garnish with fresh herbs and serve."
    ],
    images: [
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&h=400&fit=crop"
    ],
    cuisine: "International",
    dietaryType: "Vegan",
    prepTime: 45,
    createdBy: userIds[1],
    likes: [userIds[2]],
    rating: 4.6,
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-20")
  },
  {
    title: "Thai Green Curry",
    description: "A fragrant and spicy Thai curry with coconut milk, green curry paste, and fresh vegetables.",
    ingredients: [
      "2 tbsp vegetable oil",
      "2 tbsp green curry paste",
      "400ml coconut milk",
      "2 chicken breasts, sliced (or tofu for vegetarian)",
      "1 eggplant, cubed",
      "1 red bell pepper, sliced",
      "1 cup green beans",
      "2 tbsp fish sauce (or soy sauce for vegetarian)",
      "1 tbsp palm sugar",
      "Fresh Thai basil leaves",
      "Jasmine rice for serving"
    ],
    steps: [
      "Heat oil in a large wok or deep pan over medium heat.",
      "Add green curry paste and fry for 1-2 minutes until fragrant.",
      "Pour in coconut milk and bring to a gentle simmer.",
      "Add chicken (or tofu) and cook for 5-7 minutes.",
      "Add vegetables and simmer for 8-10 minutes until tender.",
      "Season with fish sauce and palm sugar to taste.",
      "Garnish with Thai basil and serve hot with jasmine rice."
    ],
    images: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&h=400&fit=crop"
    ],
    cuisine: "Thai",
    dietaryType: "None",
    prepTime: 35,
    createdBy: userIds[2],
    likes: [userIds[3]],
    rating: 4.7,
    createdAt: new Date("2024-01-25"),
    updatedAt: new Date("2024-01-25")
  },
  {
    title: "Chocolate Chip Cookies",
    description: "Classic homemade chocolate chip cookies with crispy edges and chewy centers.",
    ingredients: [
      "2 1/4 cups all-purpose flour",
      "1 tsp baking soda",
      "1 tsp salt",
      "1 cup unsalted butter, softened",
      "3/4 cup granulated sugar",
      "3/4 cup brown sugar",
      "2 large eggs",
      "2 tsp vanilla extract",
      "2 cups chocolate chips",
      "1 cup chopped nuts (optional)"
    ],
    steps: [
      "Preheat oven to 375°F (190°C).",
      "In a bowl, whisk together flour, baking soda, and salt.",
      "In a large bowl, cream butter and both sugars until light and fluffy.",
      "Beat in eggs one at a time, then stir in vanilla.",
      "Gradually mix in flour mixture, then fold in chocolate chips and nuts.",
      "Drop rounded tablespoons of dough onto ungreased baking sheets.",
      "Bake for 9-11 minutes until golden brown around edges.",
      "Cool on baking sheets for 2 minutes, then transfer to wire racks."
    ],
    images: [
      "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&h=400&fit=crop"
    ],
    cuisine: "American",
    dietaryType: "None",
    prepTime: 30,
    createdBy: userIds[3],
    likes: [userIds[4]],
    rating: 4.9,
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-02-01")
  },
  {
    title: "Mediterranean Quinoa Salad",
    description: "A refreshing salad with quinoa, fresh vegetables, olives, and feta cheese in a lemon-herb dressing.",
    ingredients: [
      "1 cup quinoa",
      "2 cups water",
      "1 cucumber, diced",
      "1 cup cherry tomatoes, halved",
      "1/2 red onion, finely diced",
      "1/2 cup Kalamata olives, pitted and sliced",
      "1/2 cup feta cheese, crumbled",
      "1/4 cup fresh parsley, chopped",
      "1/4 cup fresh mint, chopped",
      "3 tbsp olive oil",
      "2 tbsp lemon juice",
      "1 clove garlic, minced",
      "Salt and pepper to taste"
    ],
    steps: [
      "Rinse quinoa thoroughly and cook in water according to package directions.",
      "Let quinoa cool completely.",
      "In a large bowl, combine cooled quinoa with cucumber, tomatoes, onion, olives, and feta.",
      "In a small bowl, whisk together olive oil, lemon juice, garlic, salt, and pepper.",
      "Pour dressing over salad and toss gently to combine.",
      "Stir in fresh herbs and refrigerate for at least 30 minutes before serving.",
      "Serve chilled as a side dish or light meal."
    ],
    images: [
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop"
    ],
    cuisine: "Mediterranean",
    dietaryType: "Vegetarian",
    prepTime: 40,
    createdBy: userIds[4],
    likes: [userIds[0]],
    rating: 4.5,
    createdAt: new Date("2024-02-05"),
    updatedAt: new Date("2024-02-05")
  },
  {
    title: "Japanese Ramen",
    description: "A comforting bowl of ramen with rich broth, tender noodles, and perfectly cooked toppings.",
    ingredients: [
      "4 cups chicken or vegetable broth",
      "2 tbsp soy sauce",
      "1 tbsp miso paste",
      "1 tbsp mirin",
      "2 cloves garlic, minced",
      "1 inch ginger, grated",
      "2 portions ramen noodles",
      "2 soft-boiled eggs",
      "2 slices pork belly or tofu",
      "1 cup spinach",
      "2 green onions, sliced",
      "Nori sheets, torn",
      "Sesame seeds for garnish"
    ],
    steps: [
      "In a large pot, combine broth, soy sauce, miso paste, mirin, garlic, and ginger.",
      "Bring to a simmer and let flavors meld for 15 minutes.",
      "Cook ramen noodles according to package directions.",
      "In a separate pan, cook pork belly or tofu until crispy.",
      "Divide noodles between two bowls and ladle hot broth over them.",
      "Top with soft-boiled eggs, pork/tofu, spinach, green onions, and nori.",
      "Garnish with sesame seeds and serve immediately."
    ],
    images: [
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1557872943-5a7c4d2be8f7?w=600&h=400&fit=crop"
    ],
    cuisine: "Japanese",
    dietaryType: "None",
    prepTime: 50,
    createdBy: userIds[0],
    likes: [userIds[1]],
    rating: 4.8,
    createdAt: new Date("2024-02-10"),
    updatedAt: new Date("2024-02-10")
  }
])

// Verify recipes were inserted
db.recipes.find().pretty()
```

### 7. Insert Mock Comments
```javascript
// Get recipe IDs for reference
const recipeIds = db.recipes.find({}, {_id: 1}).toArray().map(r => r._id)

// Insert comments
db.comments.insertMany([
  {
    recipeId: recipeIds[0],
    userId: userIds[1],
    text: "This carbonara recipe is absolutely perfect! The pancetta adds such a nice smoky flavor.",
    createdAt: new Date("2024-01-16")
  },
  {
    recipeId: recipeIds[0],
    userId: userIds[2],
    text: "I made this for dinner last night and my family loved it. Will definitely make again!",
    createdAt: new Date("2024-01-17")
  },
  {
    recipeId: recipeIds[1],
    userId: userIds[2],
    text: "The tahini dressing in this Buddha bowl is incredible. So creamy and flavorful!",
    createdAt: new Date("2024-01-21")
  },
  {
    recipeId: recipeIds[1],
    userId: userIds[3],
    text: "Perfect for meal prep! I made a big batch and it lasted all week.",
    createdAt: new Date("2024-01-22")
  },
  {
    recipeId: recipeIds[2],
    userId: userIds[3],
    text: "This green curry is restaurant-quality! The coconut milk makes it so rich and creamy.",
    createdAt: new Date("2024-01-26")
  },
  {
    recipeId: recipeIds[2],
    userId: userIds[4],
    text: "I added some extra vegetables and it turned out amazing. Great recipe!",
    createdAt: new Date("2024-01-27")
  },
  {
    recipeId: recipeIds[3],
    userId: userIds[4],
    text: "These cookies are the best I've ever made! Crispy on the outside, chewy in the middle.",
    createdAt: new Date("2024-02-02")
  },
  {
    recipeId: recipeIds[3],
    userId: userIds[0],
    text: "My kids couldn't stop eating them. Perfect for school lunches!",
    createdAt: new Date("2024-02-03")
  },
  {
    recipeId: recipeIds[4],
    userId: userIds[0],
    text: "This quinoa salad is so refreshing and healthy. Perfect summer dish!",
    createdAt: new Date("2024-02-06")
  },
  {
    recipeId: recipeIds[4],
    userId: userIds[1],
    text: "I love how colorful and nutritious this is. Great for potlucks!",
    createdAt: new Date("2024-02-07")
  },
  {
    recipeId: recipeIds[5],
    userId: userIds[1],
    text: "Authentic ramen at home! The broth is so flavorful and the toppings are perfect.",
    createdAt: new Date("2024-02-11")
  },
  {
    recipeId: recipeIds[5],
    userId: userIds[2],
    text: "I used vegetable broth and tofu to make it vegetarian. Still delicious!",
    createdAt: new Date("2024-02-12")
  }
])

// Verify comments were inserted
db.comments.find().pretty()
```

### 8. Update User Favorites
```javascript
// Update each user with favorite recipes
db.users.updateOne(
  { _id: userIds[0] },
  { $set: { favorites: [recipeIds[0], recipeIds[1]] } }
)

db.users.updateOne(
  { _id: userIds[1] },
  { $set: { favorites: [recipeIds[2], recipeIds[3]] } }
)

db.users.updateOne(
  { _id: userIds[2] },
  { $set: { favorites: [recipeIds[4], recipeIds[5]] } }
)

db.users.updateOne(
  { _id: userIds[3] },
  { $set: { favorites: [recipeIds[0], recipeIds[2]] } }
)

db.users.updateOne(
  { _id: userIds[4] },
  { $set: { favorites: [recipeIds[1], recipeIds[4]] } }
)

// Verify favorites were updated
db.users.find({}, {username: 1, favorites: 1}).pretty()
```

### 9. Verify Database Setup
```javascript
// Check database statistics
print("📊 Database Statistics:")
print("Users: " + db.users.countDocuments())
print("Recipes: " + db.recipes.countDocuments())
print("Comments: " + db.comments.countDocuments())

// Check indexes
print("\n🔍 Database Indexes:")
print("Users indexes:")
db.users.getIndexes()
print("Recipes indexes:")
db.recipes.getIndexes()
print("Comments indexes:")
db.comments.getIndexes()

// Sample queries
print("\n🔍 Sample Queries:")

// Find all Italian recipes
print("Italian recipes:")
db.recipes.find({cuisine: "Italian"}).pretty()

// Find vegan recipes
print("Vegan recipes:")
db.recipes.find({dietaryType: "Vegan"}).pretty()

// Find recipes with rating > 4.5
print("High-rated recipes (>4.5):")
db.recipes.find({rating: {$gt: 4.5}}).pretty()

// Find recipes by specific user
print("Recipes by chef_john:")
db.recipes.find({createdBy: userIds[0]}).pretty()

// Text search
print("Recipes containing 'pasta':")
db.recipes.find({$text: {$search: "pasta"}}).pretty()
```

## 🧪 Testing the Database

### Test User Authentication
```javascript
// Find user by email
db.users.findOne({email: "john@example.com"})

// Find user by username
db.users.findOne({username: "chef_john"})

// Check if password hash exists
db.users.findOne({email: "john@example.com"}, {passwordHash: 1})
```

### Test Recipe Queries
```javascript
// Find all recipes with user info
db.recipes.aggregate([
  {
    $lookup: {
      from: "users",
      localField: "createdBy",
      foreignField: "_id",
      as: "creator"
    }
  },
  {
    $project: {
      title: 1,
      cuisine: 1,
      rating: 1,
      "creator.username": 1
    }
  }
])

// Find recipes with comments count
db.recipes.aggregate([
  {
    $lookup: {
      from: "comments",
      localField: "_id",
      foreignField: "recipeId",
      as: "comments"
    }
  },
  {
    $project: {
      title: 1,
      cuisine: 1,
      commentCount: {$size: "$comments"}
    }
  }
])
```

## 🗑️ Cleanup Commands

### Drop Collections
```javascript
// Drop all collections
db.users.drop()
db.recipes.drop()
db.comments.drop()

// Drop entire database
db.dropDatabase()
```

### Remove Specific Documents
```javascript
// Remove all documents from a collection
db.users.deleteMany({})
db.recipes.deleteMany({})
db.comments.deleteMany({})

// Remove specific user
db.users.deleteOne({email: "john@example.com"})

// Remove recipes by specific user
db.recipes.deleteMany({createdBy: userIds[0]})
```

## 🔑 Test Account Credentials

After setup, you can use these credentials to test the application:

- **Email:** john@example.com
- **Password:** password123

## 🚀 Next Steps

1. **Start the Backend Server:**
   ```bash
   cd "flavorshare/backend"
   npm run dev
   ```

2. **Start the Frontend:**
   ```bash
   cd "flavorshare/client"
   npm start
   ```

3. **Test the Application:**
   - Open http://localhost:3000 in your browser
   - Login with the test credentials
   - Browse recipes, add comments, and test all features

## 🚨 Troubleshooting

### Common Issues

1. **Connection Refused:**
   - Make sure MongoDB service is running
   - Check if port 27017 is available

2. **Authentication Failed:**
   - Verify MongoDB is running without authentication
   - Check connection string

3. **Index Creation Failed:**
   - Ensure collections exist before creating indexes
   - Check for duplicate key errors

### Useful Commands

```javascript
// Check MongoDB status
db.serverStatus()

// Check database stats
db.stats()

// Check collection stats
db.users.stats()
db.recipes.stats()
db.comments.stats()

// Monitor database operations
db.currentOp()

// Kill long-running operations
db.killOp(opId)
```

## 📚 Additional Resources

- [MongoDB Manual](https://docs.mongodb.com/manual/)
- [MongoDB Shell Reference](https://docs.mongodb.com/mongodb-shell/)
- [MongoDB Aggregation Pipeline](https://docs.mongodb.com/manual/core/aggregation-pipeline/)
- [MongoDB Indexes](https://docs.mongodb.com/manual/indexes/)

---

**🎉 Congratulations!** Your MongoDB database is now set up with a complete schema and mock data. You can start developing and testing your FlavorShare application!
