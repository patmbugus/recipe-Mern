const Comment = require('../models/Comment');
const Recipe = require('../models/Recipe');

// Add a comment to a recipe
exports.addComment = async (req, res) => {
    try {
        const { text } = req.body;
        const recipeId = req.params.recipeId; // This will come from the parent route
        const userId = req.user.id;

        // Check if recipe exists
        const recipe = await Recipe.findById(recipeId);
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        const newComment = new Comment({
            recipeId,
            userId,
            text,
            createdAt: new Date()
        });

        await newComment.save();

        // Populate user info for response
        await newComment.populate('userId', 'username');

        res.status(201).json({ message: 'Comment added successfully', comment: newComment });
    } catch (error) {
        console.error('Add comment error:', error);
        res.status(500).json({ message: 'Error adding comment' });
    }
};

// Get comments for a recipe
exports.getComments = async (req, res) => {
    try {
        const recipeId = req.params.recipeId; // This will come from the parent route

        // Check if recipe exists
        const recipe = await Recipe.findById(recipeId);
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        const comments = await Comment.find({ recipeId })
            .populate('userId', 'username')
            .sort({ createdAt: -1 });

        res.status(200).json({ comments });
    } catch (error) {
        console.error('Get comments error:', error);
        res.status(500).json({ message: 'Error retrieving comments' });
    }
};