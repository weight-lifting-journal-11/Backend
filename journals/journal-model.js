const db = require("../data/dbConfig");

module.exports = {
    find,
    findById,
    findLatestJournal,
    // findJournalsWithExercises,
    insert,
    // remove,
    update

};

function find() {
    return db("users_journals");
}

function findById(id) {
    return db("users_journals")
        .where({ id })
        .first();
}

function findLatestJournal(latest) {
    return db("users_journals")
        .where({
            date: latest.date,
            region: latest.target_region
        });
}

function insert(journal) {
    return db("users_journals")
        .insert(journal)
        .then(ids => 1);
}

function update(id, changes) {
    return db("users_journals")
        .where({ id })
        .update(changes);
}