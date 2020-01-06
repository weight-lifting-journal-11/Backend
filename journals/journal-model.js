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

function find(id) {
    return db("users_journals");
    // .where({ "user_id": id });
}

function findById(id) {
    return db("users_journals")
        .where({ "user_id": id })
        .first();
}

function findLatestJournal(latest) {
    return db("users_journals")
        .where({
            date: latest.date,
            region: latest.target_region
        });
}

function insert(id, journal) {
    return db("users_journals")
        .insert(journal)
        .where({ "user_id": id });
}

function update(id, changes) {
    return db("users_journals")
        .where({ id })
        .update(changes);
}