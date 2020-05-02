const db = require("./db")
// Checks connection to DB
// db.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)

// })
const assistant = require("./autopilot/assistant");

// assistant.createAssistant();

assistant.checkDefaults();
