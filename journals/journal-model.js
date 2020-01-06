const db = require("../data/dbConfig");

module.exports = {
    find,
    findById,
    findByUserId,
    // findJournalsWithExerciseByUserId,
    add,
    remove,
    update

};

function find() {
    return db('journal')
        .select('id', 'region', 'date', 'userId');
}

function findById(id) {
    return db('journal')
        .select('id', 'region', 'date', 'userId')
        .where({ id })
        .first();
}

function findByUserId(userId) {
    return db('journal')
        .join('users', 'users.id', 'journal.userId')
        .where('journal.userId', userId)
        .select('journal.*')
}

function add(journal) {
    return db('journal')
        .insert(journal)
        .then(ids => {
            const [id] = ids;
            return db('journal')
                .where({ id })
                .first();
        })
}

function update(id, changes) {
    return db('journal')
        .where('id', id)
        .update(changes)
        .then(() => {
            return db('journal')
                .where({ id })
                .first();
        })
}

function remove(id) {
    return db('journal')
        .where({ id })
        .delete();
}

// function findJournalsWithExerciseByUserId(id, userId) {
//     // }