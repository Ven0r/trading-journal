class AccountTable {
  constructor(dao) {
    this.dao = dao
  }

  createTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS account (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        value REAL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP)`
    return this.dao.run(sql)
  }
}

module.exports = AccountTable;