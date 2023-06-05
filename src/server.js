require("express-async-errors");
require("dotenv/config");
const AppErro = require("./utils/AppErro");

const cors = require("cors");
const migrationRun = require("./database/sqlite/migrations");
const express = require("express");
const uploadConfig = require("./configs/updload");

const app = express();
app.use(cors());

const routes = require("./routes");

migrationRun();

app.use(express.json());
app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));
app.use(routes);

app.use((error, request, response, next) => {
  if (error instanceof AppErro) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }

  return response.status(500).json({
    status: "error",
    message: "internal server error",
  });
});

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => console.log(`Server is runing on Port ${PORT}`));
