const knex = require('knex');
const knexConfig = require('../../knexfile');
const db = knex(knexConfig.development);


function get(id) {
    let query = db('actions');
  
    if (id) {
      return query.where('actions.id', id).first();
    }
    else {
        return query;
    }
  }

function add(action) {
    console.log('trying adding in model')
    return db('actions').insert(action);
}

function update(id, changes) {
    return db('actions')
        .where({id})
        .update(changes);
}

function remove(id) {
    return db('actions')
    .where({id})
    .del();
};

module.exports = {
    get,
    add,
    update,
    remove
};