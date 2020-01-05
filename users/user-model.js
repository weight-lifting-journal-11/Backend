const db = require("../data/dbConfig");

module.exports = {
    find,
    findBy,
    findById,
    insert,
    update,
    remove

};

function find() {
    return db('users').select('id', 'username');
}

function findBy(filter) {
    return db("users")
        .select("id", "username", "password") // make sure to return the password
        .where(filter);
}

function insert(user) {
    return db("users")
        .insert(user, "id")
        .then(ids => {
            const [id] = ids;
            return findById(id);
        });
}

function findById(id) {
    return db("users")
        .select("id", "username")
        .where({ id })
        .first();
}

function update(id, changes) {
    return db("users")
        .where({ id })
        .update(changes);
}

function remove(id) {
    return db("users")
        .where("id", id)
        .del();
}