const mongoos = require("mongoose");

const app = require('./app');

const DB_HOST = "mongodb+srv://nmosula:bnjfdjsVtbreXLg4@cluster0.lrcmpqm.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoos.connect(DB_HOST)
  .then(() => {
    app.listen(3000);
    console.log("Database connection successful");
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  })
