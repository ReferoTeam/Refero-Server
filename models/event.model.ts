import mongoose from "mongoose";

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  eventname: {type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  datetime: { type: Date, required: true },
  duration: { type: Number, required: true },
  username: { type: String, required: true },
}, {
  timestamps: true,
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;