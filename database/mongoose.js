const mongoose = require('mongoose');

// Set the promise to connect to the database
mongoose.Promise = global.Promise;

// Set up the connection access to the database
mongoose.connect('mongodb://127.0.0.1:27017/daycare-manager-v1', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(() => console.log("Database Connection"))
    .catch((error) => console.log(error));

module.exports = mongoose;
