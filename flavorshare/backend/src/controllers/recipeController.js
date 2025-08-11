const Recipe = require('../models/Recipe');
const User = require('../models/User');

// Create a new recipe
exports.createRecipe = async (req, res) => {
    try {
        const { title, description, ingredients, steps, cuisine, dietaryType, prepTime } = req.body;
        const newRecipe = new Recipe({
            title,
            description,
            ingredients,
            steps,
            images: [], // Default empty array for now
            cuisine,
            dietaryType,
            prepTime,
            createdBy: req.user.id,
        });
        await newRecipe.save();
        res.status(201).json({ message: 'Recipe created successfully', recipe: newRecipe });
    } catch (error) {
        console.error('Create recipe error:', error);
        res.status(500).json({ message: 'Error creating recipe' });
    }
};

// Get all recipes with optional search and filter
exports.getRecipes = async (req, res) => {
    try {
        const { search, cuisine, dietaryType, prepTime, sortBy } = req.query;
        const query = {};
        
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { ingredients: { $in: [new RegExp(search, 'i')] } }
            ];
        }
        
        if (cuisine) {
            query.cuisine = cuisine;
        }
        
        if (dietaryType) {
            query.dietaryType = dietaryType;
        }
        
        if (prepTime) {
            query.prepTime = { $lte: parseInt(prepTime) };
        }

        let sortOptions = {};
        switch (sortBy) {
            case 'oldest':
                sortOptions = { createdAt: 1 };
                break;
            case 'rating':
                sortOptions = { rating: -1 };
                break;
            case 'prepTime':
                sortOptions = { prepTime: 1 };
                break;
            case 'popularity':
                sortOptions = { 'likes.length': -1 };
                break;
            default: // newest
                sortOptions = { createdAt: -1 };
        }

        const recipes = await Recipe.find(query)
            .populate('createdBy', 'username')
            .sort(sortOptions);
            
        res.status(200).json({ recipes });
    } catch (error) {
        console.error('Get recipes error:', error);
        res.status(500).json({ message: 'Error fetching recipes' });
    }
};

// Get a single recipe by ID
exports.getRecipeById = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id).populate('createdBy', 'username');
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        res.status(200).json({ recipe });
    } catch (error) {
        console.error('Get recipe error:', error);
        res.status(500).json({ message: 'Error fetching recipe' });
    }
};

// Update a recipe
exports.updateRecipe = async (req, res) => {
    try {
        const { title, description, ingredients, steps, cuisine, dietaryType, prepTime } = req.body;
        
        // Check if user owns this recipe
        const existingRecipe = await Recipe.findById(req.params.id);
        if (!existingRecipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        
        if (existingRecipe.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ message: 'You can only edit your own recipes' });
        }

        const updatedRecipe = await Recipe.findByIdAndUpdate(
            req.params.id,
            {
                title,
                description,
                ingredients,
                steps,
                cuisine,
                dietaryType,
                prepTime,
                updatedAt: Date.now()
            },
            { new: true }
        );
        
        res.status(200).json({ message: 'Recipe updated successfully', recipe: updatedRecipe });
    } catch (error) {
        console.error('Update recipe error:', error);
        res.status(500).json({ message: 'Error updating recipe' });
    }
};

// Delete a recipe
exports.deleteRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        
        if (recipe.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ message: 'You can only delete your own recipes' });
        }

        await Recipe.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Recipe deleted successfully' });
    } catch (error) {
        console.error('Delete recipe error:', error);
        res.status(500).json({ message: 'Error deleting recipe' });
    }
};