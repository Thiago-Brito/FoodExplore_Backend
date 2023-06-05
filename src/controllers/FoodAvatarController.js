const knex = require("../database/knex");
const DiskStorage = require("../providers/DiskStorage");
const AppErro = require("../utils/AppErro");

class FoodAvatarController {
  async update(request, response) {
    const { id } = request.params;
    const user_id = request.user.id;
    const foodFilename = request.file.filename;
    const diskStorage = new DiskStorage();

    const food = await knex("foods").where({ id }).first();
    const user = await knex("users").where({ id: user_id }).first();

    if (user.role !== "admin") {
      throw new AppErro("Usario sem permissão.");
    }

    if (food.avatar) {
      await diskStorage.deleteFile(food.avatar);
    }

    const filename = await diskStorage.saveFile(foodFilename);
    food.avatar = filename;

    await knex("foods").update(food).where({ id });

    return response.json(food);
  }
}
module.exports = FoodAvatarController;
