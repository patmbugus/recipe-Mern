import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const CommentBox = ({ recipeId }) => {
    const { user } = useContext(AuthContext);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`/api/recipes/${recipeId}/comments`);
                setComments(response.data);
            } catch (err) {
                setError('Failed to load comments');
            }
        };
        fetchComments();
    }, [recipeId]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            setError('You must be logged in to comment.');
            return;
        }
        try {
            const response = await axios.post(
                `/api/recipes/${recipeId}/comments`,
                { text: newComment },
                { headers: { Authorization: `Bearer ${user.token}` } }
            );
            setComments([...comments, response.data]);
            setNewComment('');
            setError(null);
        } catch (err) {
            setError('Failed to post comment');
        }
    };

    return (
        <div className="mt-4">
            <form onSubmit={handleCommentSubmit} className="mb-4">
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full p-2 border rounded"
                    placeholder="Add a comment..."
                    rows={3}
                    disabled={!user}
                />
                <button
                    type="submit"
                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                    disabled={!user || !newComment.trim()}
                >
                    Post Comment
                </button>
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </form>
            <ul>
                {comments.map((comment) => (
                    <li key={comment._id} className="border-b py-2">
                        <strong>{comment.username || 'Anonymous'}:</strong> {comment.text}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CommentBox;