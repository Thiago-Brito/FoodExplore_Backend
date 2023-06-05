const { Router } = require("express");

const favoriteRoutes = Router();
const FavoriteController = require("../controllers/FavoriteController");

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const favoriteController = new FavoriteController();

favoriteRoutes.post(
  "/:food_id",
  ensureAuthenticated,
  favoriteController.create
);
favoriteRoutes.delete(
  "/:food_id",
  ensureAuthenticated,
  favoriteController.delete
);
favoriteRoutes.get("/", ensureAuthenticated, favoriteController.index);

module.exports = favoriteRoutes;
