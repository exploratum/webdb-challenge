
exports.up = function(knex, Promise) {
    return knex.schema
    .createTable('projects', tbl => {
        tbl.increments();
        tbl.string('name', 128).notNullable().unique();
        tbl.string('description', 1024).defaultTo('TBD');
        tbl.boolean('completed').defaultTo(false);
    })

    .createTable('actions', tbl => {
        tbl.increments();
        tbl.string('description', 1024).defaultTo('TBD');
        tbl.string('note', 1024).defaultTo('TBD');
        tbl.boolean('completed').defaultTo(false);
        tbl.integer('project_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('projects')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema
    .dropTableIfExists('projects')
    .dropTableIfExists('actions')
};