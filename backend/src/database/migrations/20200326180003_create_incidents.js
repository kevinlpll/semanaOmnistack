
exports.up = function(knex) {
    return knex.schema.createTable('incidents',function(table){
        //primary key auto increment
        table.increments();
        
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();
        
        //foreign key
        table.string('ong_id').notNullable();
        //constraint
        table.foreign('ong_id').references('id').inTable('ongs');
    })
};

exports.down = function(knex) {
    knex.schema.dropTable('incidents');
};
