
exports.up = function (knex, Promise) {
    return knex.schema.createTable("journal", tbl => {
        tbl.increments();

        tbl
            .integer("userId")
            .unsigned()
            .references("id")
            .inTable("users");
        tbl.string("date")
            .notNullable();
        tbl.string("region", 150)
            .notNullable();
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists("journal");
};
