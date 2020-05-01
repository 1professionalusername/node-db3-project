const db = require('../data/config');





// Calling find returns a promise that resolves to an array of all schemes in the database.
// No steps are included.

function find() {
    return db("schemes")

}


// Expects a scheme `id` as its only parameter
// Resolve to a single scheme object
// On an invalid `id`, resolves to `null`

function findById(id) {
    return db("schemes")
        .where({ id })
        .first()

}


// Expects a scheme `id`
// Resolves to an array of all correctly ordered steps for the given scheme: 
// `[
//      { id: 17, scheme_name: 'Find the Holy Grail', step_number: 1, instructions: 'quest'}, 
//      { id: 18, scheme_name: 'Find the Holy Grail', step_number: 2, instructions: '...and quest'}, etc.
//  ]`
// This array should include the `scheme_name` _not_ the `scheme_id`


// function findSteps(id) {
//     return db("steps")
//         .where({ id })

// }
function findSteps(id) {
    return db("steps")
        .join("schemes", "schemes.id", "steps.scheme_id")
        .where("schemes.id", id)
        .select("steps.id", "schemes.scheme_name", "steps.step_number", "steps.instructions")
        .orderBy("steps.step_number")

}

// Expects a scheme object.
// Inserts scheme into the database.
// Resolves to the newly inserted scheme, including `id`

function add(scheme) {
    return db(" schemes ")
        .insert(scheme, "id")
        .then(([id]) => findById(id))
}



// Expects a changes object and an `id`
// Updates the scheme with the given id
// Resolves to the newly updated scheme object

function update(changes, id) {
    return db("schemes")
        .where({ id })
        .update(changes)

}


// Removes the scheme object with the provided id
// Resolves to the removed scheme
// Resolves to `null` on an invalid id
// (Hint: Only worry about removing the `scheme`. The database is configured to automatically remove all associated steps.)

function remove(id) {
    return db("schemes")
        .where({ id })
        .del()

}



module.exports = {

    find,
    findById,
    findSteps,
    add,
    update,
    remove,

}