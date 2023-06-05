const AppErro = require("../utils/AppErro");
const { hash } = require("bcryptjs");
const sqliteConnection = require("../database/sqlite");

class UsersController {
  async create(request, response) {
    const { name, email, password, role } = request.body;
    const database = await sqliteConnection();

    const userWithUpdateEmail = await database.get(
      "SELECT * FROM users WHERE email = (?)",
      [email]
    );
    if (userWithUpdateEmail) {
      throw new AppErro("Este E-mail ja esta em uso");
    }

    if (!name) {
      throw new AppErro("nome é obrigatorio");
    }

    const hashedPassoword = await hash(password, 8);

    let userRole = role || "client";

    await database.run(
      "INSERT INTO users (name, email, password, role) VALUES (?,?,?,?)",
      [name, email, hashedPassoword, userRole]
    );

    return response.status(201).json();
  }
}

module.exports = UsersController;
