
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('projects').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        {name: 'clean house', description: 'this is a 2 story house'},
        {name: 'paint house', description: 'only outside walls'},
        {name: 'clean backyard', description: 'remove tree'},
        {name: 'fence property', description: '2000 ft'},
      ]);
    });
};
