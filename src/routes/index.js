const { Router } = require("express");

const userRoutes = require("./user.routes");
const sessionRoutes = require("./sessions.routes");
const foodRoutes = require("./foods.routes");
const favoriteRoutes = require("./favorite.routes");
const requestRoutes = require("./request.routes");

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/session", sessionRoutes);
routes.use("/foods", foodRoutes);
routes.use("/favorite", favoriteRoutes);
routes.use("/request", requestRoutes);

module.exports = routes;
