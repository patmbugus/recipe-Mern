const express = require('express');
const {
  createRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
} = require('../controllers/recipeController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Route to create a new recipe
router.post('/', authenticateToken, createRecipe);

// Route to get all recipes with optional search/filter
router.get('/', getRecipes);

// Route to get a recipe by ID
router.get('/:id', getRecipeById);

// Route to update a recipe by ID
router.put('/:id', authenticateToken, updateRecipe);

// Route to delete a recipe by ID
router.delete('/:id', authenticateToken, deleteRecipe);

module.exports = router;