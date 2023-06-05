const knex = require("../database/knex");
const AppErro = require("../utils/AppErro");

class FavoriteController {
  async create(request, response) {
    const { food_id } = request.params;

    const user_id = request.user.id;

    const favorite = await knex("favorites")
      .where({ user_id })
      .andWhere({ food_id })
      .first();

    if (favorite) {
      throw new AppErro("Você ja favoritou essa comida");
    }
    const food = await knex("foods").where({ id: food_id }).first();

    if (!food) {
      throw new AppErro("Comida não encontrada.");
    }
    await knex("favorites").insert({ user_id, food_id });

    return response.json();
  }
  async delete(request, response) {
    const { food_id } = request.params;

    const user_id = request.user.id;

    await knex("favorites").where({ user_id }).andWhere({ food_id }).delete();

    return response.json();
  }
  async index(request, response) {
    const user_id = request.user.id;

    const favorites = await knex("favorites").where({ user_id });

    const foods = (
      await Promise.all(
        favorites.map(async (favorite) => {
          return await knex
            .select()
            .from("foods")
            .where({ id: favorite.food_id });
        })
      )
    ).flat();
    const foodsWithTags = await Promise.all(
      foods.map(async (food) => {
        const foodTags = await knex
          .select()
          .from("tags")
          .where({ food_id: food.id });
        return {
          ...food,
          tags: foodTags,
        };
      })
    );

    return response.json(foodsWithTags);
  }
}

module.exports = FavoriteController;
