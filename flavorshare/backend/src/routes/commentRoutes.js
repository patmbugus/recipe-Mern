const express = require('express');
const { addComment, getComments } = require('../controllers/commentController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Route to add a comment to a recipe
router.post('/', authenticateToken, addComment);

// Route to get comments for a specific recipe
router.get('/', getComments);

module.exports = router;