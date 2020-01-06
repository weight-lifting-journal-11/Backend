const db = require("../data/dbConfig");

module.exports = {
    add,
    find,
    // findBy,
    findById,
    // update,
    // remove

};

function find() {
    return db('exercises')
        .select('*');
}

function findById(id) {
    return db('exercises')
        .select('name', 'weight', 'sets', 'reps', "id", "userId")
        .where({ id })
        .first();
}

// function findByUserId(userId) {
//     return db('journal')
//         .join('users', 'users.id', 'journal.userId')
//         .where('journal.userId', userId)
//         .select('journal.*')
// }

function add(exercise) {
    return db('exercises')
        .insert(exercise, "id")
        .then(ids => {
            const [id] = ids;
            return db('exercises')
                .where({ id })
                .first();
        })
}