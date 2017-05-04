
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
    table.increments('id');
    table.string('username').unique().notNullable();
    table.string('password').notNullable();
    table.boolean('admin').notNullable().defaultTo(false);
    table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
  })
  .createTable('places', function(table) {
  	table.increments('id');
  	table.string('name').notNullable();
  	table.string('address').notNullable();
  	table.string('city').notNullable();
  	table.string('state', 2).notNullable();
  	table.string('zipcode', 5).notNullable();
  })
  .createTable('wings', function(table) {
  	table.increments('id');
  	table.string('name').notNullable();
  	table.integer('place_id').unsigned();
  	table.foreign('place_id').references('places.id');
  })
  .createTable('reviews', function(table) {
  	table.increments('id');
  	table.integer('wing_id').unsigned();
  	table.foreign('wing_id').references('wings.id');
  	table.string('description').notNullable();
  	table.integer('rating').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('reviews')
  	.dropTable('wings')
  	.dropTable('places')
    .dropTable('users');
};
