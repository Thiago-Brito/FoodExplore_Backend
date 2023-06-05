const knex = require("../database/knex");
const AppErro = require("../utils/AppErro");

class RequestController {
  async create(request, response) {
    const { food_id, quantity } = request.body;

    const user_id = request.user.id;

    const food = await knex("foods").where({ id: food_id }).first();

    if (!food) {
      throw new AppErro("Comida não encontrada.");
    }
    const requestFood = await knex("requests")
      .where({ user_id, food_id })
      .first();
    if (requestFood) {
      await knex("requests")
        .where({ user_id, food_id })
        .update({ quantity: requestFood.quantity + parseInt(quantity) });
    } else {
      await knex("requests").insert({ user_id, food_id, quantity });
    }

    return response.status(201).json();
  }
  async delete(request, response) {
    const user_id = request.user.id;

    await knex("requests").where({ user_id }).delete();

    return response.json();
  }
  async remove(request, response) {
    const { food_id } = request.params;

    const user_id = request.user.id;

    await knex("requests").where({ user_id, food_id }).first().delete();

    return response.json();
  }

  async index(request, response) {
    const user_id = request.user.id;

    const requestFoods = await knex("requests").where({ user_id });

    const foods = await Promise.all(
      requestFoods.map(async (requestFood) => {
        const food = await knex
          .select()
          .from("foods")
          .where({ id: requestFood.food_id })
          .first();

        return {
          ...food,
          quantity: requestFood.quantity,
        };
      })
    );
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

module.exports = RequestController;
