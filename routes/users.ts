import express, {Request, Response, Router} from 'express';
const router = require('express').Router();
let User = require('../models/user.model');

router.route('/:id').get((req: Request, res: Response) => {
  const id = req.params.id;
  if(typeof id !== "string") {
    res.status(400).json('Error cant find id')
  }
  User.findById(id)
    .then((user: typeof User) => res.json(user))
    .catch((err: Error) => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req: Request, res: Response) => {
  const id: String = req.body.id;
  const displayName: String = req.body.displayName
  const email: String = req.body.email;
  const attendingEvents: any = [];

  const newUser = new User({
    _id: id,
    displayName: displayName,
    email: email,
    attendingEvents: attendingEvents 
  });

  newUser.save()
    .then(() => res.json('User Added!'))
    .catch((err: Error) => res.status(400).json('Error:P ' + err))
});

module.exports = router;