const express = require('express');
const router = express.Router();
const { authenticate } = require("../middleware/authenticate.middleware");
const { FavoriteModel } = require('../model/favorite.model');

// Route to toggle favorite status for a post
router.post('/favorite/:postId', authenticate, async (req, res) => {
  const { postId } = req.params;
  const { userId } = req; // Correct the typo here

  try {
    // Check if the user has already marked the post as a favorite
    const existingFavorite = await FavoriteModel.findOne({ userId, postId });

    if (existingFavorite) {
      // If already a favorite, remove it
      await FavoriteModel.findByIdAndDelete(existingFavorite._id);
    } else {
      // If not a favorite, add it
      await FavoriteModel.create({ userId, postId });
    }

    res.status(200).json({ message: 'Favorite status updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = {router};
