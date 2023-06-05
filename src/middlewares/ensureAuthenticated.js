const { verify } = require("jsonwebtoken");

const AppErro = require("../utils/AppErro");
const authConfig = require("../configs/auth");

function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppErro("JWT Token não informado", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(token, authConfig.jwt.secret);
    request.user = {
      id: Number(user_id),
    };
    return next();
  } catch {
    throw new AppErro("JWT Token invalido", 401);
  }
}

module.exports = ensureAuthenticated;
