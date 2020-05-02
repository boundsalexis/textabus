const db = require("./db")
// Checks connection to DB
// db.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)

// })
const assistant = require("./autopilot/autopilot");
const other = require("./autopilot/other")

assistant.listAssistant();
console.log(other.other);