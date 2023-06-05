const knex = require("../database/knex");
const AppErro = require("../utils/AppErro");
const { hash, compare } = require("bcryptjs");
const authConfig = require("../configs/auth");
const { sign } = require("jsonwebtoken");

class SessionController {
  async create(request, response) {
    const { email, password } = request.body;

    const user = await knex("users").where({ email }).first();

    if (!user) {
      throw new AppErro("Email e/ou senha incorreta", 401);
    }

    const passwordMateched = await compare(password, user.password);

    if (!passwordMateched) {
      throw new AppErro("Email e/ou senha incorreta", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn,
    });
    return response.json({ user, token });
  }
}

module.exports = SessionController;
