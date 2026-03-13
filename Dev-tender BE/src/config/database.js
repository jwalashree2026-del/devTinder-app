const mongoose = require ("mongoose");



const connectDB =async() => {
   await mongoose.connect("mongodb+srv://jwala:Moderated2024@ramya.piokhso.mongodb.net/devTinder");

};
 module.exports = connectDB;
