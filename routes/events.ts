import express, {Request, Response, Router} from 'express';
const router = require('express').Router();
let Event = require('../models/event.model');

router.route('/').get((req: Request, res: Response) => {
  Event.find()
    .then((events: typeof Event[]) => res.json(events))
    .catch((err: Error) => res.status(400).json('Error: ' + err))
});

//return all events that is made by a certain user
router.route('/createdBy/:userEmail').get((req: Request, res: Response) => {
  const userEmail = req.params.userEmail;
  Event.find({ userEmail: userEmail })
    .then((events: typeof Event[]) => res.json(events))
    .catch((err: Error) => res.status(400).json('Error: ' + err))
});

//return all events that a user is attending
router.route('/attending/:userEmail').get((req: Request, res: Response) => {
  const userEmail = req.params.userEmail;
  Event.find({ attendingUsers: userEmail })
    .then((events: typeof Event[]) => res.json(events))
    .catch((err: Error) => res.status(400).json('Error: ' + err))
});

router.route('/upsert/:eventID').post((req: Request, res: Response) => {
  const eventID = req.params.eventID;
  const newEvent = req.body;
  Event.findByIdAndUpdate(eventID, newEvent, {upsert: true})
    .then(() => res.json('Event Updated'))
    .catch((err: Error) => {
      console.log(err);
      res.status(400).json('Error: ' + err);
    })
});

router.route('/delete/:eventID').delete((req: Request, res: Response) => {
  const eventID = req.params.eventID;
  Event.findByIdAndDelete(eventID)
    .then(() => res.json('Event Deleted'))
    .catch((err: Error) => {
      console.log(err);
      res.status(400).json('Error: ' + err);
    })
});

router.route('/add').post((req: Request, res: Response) => {
  const eventname = req.body.eventname;
  const userID = req.body.userID;
  const description = req.body.description;
  const datetime = Date.parse(req.body.datetime);
  const duration = Number(req.body.duration);
  const location = req.body.location;
  const attendingUsers: any = [];

  const newEvent = new Event({
    eventname,
    userID,
    description,
    datetime,
    duration,
    location,
    attendingUsers
  });

  newEvent.save()
    .then(() => res.json('Event Added'))
    .catch((err: Error) => res.status(400).json('Error: ' + err))
});

module.exports = router;