"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const uri = process.env.ATLAS_URI;
if (uri !== undefined) {
    mongoose_1.default.connect(uri);
}
const connection = mongoose_1.default.connection;
connection.once('open', () => {
    console.log('MongoDB connection established');
});
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
const eventsRouter = require('./routes/events');
const usersRouter = require('./routes/users');
app.use('/events', eventsRouter);
app.use('/users', usersRouter);
app.listen(port, () => {
    console.log(`[server]: Server is running at ${port}`);
});
