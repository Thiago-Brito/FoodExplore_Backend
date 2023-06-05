const sqliteConnection = require("../../sqlite");
const createUsers = require("./createUsers");

async function migrationRun() {
  const shemas = [createUsers].join("");

  sqliteConnection()
    .then((db) => db.exec(shemas))
    .catch((error) => console.error(error));
}

module.exports = migrationRun;
