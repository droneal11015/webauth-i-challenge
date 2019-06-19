const router = require('express').Router();

const restricted = require('../authentication/restricted-middleware');
const User = require('./users-model');



router.get('/', restricted, (req, res) => {
    User.find()
      .then(users => {
        res.json(users);
      })
      .catch(err => res.status(500)({message: 'You are not an authorized user'})
      );
  });

  module.exports = router;