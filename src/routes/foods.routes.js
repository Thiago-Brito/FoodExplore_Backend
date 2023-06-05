const { Router } = require("express");

const multer = require("multer");
const uploadConfig = require("../configs/updload");
const updload = multer(uploadConfig.MULTER);

const foodRoutes = Router();
const FoodController = require("../controllers/FoodController");
const FoodAvatarController = require("../controllers/FoodAvatarController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const foodController = new FoodController();
const foodAvatarController = new FoodAvatarController();

foodRoutes.post("/", ensureAuthenticated, foodController.create);
foodRoutes.get("/", ensureAuthenticated, foodController.index);
foodRoutes.get("/:id", ensureAuthenticated, foodController.show);
foodRoutes.put("/:id", ensureAuthenticated, foodController.update);
foodRoutes.delete("/:id", ensureAuthenticated, foodController.delete);

foodRoutes.patch(
  "/avatar/:id",
  ensureAuthenticated,
  updload.single("avatar"),
  foodAvatarController.update
);

module.exports = foodRoutes;
