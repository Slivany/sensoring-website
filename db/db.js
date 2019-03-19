const sqlite3 = require('sqlite3').verbose()
const path = require('path')
const dbName = path.join(__dirname, 'sensors.sqlite')
const db = new sqlite3.Database(dbName)

class Sensors {
  static all (callback) {
    db.all('SELECT time, humidity, temperature FROM sensor', callback)
  }

  static getFromDate (wo, callback) {
    const sql = ('SELECT time, humidity, temperature FROM sensor WHERE ?', callback)
    db.all(sql, wo.time, callback)
  }

  static insert (wo, callback) {
    const sql = 'INSERT INTO sensor(time, humidity, temperature) VALUES (?, ?, ?)'
    db.run(sql, wo.time, wo.humidity, wo.temperature, callback)
  }
}

db.serialize(() => {
  const createDB = `
  CREATE TABLE IF NOT EXISTS sensor
    (id INTEGER PRIMARY KEY, time DATETIME NOT NULL, humidity, temperature REAL NOT NULL)
  `
  db.run(createDB)
})

module.exports = db
module.exports.Sensors = Sensors
