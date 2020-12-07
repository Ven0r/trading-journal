class AssetTable {
  constructor(dao) {
    this.dao = dao
  }

  createTable() {
    const sql = `
    CREATE TABLE IF NOT EXISTS asset (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      decimal REAL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP)`
    return this.dao.run(sql)
  }
}

module.exports = AssetTable;