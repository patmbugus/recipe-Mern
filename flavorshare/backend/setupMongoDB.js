const { MongoClient } = require('mongodb');

// MongoDB connection string
const MONGODB_URI = 'mongodb://localhost:27017';
const DATABASE_NAME = 'flavorshare';

// Mock data for users
const mockUsers = [
  {
    username: 'chef_john',
    email: 'john@example.com',
    passwordHash: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4tbQZ8Kz6O', // password123
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    favorites: [],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    username: 'culinary_mary',
    email: 'mary@example.com',
    passwordHash: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4tbQZ8Kz6O', // password123
    profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    favorites: [],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20')
  },
  {
    username: 'foodie_david',
    email: 'david@example.com',
    passwordHash: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4tbQZ8Kz6O', // password123
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    favorites: [],
    createdAt: new Date('2024-01-25'),
    updatedAt: new Date('2024-01-25')
  },
  {
    username: 'baking_sarah',
    email: 'sarah@example.com',
    passwordHash: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4tbQZ8Kz6O', // password123
    profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    favorites: [],
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01')
  },
  {
    username: 'vegan_mike',
    email: 'mike@example.com',
    passwordHash: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4tbQZ8Kz6O', // password123
    profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    favorites: [],
    createdAt: new Date('2024-02-05'),
    updatedAt: new Date('2024-02-05')
  }
];

// Mock data for recipes
const mockRecipes = [
  {
    title: 'Classic Spaghetti Carbonara',
    description: 'A traditional Italian pasta dish made with eggs, cheese, pancetta, and black pepper. Simple yet incredibly flavorful.',
    ingredients: [
      '400g spaghetti',
      '200g pancetta or guanciale, cubed',
      '4 large eggs',
      '100g Pecorino Romano cheese, grated',
      '100g Parmigiano-Reggiano cheese, grated',
      'Freshly ground black pepper',
      'Salt for pasta water'
    ],
    steps: [
      'Bring a large pot of salted water to boil and cook spaghetti according to package directions.',
      'While pasta cooks, heat a large skillet over medium heat and cook pancetta until crispy, about 8-10 minutes.',
      'In a bowl, whisk together eggs, grated cheeses, and plenty of black pepper.',
      'Drain pasta, reserving 1 cup of pasta water.',
      'Add hot pasta to the skillet with pancetta, remove from heat.',
      'Quickly stir in egg mixture, adding pasta water as needed to create a creamy sauce.',
      'Serve immediately with extra cheese and black pepper on top.'
    ],
    images: [
      'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=600&h=400&fit=crop'
    ],
    cuisine: 'Italian',
    dietaryType: 'None',
    prepTime: 25,
    likes: [],
    rating: 4.8,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    title: 'Vegetarian Buddha Bowl',
    description: 'A healthy and colorful bowl packed with quinoa, roasted vegetables, and a delicious tahini dressing.',
    ingredients: [
      '1 cup quinoa',
      '2 cups vegetable broth',
      '1 sweet potato, cubed',
      '2 cups broccoli florets',
      '1 red bell pepper, sliced',
      '1 cup chickpeas, drained and rinsed',
      '2 tbsp olive oil',
      'Salt and pepper to taste',
      '1/4 cup tahini',
      '2 tbsp lemon juice',
      '2 tbsp maple syrup',
      '2 tbsp water',
      'Fresh herbs for garnish'
    ],
    steps: [
      'Preheat oven to 400°F (200°C).',
      'Cook quinoa in vegetable broth according to package directions.',
      'Toss sweet potato, broccoli, bell pepper, and chickpeas with olive oil, salt, and pepper.',
      'Spread vegetables on a baking sheet and roast for 25-30 minutes until tender.',
      'Make tahini dressing by whisking together tahini, lemon juice, maple syrup, and water.',
      'Assemble bowls with quinoa base, roasted vegetables, and drizzle with tahini dressing.',
      'Garnish with fresh herbs and serve.'
    ],
    images: [
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&h=400&fit=crop'
    ],
    cuisine: 'International',
    dietaryType: 'Vegan',
    prepTime: 45,
    likes: [],
    rating: 4.6,
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20')
  },
  {
    title: 'Thai Green Curry',
    description: 'A fragrant and spicy Thai curry with coconut milk, green curry paste, and fresh vegetables.',
    ingredients: [
      '2 tbsp vegetable oil',
      '2 tbsp green curry paste',
      '400ml coconut milk',
      '2 chicken breasts, sliced (or tofu for vegetarian)',
      '1 eggplant, cubed',
      '1 red bell pepper, sliced',
      '1 cup green beans',
      '2 tbsp fish sauce (or soy sauce for vegetarian)',
      '1 tbsp palm sugar',
      'Fresh Thai basil leaves',
      'Jasmine rice for serving'
    ],
    steps: [
      'Heat oil in a large wok or deep pan over medium heat.',
      'Add green curry paste and fry for 1-2 minutes until fragrant.',
      'Pour in coconut milk and bring to a gentle simmer.',
      'Add chicken (or tofu) and cook for 5-7 minutes.',
      'Add vegetables and simmer for 8-10 minutes until tender.',
      'Season with fish sauce and palm sugar to taste.',
      'Garnish with Thai basil and serve hot with jasmine rice.'
    ],
    images: [
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&h=400&fit=crop'
    ],
    cuisine: 'Thai',
    dietaryType: 'None',
    prepTime: 35,
    likes: [],
    rating: 4.7,
    createdAt: new Date('2024-01-25'),
    updatedAt: new Date('2024-01-25')
  },
  {
    title: 'Chocolate Chip Cookies',
    description: 'Classic homemade chocolate chip cookies with crispy edges and chewy centers.',
    ingredients: [
      '2 1/4 cups all-purpose flour',
      '1 tsp baking soda',
      '1 tsp salt',
      '1 cup unsalted butter, softened',
      '3/4 cup granulated sugar',
      '3/4 cup brown sugar',
      '2 large eggs',
      '2 tsp vanilla extract',
      '2 cups chocolate chips',
      '1 cup chopped nuts (optional)'
    ],
    steps: [
      'Preheat oven to 375°F (190°C).',
      'In a bowl, whisk together flour, baking soda, and salt.',
      'In a large bowl, cream butter and both sugars until light and fluffy.',
      'Beat in eggs one at a time, then stir in vanilla.',
      'Gradually mix in flour mixture, then fold in chocolate chips and nuts.',
      'Drop rounded tablespoons of dough onto ungreased baking sheets.',
      'Bake for 9-11 minutes until golden brown around edges.',
      'Cool on baking sheets for 2 minutes, then transfer to wire racks.'
    ],
    images: [
      'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&h=400&fit=crop'
    ],
    cuisine: 'American',
    dietaryType: 'None',
    prepTime: 30,
    likes: [],
    rating: 4.9,
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01')
  },
  {
    title: 'Mediterranean Quinoa Salad',
    description: 'A refreshing salad with quinoa, fresh vegetables, olives, and feta cheese in a lemon-herb dressing.',
    ingredients: [
      '1 cup quinoa',
      '2 cups water',
      '1 cucumber, diced',
      '1 cup cherry tomatoes, halved',
      '1/2 red onion, finely diced',
      '1/2 cup Kalamata olives, pitted and sliced',
      '1/2 cup feta cheese, crumbled',
      '1/4 cup fresh parsley, chopped',
      '1/4 cup fresh mint, chopped',
      '3 tbsp olive oil',
      '2 tbsp lemon juice',
      '1 clove garlic, minced',
      'Salt and pepper to taste'
    ],
    steps: [
      'Rinse quinoa thoroughly and cook in water according to package directions.',
      'Let quinoa cool completely.',
      'In a large bowl, combine cooled quinoa with cucumber, tomatoes, onion, olives, and feta.',
      'In a small bowl, whisk together olive oil, lemon juice, garlic, salt, and pepper.',
      'Pour dressing over salad and toss gently to combine.',
      'Stir in fresh herbs and refrigerate for at least 30 minutes before serving.',
      'Serve chilled as a side dish or light meal.'
    ],
    images: [
      'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop'
    ],
    cuisine: 'Mediterranean',
    dietaryType: 'Vegetarian',
    prepTime: 40,
    likes: [],
    rating: 4.5,
    createdAt: new Date('2024-02-05'),
    updatedAt: new Date('2024-02-05')
  },
  {
    title: 'Japanese Ramen',
    description: 'A comforting bowl of ramen with rich broth, tender noodles, and perfectly cooked toppings.',
    ingredients: [
      '4 cups chicken or vegetable broth',
      '2 tbsp soy sauce',
      '1 tbsp miso paste',
      '1 tbsp mirin',
      '2 cloves garlic, minced',
      '1 inch ginger, grated',
      '2 portions ramen noodles',
      '2 soft-boiled eggs',
      '2 slices pork belly or tofu',
      '1 cup spinach',
      '2 green onions, sliced',
      'Nori sheets, torn',
      'Sesame seeds for garnish'
    ],
    steps: [
      'In a large pot, combine broth, soy sauce, miso paste, mirin, garlic, and ginger.',
      'Bring to a simmer and let flavors meld for 15 minutes.',
      'Cook ramen noodles according to package directions.',
      'In a separate pan, cook pork belly or tofu until crispy.',
      'Divide noodles between two bowls and ladle hot broth over them.',
      'Top with soft-boiled eggs, pork/tofu, spinach, green onions, and nori.',
      'Garnish with sesame seeds and serve immediately.'
    ],
    images: [
      'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1557872943-5a7c4d2be8f7?w=600&h=400&fit=crop'
    ],
    cuisine: 'Japanese',
    dietaryType: 'None',
    prepTime: 50,
    likes: [],
    rating: 4.8,
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-02-10')
  }
];

// Mock data for comments
const mockComments = [
  {
    text: 'This carbonara recipe is absolutely perfect! The pancetta adds such a nice smoky flavor.',
    createdAt: new Date('2024-01-16')
  },
  {
    text: 'I made this for dinner last night and my family loved it. Will definitely make again!',
    createdAt: new Date('2024-01-17')
  },
  {
    text: 'The tahini dressing in this Buddha bowl is incredible. So creamy and flavorful!',
    createdAt: new Date('2024-01-21')
  },
  {
    text: 'Perfect for meal prep! I made a big batch and it lasted all week.',
    createdAt: new Date('2024-01-22')
  },
  {
    text: 'This green curry is restaurant-quality! The coconut milk makes it so rich and creamy.',
    createdAt: new Date('2024-01-26')
  },
  {
    text: 'I added some extra vegetables and it turned out amazing. Great recipe!',
    createdAt: new Date('2024-01-27')
  },
  {
    text: 'These cookies are the best I\'ve ever made! Crispy on the outside, chewy in the middle.',
    createdAt: new Date('2024-02-02')
  },
  {
    text: 'My kids couldn\'t stop eating them. Perfect for school lunches!',
    createdAt: new Date('2024-02-03')
  },
  {
    text: 'This quinoa salad is so refreshing and healthy. Perfect summer dish!',
    createdAt: new Date('2024-02-06')
  },
  {
    text: 'I love how colorful and nutritious this is. Great for potlucks!',
    createdAt: new Date('2024-02-07')
  },
  {
    text: 'Authentic ramen at home! The broth is so flavorful and the toppings are perfect.',
    createdAt: new Date('2024-02-11')
  },
  {
    text: 'I used vegetable broth and tofu to make it vegetarian. Still delicious!',
    createdAt: new Date('2024-02-12')
  }
];

async function setupMongoDB() {
  let client;
  
  try {
    console.log('🔌 Connecting to MongoDB...');
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    console.log('✅ Connected to MongoDB successfully!');
    
    const db = client.db(DATABASE_NAME);
    
    // Drop existing database if it exists
    console.log('\n🗑️ Dropping existing database...');
    await client.db(DATABASE_NAME).dropDatabase();
    console.log('✅ Database dropped successfully!');
    
    // Create collections
    console.log('\n📚 Creating collections...');
    const usersCollection = db.collection('users');
    const recipesCollection = db.collection('recipes');
    const commentsCollection = db.collection('comments');
    
    console.log('✅ Collections created successfully!');
    
    // Create indexes
    console.log('\n🔍 Creating database indexes...');
    
    // Users indexes
    await usersCollection.createIndex({ "email": 1 }, { unique: true });
    await usersCollection.createIndex({ "username": 1 }, { unique: true });
    console.log('✅ User indexes created');
    
    // Recipes indexes
    await recipesCollection.createIndex({ "title": "text", "description": "text" });
    await recipesCollection.createIndex({ "cuisine": 1 });
    await recipesCollection.createIndex({ "dietaryType": 1 });
    await recipesCollection.createIndex({ "prepTime": 1 });
    await recipesCollection.createIndex({ "createdAt": -1 });
    await recipesCollection.createIndex({ "rating": -1 });
    console.log('✅ Recipe indexes created');
    
    // Comments indexes
    await commentsCollection.createIndex({ "recipeId": 1 });
    await commentsCollection.createIndex({ "createdAt": -1 });
    console.log('✅ Comment indexes created');
    
    // Insert mock users
    console.log('\n👥 Inserting mock users...');
    const userResult = await usersCollection.insertMany(mockUsers);
    console.log(`✅ ${userResult.insertedCount} users inserted successfully!`);
    
    // Get user IDs for recipes and comments
    const userIds = Object.values(userResult.insertedIds);
    
    // Insert mock recipes with user references
    console.log('\n🍳 Inserting mock recipes...');
    const recipesWithUsers = mockRecipes.map((recipe, index) => ({
      ...recipe,
      createdBy: userIds[index % userIds.length],
      likes: [userIds[(index + 1) % userIds.length]] // Each recipe gets one like from a different user
    }));
    
    const recipeResult = await recipesCollection.insertMany(recipesWithUsers);
    console.log(`✅ ${recipeResult.insertedCount} recipes inserted successfully!`);
    
    // Get recipe IDs for comments
    const recipeIds = Object.values(recipeResult.insertedIds);
    
    // Insert mock comments with user and recipe references
    console.log('\n💬 Inserting mock comments...');
    const commentsWithReferences = mockComments.map((comment, index) => ({
      ...comment,
      recipeId: recipeIds[index % recipeIds.length],
      userId: userIds[index % userIds.length]
    }));
    
    const commentResult = await commentsCollection.insertMany(commentsWithReferences);
    console.log(`✅ ${commentResult.insertedCount} comments inserted successfully!`);
    
    // Update user favorites
    console.log('\n❤️ Updating user favorites...');
    for (let i = 0; i < userIds.length; i++) {
      const userFavorites = recipeIds.slice(i * 2, (i + 1) * 2); // Each user gets 2 favorite recipes
      await usersCollection.updateOne(
        { _id: userIds[i] },
        { $set: { favorites: userFavorites } }
      );
    }
    console.log('✅ User favorites updated successfully!');
    
    // Display database statistics
    console.log('\n📊 Database Statistics:');
    const userCount = await usersCollection.countDocuments();
    const recipeCount = await recipesCollection.countDocuments();
    const commentCount = await commentsCollection.countDocuments();
    
    console.log(`👥 Users: ${userCount}`);
    console.log(`🍳 Recipes: ${recipeCount}`);
    console.log(`💬 Comments: ${commentCount}`);
    
    // Show sample data
    console.log('\n🔍 Sample Data Preview:');
    
    const sampleUser = await usersCollection.findOne({}, { projection: { passwordHash: 0 } });
    console.log('\n👤 Sample User:');
    console.log(JSON.stringify(sampleUser, null, 2));
    
    const sampleRecipe = await recipesCollection.findOne({}, { projection: { createdBy: 0 } });
    console.log('\n🍳 Sample Recipe:');
    console.log(JSON.stringify(sampleRecipe, null, 2));
    
    const sampleComment = await commentsCollection.findOne({}, { projection: { recipeId: 0, userId: 0 } });
    console.log('\n💬 Sample Comment:');
    console.log(JSON.stringify(sampleComment, null, 2));
    
    console.log('\n🎉 MongoDB database setup completed successfully!');
    console.log('\n🔑 Test Account Credentials:');
    console.log('Email: john@example.com');
    console.log('Password: password123');
    console.log('\n🌐 You can now start your backend server with: npm run dev');
    
  } catch (error) {
    console.error('❌ Error setting up MongoDB:', error);
    console.log('\n🔧 Troubleshooting tips:');
    console.log('1. Make sure MongoDB is running on your system');
    console.log('2. Check if MongoDB service is started');
    console.log('3. Verify connection string: mongodb://localhost:27017');
    console.log('4. Check firewall settings');
    
    if (error.message.includes('ECONNREFUSED')) {
      console.log('\n💡 MongoDB service might not be running. Try:');
      console.log('   - Windows: Check Services app for MongoDB');
      console.log('   - macOS: brew services start mongodb/brew/mongodb-community');
      console.log('   - Linux: sudo systemctl start mongod');
    }
  } finally {
    if (client) {
      await client.close();
      console.log('\n🔌 MongoDB connection closed.');
    }
    process.exit(0);
  }
}

// Run the setup
setupMongoDB();
