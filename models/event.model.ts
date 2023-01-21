import mongoose from "mongoose";

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  _id: { type: String, required: true},
  eventname: {type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  datetime: { type: Date, required: true },
  duration: { type: Number, required: true },
  userEmail: { type: String, required: true },
  eventInterests: [String],
  attendingUsers: [String]
}, {
  timestamps: true,
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;