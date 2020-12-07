class TradeTable {
  constructor(dao) {
    this.dao = dao
  }

  createTable() {
    const sql = `
    CREATE TABLE IF NOT EXISTS trades (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      closed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      asset TEXT,
      long_short BOOLEAN,
      entry REAL,
      target REAL,
      stop_loss REAL,
      risk REAL,
      size REAL)`
    return this.dao.run(sql)
  }
}

module.exports = TradeTable;