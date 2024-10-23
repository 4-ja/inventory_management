const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    password:String
});
const UserModel = mongoose.model("logins", UserSchema);
module.exports = UserModel;