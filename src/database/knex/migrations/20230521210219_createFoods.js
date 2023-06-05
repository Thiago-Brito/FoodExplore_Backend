exports.up = (knex) =>
  knex.schema.createTable("foods", (table) => {
    table.increments("id");
    table.text("title");
    table.text("category");
    table.text("description");
    table.decimal("price", 10, 2);
    table.text("avatar");

    table.integer("user_id").references("id").inTable("users");

    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("foods");
