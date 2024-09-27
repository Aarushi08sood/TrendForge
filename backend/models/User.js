// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//     name:{
//         type:String,
//         required:true
//     },
//     username:{
//         type:String,
//         required:true,
//         unique:true
//     },
//     email:{
//         type:String,
//         required:true,
//         unique:true
//     },
//     password:{
//         type:String,
//         required:true
//     },
//     // followers:{
//     //     type:Array,
//     //     default:[]
//     // },
//     // following:{
//     //     type:Array,
//     //     default:[]
//     // }, 
//     // bookmarks:{
//     //     type:Array,
//     //     default:[]
//     // }
// },{timestamps:true});
// export const User = mongoose.model("User", userSchema);





// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verificationCode: { type: String },
  isVerified: { type: Boolean, default: false },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
