import express, {Request, Response, Router} from 'express';
const router = require('express').Router();
let Event = require('../models/event.model');

router.route('/').get((req: Request, res: Response) => {
  Event.find()
    .then((events: typeof Event[]) => res.json(events))
    .catch((err: Error) => res.status(400).json('Error: ' + err))
});

router.route('/add').post((req: Request, res: Response) => {
  const eventname = req.body.eventname;
  const username = req.body.username;
  const description = req.body.description;
  const datetime = Date.parse(req.body.datetime);
  const duration = Number(req.body.duration);
  const location = req.body.location;

  const newEvent = new Event({
    eventname,
    username,
    description,
    datetime,
    duration,
    location
  });

  newEvent.save()
    .then(() => res.json('Event Added!'))
    .catch((err: Error) => res.status(400).json('Error: ' + err))
});

module.exports = router;