const { Router } = require("express");

const requestRoutes = Router();
const RequestController = require("../controllers/RequestController");

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const requestController = new RequestController();

requestRoutes.post("/", ensureAuthenticated, requestController.create);
requestRoutes.delete("/", ensureAuthenticated, requestController.delete);
requestRoutes.delete(
  "/:food_id",
  ensureAuthenticated,
  requestController.remove
);

requestRoutes.get("/", ensureAuthenticated, requestController.index);

module.exports = requestRoutes;
