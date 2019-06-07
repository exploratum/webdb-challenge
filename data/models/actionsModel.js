const knex = require('knex');
const knexConfig = require('../../knexfile');
const db = knex(knexConfig.development);

function add(action) {
    console.log('trying adding in model')
    return db('actions').insert(action);
}

module.exports = {
    add
};