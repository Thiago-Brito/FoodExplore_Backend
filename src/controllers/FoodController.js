const knex = require("../database/knex");
const AppErro = require("../utils/AppErro");

class FoodController {
  async create(request, response) {
    const { title, category, description, price, tags } = request.body;

    const user_id = request.user.id;

    const user = await knex("users").where({ id: user_id }).first();

    if (user.role !== "admin") {
      throw new AppErro("Usario sem permissão.");
    }

    const foodsWithSameTitle = await knex
      .select()
      .from("foods")
      .whereRaw("LOWER(title) = ?", title.toLowerCase());

    if (foodsWithSameTitle.length > 0) {
      throw new AppErro("Esse nome já está em uso.");
    }

    const [food_id] = await knex("foods").insert({
      title,
      category,
      price,
      description,
      user_id,
    });

    const tagsInsert = tags.map((name) => {
      return {
        food_id,
        user_id,
        name,
      };
    });

    await knex("tags").insert(tagsInsert);

    return response.json({ food_id });
  }
  async index(request, response) {
    const { category, title } = request.query;
    const user_id = request.user.id;

    let foods;

    if (category && !title) {
      foods = await knex
        .select()
        .from("foods")
        .whereRaw("category LIKE ?", `${category}`)
        .orderBy("title");
    } else if (category && title) {
      foods = await knex
        .select()
        .from("foods")
        .whereRaw("category LIKE ?", `${category}`)
        .andWhereRaw("LOWER(title) LIKE ?", `%${title.toLowerCase()}%`)
        .orderBy("title");
      const allTags = await knex.select().from("tags");

      const allFoods = await knex
        .select()
        .from("foods")
        .whereRaw("category LIKE ?", `${category}`)
        .orderBy("title");

      const filteredFoods = allFoods.filter((food) => {
        const foodTags = allTags.filter(
          (tag) =>
            tag.food_id === food.id &&
            tag.name.toLowerCase().includes(title.toLowerCase())
        );
        return foodTags.length > 0;
      });

      const combinedFoods = foods.concat(filteredFoods);

      const uniqueFoods = combinedFoods.reduce((unique, food) => {
        if (!unique.some((item) => item.id === food.id)) {
          unique.push(food);
        }
        return unique;
      }, []);

      foods = uniqueFoods;
    } else {
      foods = await knex.select().from("foods").orderBy("title");
    }

    const foodsWithTags = await Promise.all(
      foods.map(async (food) => {
        const foodTags = await knex
          .select()
          .from("tags")
          .where({ food_id: food.id });
        const favorite = await knex
          .select()
          .from("favorites")
          .where({ food_id: food.id })
          .andWhere({ user_id });
        return {
          ...food,
          tags: foodTags,
          favorite: favorite.length > 0 ? true : false,
        };
      })
    );

    return response.json(foodsWithTags);
  }

  async show(request, response) {
    const { id } = request.params;

    const food = await knex("foods").where({ id }).first();
    const tags = await knex("tags").where({ food_id: id }).orderBy("name");

    return response.json({
      ...food,
      tags,
    });
  }

  async update(request, response) {
    const { id } = request.params;
    const { title, category, description, price, tags } = request.body;

    const user_id = request.user.id;
    const user = await knex("users").where({ id: user_id }).first();

    if (user.role !== "admin") {
      throw new AppErro("Usuário sem permissão.");
    }

    const food = await knex("foods").where({ id }).first();

    if (!food) {
      throw new AppErro("Comida não encontrada.");
    }

    const foodsWithSameTitle = await knex
      .select()
      .from("foods")
      .whereRaw("LOWER(title) = ? AND id != ?", [title.toLowerCase(), id]);

    if (foodsWithSameTitle.length > 0) {
      throw new AppErro("Esse nome já está em uso.");
    }

    await knex("foods").where({ id }).update({
      title,
      category,
      price,
      description,
    });

    await knex("tags").where({ food_id: id }).delete();

    const tagsInsert = tags.map((name) => {
      return {
        food_id: id,
        user_id,
        name,
      };
    });

    await knex("tags").insert(tagsInsert);

    return response.status(201).json();
  }
  async delete(request, response) {
    const { id } = request.params;

    await knex("foods").where({ id }).delete();

    return response.json();
  }
}

module.exports = FoodController;
