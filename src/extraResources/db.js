const sqlite3 = require('sqlite3').verbose();

const createDB = () =>  {
    let db = new sqlite3.Database('./trading-journal-db.db', (err) => {
        if (err) {
          console.error(err.message);
        }
        console.log('Connected to the trading-journal database.');
      });
}

const createTables = () => {
    knex.schema.createTable('trades', (table) => {
      table.increments('id').primary;
      table.timestamp('created_at');
      table.timestamp('closed_at');
      table.string('asset');
      table.boolean('long_short');
      table.decimal('entry', 2, 2);
      table.decimal('target', 2, 2);
      table.decimal('stop_loss', 2, 2);
      table.string('risk');
      table.decimal('size', 2, 2);
    }).then(() => console.log("table trades was created"))
    .catch((err) => { console.log(err); throw err })
    .finally(() => {
        knex.destroy();
    });
    
    knex.schema.createTable('account', function (table) {
      table.increments('id').primary;
      table.decimal('value', 2, 2);
      table.timestamp('created_at');
    }).then(() => console.log("table account was created"))
    .catch((err) => { console.log(err); throw err })
    .finally(() => {
        knex.destroy();
    });
    
    knex.schema.createTable('assets', function (table) {
      table.increments('id').primary;
      table.string('asset');
    }).then(() => console.log("table account was created"))
    .catch((err) => { console.log(err); throw err })
    .finally(() => {
        knex.destroy();
    });
}