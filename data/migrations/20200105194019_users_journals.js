
exports.up = function (knex) {
    return knex.schema.createTable('users_journals', tbl => {
        tbl.increments();

        // Workout table columns
        tbl.string("date")
            .notNullable();
        tbl.string("target_region", 128);

        tbl.integer('user_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');

        tbl.timestamp('created_at')
            .defaultTo(knex.fn.now())
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('users_journals');
};
