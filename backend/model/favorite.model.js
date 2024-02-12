const mongoose = require("mongoose");

const favoriteSchema = mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  postId: { type: mongoose.Schema.Types.ObjectId, required: true },
});

const FavoriteModel = mongoose.model("favorite", favoriteSchema);

module.exports = {FavoriteModel};
