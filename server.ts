import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose, { ConnectOptions } from 'mongoose';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
if(uri !== undefined) {
  mongoose.connect(uri);
}
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB connection established')
});

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

const eventsRouter = require('./routes/events');
const usersRouter = require('./routes/users');

app.use('/events', eventsRouter);
app.use('/users', usersRouter);


app.listen(port, () => {
  console.log(`[server]: Server is running at ${port}`);
});