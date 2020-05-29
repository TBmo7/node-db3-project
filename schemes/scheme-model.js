const db = require('../data/db-config.js');

function find(){
    return db('schemes')
}

function findById(id){
    return db('schemes')
    .where({id})
    .first()
    .catch(ids=>{
        return null
    })
}


/**
 * SELECT Instructions, Scheme_Name From Schemes
   JOIN Steps
   ON Schemes.id = Steps.scheme_id
   WHERE Schemes.id = 1
 *  
 */
function findSteps(id){
    return db('schemes as sc')
    .join('steps as st', 'st.scheme_id','sc.id')
    .select('sc.scheme_name', 'st.id','st.step_number','st.instructions') //NOT FINISHED AT THIS STEP
    .orderBy('st.step_number')
    .where('sc.id', id)
    
}

function add(schemeData){
    
    return db('schemes')
    .insert(schemeData)
    .then(ids =>{
        return findById(ids[0])
    });
       
}

function update(changes,id){
    return db('schemes')
    .where({id})
    .update(changes)
}

function remove(id) {
    return db('schemes')
    .where('id',id)
    .del()
}

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove
}


