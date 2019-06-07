
exports.up = function(knex, Promise) {
    return knex.schema
    .createTable('contexts', tbl => {
        tbl.increments();
        tbl.string('name', 128).notNullable().unique();
    })

    .createTable('action_contexts', tbl => {
        tbl.increments();

        tbl.integer('action_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('actions')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE');

        tbl.integer('context_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('contexts')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE');
    })


};

exports.down = function(knex, Promise) {
    return knex.schema
    .dropTableIfExists('contexts')
    .dropTableIfExists('action_contexts')
};
