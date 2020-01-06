const db = require("../data/dbConfig");

module.exports = {
    add,
    find,
    findByJournalId,
    findById,
    update,
    remove

};

function find() {
    return db('exercises')
        .select('*');
}

function findById(id) {
    return db('exercises')
        .select('name', 'weight', 'sets', 'reps', "id", "userId", "journalId")
        .where({ id })
        .first();
}

function findByJournalId(journalId) {
    return db('exercises')
        .join('journal', 'journal.id', 'exercises.journalId')
        .where('exercises.journalId', journalId)
        .select('exercises.*')
}

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

function update(id, changes) {
    return db('exercises')
        .where('id', id)
        .update(changes)
        .then(() => {
            return db('exercises')
                .where({ id })
                .first();
        })
}

function remove(id) {
    return db('exercises')
        .where({ id })
        .delete();
}