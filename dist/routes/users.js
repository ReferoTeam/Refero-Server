"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router = require('express').Router();
let User = require('../models/user.model');
router.route('/:id').get((req, res) => {
    const id = req.params.id;
    if (typeof id !== "string") {
        res.status(400).json('Error cant find id');
    }
    User.findById(id)
        .then((user) => res.json(user))
        .catch((err) => res.status(400).json('Error: ' + err));
});
router.route('/add').post((req, res) => {
    const id = req.body.id;
    const displayName = req.body.displayName;
    const email = req.body.email;
    const attendingEvents = [];
    const newUser = new User({
        _id: id,
        displayName: displayName,
        email: email,
        attendingEvents: attendingEvents
    });
    newUser.save()
        .then(() => res.json('User Added!'))
        .catch((err) => res.status(400).json('Error:P ' + err));
});
module.exports = router;
