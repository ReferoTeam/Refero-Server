import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id: { type: String, required: true},
  firstName: { type: String, required: true},
  lastName: { type: String, required: true},
  email: { type: String, required: true, unique: true},
  description: { type: String, required: true }, 
  interests: [String],
  attendingEvents: [String]
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User