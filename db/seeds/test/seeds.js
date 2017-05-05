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
  .then(() => {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync('testpass', salt);
    return Promise.join(
      knex('users').insert({
        username: 'firstuser',
        password: hash
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
      }),
      knex('places').insert({
        name: 'Speedy Romeo',
        address: '376 Classon Ave',
        city: 'Brooklyn',
        state: 'NY',
        zipcode: '11238',
        user_id: 1
      }),
      knex('places').insert({
        name: 'Buffalo’s Famous',
        address: '1111 Church Ave',
        city: 'Brooklyn',
        state: 'NY',
        zipcode: '11218',
        user_id: 1
      }),
      knex('places').insert({
        name: 'Dan and John’s Wings',
        address: '135 1st Ave',
        city: 'New York',
        state: 'NY',
        zipcode: '10003',
        user_id: 1
      }),
      knex('places').insert({
        name: 'Wingstop',
        address: '289 Livingston St',
        city: 'Brooklyn',
        state: 'NY',
        zipcode: '11217',
        user_id: 1
      }),
      knex('places').insert({
        name: 'Croxley’s Ale House',
        address: '63 Grand St',
        city: 'Brooklyn',
        state: 'NY',
        zipcode: '11249',
        user_id: 1
      }),
      knex('places').insert({
        name: 'Atomic Wings',
        address: '528 9th Ave',
        city: 'New York',
        state: 'NY',
        zipcode: '10018',
        user_id: 1
      }),
      knex('places').insert({
        name: 'International Wings Factory',
        address: '1762 1st Ave',
        city: 'New York',
        state: 'NY',
        zipcode: '10128',
        user_id: 1
      }),
      knex('places').insert({
        name: 'Turntable Chicken Jazz',
        address: '314 5th Ave',
        city: 'New York',
        state: 'NY',
        zipcode: '10001',
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
        place_id: 1,
        user_id: 1
      }),
      knex('wings').insert({
        name: 'Garlic Parmesan',
        place_id: 1,
        user_id: 1
      }),
      knex('wings').insert({
        name: 'BBQ Wings',
        place_id: 1,
        user_id: 1
      }),
      knex('wings').insert({
        name: 'Buffalo',
        place_id: 1,
        user_id: 1
      }),
      knex('wings').insert({
        name: 'BBQ Wings',
        place_id: 2,
        user_id: 1
      }),
      knex('wings').insert({
        name: 'Buffalo Wings',
        place_id: 3,
        user_id: 1
      }),
      knex('wings').insert({
        name: 'Cry Like a Baby',
        place_id: 7,
        user_id: 1
      }),
      knex('wings').insert({
        name: 'Jamaican Jerk',
        place_id: 7,
        user_id: 2
      }),
      knex('wings').insert({
        name: 'Korean BBQ',
        place_id: 7,
        user_id: 2
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
      }),
      knex('reviews').insert({
        wing_id: 9,
        description: 'Super spicy! Try at your own risk',
        rating: 3,
        user_id: 2
      }),
      knex('reviews').insert({
        wing_id: 7,
        description: 'Delicious BBQ sauced wings. Prize winning creation',
        rating: 5,
        user_id: 1
      }),
      knex('reviews').insert({
        wing_id: 7,
        description: 'The best!',
        rating: 4,
        user_id: 2
      }),
      knex('reviews').insert({
        wing_id: 4,
        description: 'These were ok',
        rating: 3,
        user_id: 2
      })
    ]);
  });

};