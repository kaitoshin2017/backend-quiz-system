const mongoose = require('mongoose');

// 1 Create an schema
const usersSchema = new mongoose.Schema({
    username: String,
    password: String,
});





// 2 Create model for your schema
const User = mongoose.model("User", usersSchema);

exports.module = User; // Export the model