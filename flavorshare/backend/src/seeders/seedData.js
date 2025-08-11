const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('../models/User');
const Recipe = require('../models/Recipe');

dotenv.config();

const sampleUsers = [
  {
    username: 'chef_sarah',
    email: 'sarah@example.com',
    password: 'password123'
  },
  {
    username: 'foodie_mike',
    email: 'mike@example.com',
    password: 'password123'
  },
  {
    username: 'vegan_chef',
    email: 'vegan@example.com',
    password: 'password123'
  }
];

const sampleRecipes = [
  {
    title: 'Spaghetti Carbonara',
    description: 'Classic Italian pasta dish with eggs, cheese, pancetta, and black pepper. A simple yet delicious recipe that showcases the beauty of Italian cuisine.',
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
      'When pasta is al dente, reserve 1 cup of pasta water, then drain pasta.',
      'Working quickly, add hot pasta to the skillet with pancetta, remove from heat.',
      'Add egg mixture and toss vigorously, adding pasta water as needed to create a creamy sauce.',
      'Serve immediately with extra cheese and black pepper on top.'
    ],
    images: ['https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop'],
    cuisine: 'Italian',
    dietaryType: 'None',
    prepTime: 25
  },
  {
    title: 'Vegan Buddha Bowl',
    description: 'A nourishing and colorful bowl packed with protein, fiber, and essential nutrients. Perfect for a healthy lunch or dinner.',
    ingredients: [
      '1 cup quinoa, rinsed',
      '1 can chickpeas, drained and rinsed',
      '2 cups baby spinach',
      '1 large carrot, julienned',
      '1 cucumber, sliced',
      '1 avocado, sliced',
      '2 tbsp tahini',
      '1 lemon, juiced',
      '2 tbsp olive oil',
      '1 tsp maple syrup',
      'Salt and pepper to taste'
    ],
    steps: [
      'Cook quinoa according to package directions, then let cool.',
      'Preheat oven to 400°F. Toss chickpeas with olive oil, salt, and pepper, then roast for 20-25 minutes until crispy.',
      'Make tahini dressing by whisking together tahini, lemon juice, maple syrup, and water to desired consistency.',
      'Assemble bowls: quinoa base, roasted chickpeas, fresh vegetables, and avocado.',
      'Drizzle with tahini dressing and serve immediately.'
    ],
    images: ['https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=800&h=600&fit=crop'],
    cuisine: 'Mediterranean',
    dietaryType: 'Vegan',
    prepTime: 35
  },
  {
    title: 'Chicken Tikka Masala',
    description: 'Tender chicken in a creamy, spiced tomato sauce. This British-Indian classic is rich, flavorful, and perfect with rice or naan bread.',
    ingredients: [
      '800g chicken breast, cubed',
      '1 cup Greek yogurt',
      '2 tbsp tikka masala paste',
      '2 tbsp vegetable oil',
      '1 large onion, finely chopped',
      '4 cloves garlic, minced',
      '1 inch ginger, grated',
      '2 cans crushed tomatoes',
      '1 cup heavy cream',
      'Fresh cilantro for garnish',
      'Cooked basmati rice to serve'
    ],
    steps: [
      'Marinate chicken in yogurt and tikka paste for at least 30 minutes.',
      'Heat oil in a large pan and cook chicken until browned, about 5-7 minutes. Remove and set aside.',
      'In the same pan, sauté onion until soft, then add garlic and ginger.',
      'Add crushed tomatoes and simmer for 10 minutes until thickened.',
      'Return chicken to pan, add cream, and simmer for 15-20 minutes until chicken is cooked through.',
      'Garnish with cilantro and serve with rice.'
    ],
    images: ['https://images.unsplash.com/photo-1523987355523-c7b5b0723cdd?w=800&h=600&fit=crop'],
    cuisine: 'Indian',
    dietaryType: 'None',
    prepTime: 60
  },
  {
    title: 'Chocolate Chip Cookies',
    description: 'Classic homemade chocolate chip cookies with crispy edges and chewy centers. Perfect for sharing or enjoying with a glass of milk.',
    ingredients: [
      '2 1/4 cups all-purpose flour',
      '1 tsp baking soda',
      '1 tsp salt',
      '1 cup unsalted butter, softened',
      '3/4 cup granulated sugar',
      '3/4 cup brown sugar',
      '2 large eggs',
      '2 tsp vanilla extract',
      '2 cups chocolate chips'
    ],
    steps: [
      'Preheat oven to 375°F and line baking sheets with parchment paper.',
      'Whisk together flour, baking soda, and salt in a medium bowl.',
      'Cream butter and both sugars until light and fluffy, about 3 minutes.',
      'Beat in eggs one at a time, then add vanilla.',
      'Gradually mix in flour mixture, then fold in chocolate chips.',
      'Drop rounded tablespoons of dough onto baking sheets, spacing 2 inches apart.',
      'Bake for 9-11 minutes until golden brown around edges.',
      'Cool on baking sheets for 5 minutes, then transfer to wire racks.'
    ],
    images: ['https://images.unsplash.com/photo-1499636136210-6d4c9c073c7d?w=800&h=600&fit=crop'],
    cuisine: 'American',
    dietaryType: 'None',
    prepTime: 30
  },
  {
    title: 'Thai Green Curry',
    description: 'A fragrant and spicy Thai curry with vegetables and your choice of protein. The perfect balance of heat, sweetness, and creaminess.',
    ingredients: [
      '2 tbsp green curry paste',
      '1 can coconut milk',
      '400g chicken breast or tofu, cubed',
      '1 eggplant, cubed',
      '1 red bell pepper, sliced',
      '1 cup green beans',
      '2 tbsp fish sauce',
      '1 tbsp palm sugar',
      'Fresh Thai basil',
      'Cooked jasmine rice to serve'
    ],
    steps: [
      'Heat coconut milk in a large wok or pan until it starts to separate.',
      'Add curry paste and fry for 1-2 minutes until fragrant.',
      'Add chicken/tofu and cook until browned.',
      'Add vegetables and stir-fry for 2-3 minutes.',
      'Pour in remaining coconut milk and simmer for 10-15 minutes.',
      'Season with fish sauce and palm sugar to taste.',
      'Garnish with Thai basil and serve with rice.'
    ],
    images: ['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop'],
    cuisine: 'Thai',
    dietaryType: 'None',
    prepTime: 40
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Recipe.deleteMany({});
    console.log('Cleared existing data');

    // Create users
    const createdUsers = [];
    for (const userData of sampleUsers) {
      const hashedPassword = await bcrypt.hash(userData.password, 12);
      const user = new User({
        username: userData.username,
        email: userData.email,
        passwordHash: hashedPassword
      });
      const savedUser = await user.save();
      createdUsers.push(savedUser);
      console.log(`Created user: ${savedUser.username}`);
    }

    // Create recipes
    for (let i = 0; i < sampleRecipes.length; i++) {
      const recipeData = sampleRecipes[i];
      const recipe = new Recipe({
        ...recipeData,
        createdBy: createdUsers[i % createdUsers.length]._id
      });
      await recipe.save();
      console.log(`Created recipe: ${recipe.title}`);
    }

    console.log('Database seeded successfully!');
    console.log(`Created ${createdUsers.length} users and ${sampleRecipes.length} recipes`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

// Run seeder if called directly
if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;
