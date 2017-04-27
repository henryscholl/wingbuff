
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('places').del()
    .then(() => {
      // Inserts seed entries
      return knex('places').insert({
        name: 'Keg & Lantern Brewing Company',
        address: '97 Nassau Ave',
        city: 'Brooklyn',
        state: 'NY',
        zipcode: '11222'
      });
    }).then(() => {
      return knex('places').insert({
        name: 'Beast Of Bourbon',
        address: '710 Myrtle Ave',
        city: 'Brooklyn',
        state: 'NY',
        zipcode: '11205'
      });
    }).then(() => {
      return knex('places').insert({
        name: 'Speedy Romeo',
        address: '376 Classon Ave',
        city: 'Brooklyn',
        state: 'NY',
        zipcode: '11238'
      });
    }).then(() => {
      return knex('places').insert({
        name: 'Buffalo’s Famous',
        address: '1111 Church Ave',
        city: 'Brooklyn',
        state: 'NY',
        zipcode: '11218'
      });
    }).then(() => {
      return knex('places').insert({
        name: 'Dan and John’s Wings',
        address: '135 1st Ave',
        city: 'New York',
        state: 'NY',
        zipcode: '10003'
      });
    }).then(() => {
      return knex('places').insert({
        name: 'Wingstop',
        address: '289 Livingston St',
        city: 'Brooklyn',
        state: 'NY',
        zipcode: '11217'
      });
    }).then(() => {
      return knex('places').insert({
        name: 'Croxley’s Ale House',
        address: '63 Grand St',
        city: 'Brooklyn',
        state: 'NY',
        zipcode: '11249'
      });
    }).then(() => {
      return knex('places').insert({
        name: 'Atomic Wings',
        address: '528 9th Ave',
        city: 'New York',
        state: 'NY',
        zipcode: '10018'
      });
    }).then(() => {
      return knex('places').insert({
        name: 'International Wings Factory',
        address: '1762 1st Ave',
        city: 'New York',
        state: 'NY',
        zipcode: '10128'
      });
    }).then(() => {
      return knex('places').insert({
        name: 'Turntable Chicken Jazz',
        address: '314 5th Ave',
        city: 'New York',
        state: 'NY',
        zipcode: '10001'
      });
    });
};
