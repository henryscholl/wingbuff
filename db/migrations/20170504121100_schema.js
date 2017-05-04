
exports.up = function(knex, Promise) {

  return Promise.all([

  	knex.schema.createTable('users', function(table) {
	    table.increments('id');
	    table.string('username').unique().notNullable();
	    table.string('password').notNullable();
	    table.boolean('admin').notNullable().defaultTo(false);
	    table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
	}),

  	knex.schema.createTable('places', function(table) {
	  	table.increments('id');
	  	table.string('name').notNullable();
	  	table.string('address').notNullable();
	  	table.string('city').notNullable();
	  	table.string('state', 2).notNullable();
	  	table.string('zipcode', 5).notNullable();
	  	table.integer('user_id').unsigned();
	  	table.foreign('user_id').references('users.id');
	}),

	knex.schema.createTable('wings', function(table) {
	  	table.increments('id');
	  	table.string('name').notNullable();
	  	table.integer('place_id').unsigned();
	  	table.foreign('place_id').references('places.id');
	  	table.integer('user_id').unsigned();
	  	table.foreign('user_id').references('users.id');
	}),

  	knex.schema.createTable('reviews', function(table) {
	  	table.increments('id');
	  	table.integer('wing_id').unsigned();
	  	table.foreign('wing_id').references('wings.id');
	  	table.string('description').notNullable();
	  	table.integer('rating').notNullable();
	  	table.integer('user_id').unsigned();
	  	table.foreign('user_id').references('users.id');
  	})
  ])
  
};

exports.down = function(knex, Promise) {

  return Promise.all([
  	knex.schema.dropTable('reviews'),
  	knex.schema.dropTable('wings'),
  	knex.schema.dropTable('places'),
    knex.schema.dropTable('users')
   ])

};
