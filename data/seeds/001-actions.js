
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('actions').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('actions').insert([
        {project_id: 1, description: 'windows, doors, walls', note: "2 people needed"},
        {project_id: 1, description: 'bring tools', note: "2 gallons soap"},
        {project_id: 2, description: 'Buy brushes', note:"medium size"}
      ]);
    });
};
