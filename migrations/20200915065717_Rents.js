
exports.up = function (knex) {
    return knex.schema.createTable('rents', function (table) {
        table.increments('id').primary();
        table.string('provider', 255);
        table.string('link', 255);
        table.string('name', 255);
        table.decimal('price');
        table.timestamps();
      });
};

exports.down = function (knex) {
    return knex.schema.dropTable('rents');
};