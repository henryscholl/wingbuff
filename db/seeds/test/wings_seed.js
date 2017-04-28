
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('wings').del()
    .then(() => {
      // Inserts seed entries
      return knex('wings').insert({
        name: 'Hellfire',
        place_id: 1
      });
    }).then(() => {
      return knex('wings').insert({
        name: 'Pepperberry Wing',
        place_id: 1
      });
    }).then(() => {
      return knex('wings').insert({
        name: 'Yakitori',
        place_id: 1
      });
    }).then(() => {
      return knex('wings').insert({
        name: 'Garlic Parmesan',
        place_id: 1
      });
    }).then(() => {
      return knex('wings').insert({
        name: 'BBQ Wings',
        place_id: 1
      });
    }).then(() => {
      return knex('wings').insert({
        name: 'Buffalo',
        place_id: 1
      });
    }).then(() => {
      return knex('wings').insert({
        name: 'BBQ Wings',
        place_id: 2
      });
    }).then(() => {
      return knex('wings').insert({
        name: 'Buffalo Wings',
        place_id: 3
      });
    }).then(() => {
      return knex('wings').insert({
        name: 'Cry Like a Baby',
        place_id: 7
      });
    }).then(() => {
      return knex('wings').insert({
        name: 'Jamaican Jerk',
        place_id: 7
      });
    }).then(() => {
      return knex('wings').insert({
        name: 'Korean BBQ',
        place_id: 7
      });
    })
    // insert review seeds
    .then(() => {
      return knex('reviews').insert({
        wing_id: 1,
        description: 'Spicy buffalo wing',
        rating: 4
      });
    }).then(() => {
      return knex('reviews').insert({
        wing_id: 2,
        description: 'Dry rub wing with tasty pepper spice flavor',
        rating: 5
      });
    }).then(() => {
      return knex('reviews').insert({
        wing_id: 9,
        description: 'Super spicy! Try at your own risk',
        rating: 3
      });
    }).then(() => {
      return knex('reviews').insert({
        wing_id: 7,
        description: 'Delicious BBQ sauced wings. Prize winning creation',
        rating: 5
      });
    }).then(() => {
      return knex('reviews').insert({
        wing_id: 7,
        description: 'The best!',
        rating: 4
      });
    }).then(() => {
      return knex('reviews').insert({
        wing_id: 4,
        description: 'These were ok',
        rating: 3
      });
    });
};
