"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router = require('express').Router();
let Event = require('../models/event.model');
//return all events that is made by a certain user
router.route('/createdBy/:userEmail').get((req, res) => {
    const userEmail = req.params.userEmail;
    Event.find({ userEmail: userEmail })
        .then((events) => res.json(events))
        .catch((err) => res.status(400).json('Error: ' + err));
});
//return all events that a user is attending
router.route('/attending/:userEmail').get((req, res) => {
    const userEmail = req.params.userEmail;
    Event.find({ attendingUsers: userEmail })
        .then((events) => res.json(events))
        .catch((err) => res.status(400).json('Error: ' + err));
});
//return all events a user hasn't joined yet
router.route('/notAttending/:userEmail').get((req, res) => {
    const userEmail = req.params.userEmail;
    Event.find({ attendingUsers: { '$ne': userEmail } })
        .then((events) => res.json(events))
        .catch((err) => res.status(400).json('Error: ' + err));
});
router.route('/upsert/:eventID').post((req, res) => {
    const eventID = req.params.eventID;
    const newEvent = req.body;
    Event.findByIdAndUpdate(eventID, newEvent, { upsert: true })
        .then(() => res.json('Event Updated'))
        .catch((err) => {
        console.log(err);
        res.status(400).json('Error: ' + err);
    });
});
router.route('/delete/:eventID').delete((req, res) => {
    const eventID = req.params.eventID;
    Event.findByIdAndDelete(eventID)
        .then(() => res.json('Event Deleted'))
        .catch((err) => {
        console.log(err);
        res.status(400).json('Error: ' + err);
    });
});
router.route('/add/:eventID').post((req, res) => {
    const eventID = req.params.eventID;
    const userEmail = req.body.email;
    Event.findByIdAndUpdate(eventID, { '$push': { attendingUsers: userEmail } })
        .then(() => res.json('User added to event ' + eventID))
        .catch((err) => res.status(400).json('Error: ' + err));
});
module.exports = router;
