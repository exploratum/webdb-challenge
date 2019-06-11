const knex = require('knex');
const knexConfig = require('../../knexfile');
const db = knex(knexConfig.development);


// function get(id) {
//     let query = db('actions');
  
//     if (id) {
//       return query.where('actions.id', id).first();
//     }
//     else {
//         return query;
//     }
//   }

// function get(id) {
//     let query = db('actions as a');
  
//     if (id) {
//       query.where('a.id', id).first();
  
//       const promises = [query, this.getActionContexts(id)]; // [ action, contexts ]
  
//       return Promise.all(promises).then(function(results) {
//         let [action, contexts] = results;
  
//         if (action) {
//           action.contexts = contexts;
  
//           return mappers.actionToBody(context);
//         } else {
//           return null;
//         }
//       });
//     }
  
//     return query.then(contexts => {
//       return contexts.map(context => mappers.actionToBody(context));
//     });
//   }

async function get(id) {

  if (id) {
    let action = await db('actions').where('actions.id', id).first();
    let contexts = await db.select('contexts.id', 'contexts.name')
      .from('action_contexts')
      .leftJoin('contexts', 'contexts.id', 'action_contexts.context_id' )
      .where('action_contexts.action_id', id )

    action.contexts = contexts;
    return action;
  }
  else {
    return db('actions');
  }
}

  function getActionContexts(actionId) {
    return db('contexts')
      .where('action_id', actionId)
      .then(contexts => contexts.map(context => mappers.contextToBody(context)));
  }

function add(action) {
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
    remove,
    getActionContexts
};