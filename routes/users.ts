import express, {Request, Response, Router} from 'express';
const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get( (req: Request, res: Response) => {
  User.find()
    .then((users: typeof User[]) => res.json(users))
    .catch((err: Error) => res.status(400).json('Error: ' + err))
});

router.route('/add').post((req: Request, res: Response) => {
  const username: String = req.body.username;
  const newUser = new User({username});

  newUser.save()
    .then(() => res.json('User Added!'))
    .catch((err: Error) => res.status(400).json('Error:P ' + err))
});

module.exports = router;