
exports.up = function (knex, Promise) {
    return knex.schema.createTable("exercises", tbl => {
        tbl.increments();

        tbl
            .string("name", 150)
            .notNullable();
        tbl
            .integer("reps")
            .notNullable();
        tbl
            .integer("sets")
            .notNullable();
        tbl
            .string("weight")
            .notNullable();


        tbl
            .integer("journalId")
            .unsigned()
            .references("id")
            .inTable("journal")
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        tbl
            .integer("userId")
            .unsigned()
            .references("id")
            .inTable("users")
            .onDelete('CASCADE')
            .onUpdate('CASCADE');

    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists("exercises");
};