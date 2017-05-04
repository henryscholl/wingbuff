const bcrypt = require('bcryptjs');

exports.seed = (knex, Promise) => {
  // delete reviews, wings, places, and users entries
  return Promise.all([
    knex('reviews').del(),
    knex('wings').del(),
    knex('places').del(),
    knex('users').del()
  ])
  // User seeds
  .then(() => {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync('spicy', salt);
    return Promise.join(
      knex('users').insert({
        username: 'wingbuff',
        password: hash,
        admin: true
      })
    );
  })
  // Place seeds
  .then(() => {
    return Promise.all([
      knex('places').insert({
        name: 'Keg & Lantern Brewing Company',
        address: '97 Nassau Ave',
        city: 'Brooklyn',
        state: 'NY',
        zipcode: '11222',
        user_id: 1
      }),
      knex('places').insert({
        name: 'Beast Of Bourbon',
        address: '710 Myrtle Ave',
        city: 'Brooklyn',
        state: 'NY',
        zipcode: '11205',
        user_id: 1
      })
    ]);
  })
  // Wing seeds
  .then(() => {
    return Promise.all([
      knex('wings').insert({
        name: 'Hellfire',
        place_id: 1,
        user_id: 1
      }),
      knex('wings').insert({
        name: 'Pepperberry Wing',
        place_id: 1,
        user_id: 1
      }),
      knex('wings').insert({
        name: 'Yakitori',
        place_id: 2,
        user_id: 1
      })
    ]);
  })
  // Review seeds
  .then(() => {
    return Promise.all([
      knex('reviews').insert({
        wing_id: 1,
        description: 'Spicy buffalo wing',
        rating: 4,
        user_id: 1
      }),
      knex('reviews').insert({
        wing_id: 2,
        description: 'Dry rub wing with tasty pepper spice flavor',
        rating: 5,
        user_id: 1
      })
    ]);
  });

};