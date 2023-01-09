"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const eventSchema = new Schema({
    eventname: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    datetime: { type: Date, required: true },
    duration: { type: Number, required: true },
    username: { type: String, required: true },
}, {
    timestamps: true,
});
const Event = mongoose_1.default.model('Event', eventSchema);
module.exports = Event;
