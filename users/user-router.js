
const router = require('express').Router();

const Users = require('./user-model');
// const restricted = require('../auth/restrict-middleware');

router.get('/',
    // restricted, 
    (req, res) => {
        Users.find()
            .then(users => {
                res.status(200).json({ users })
            })
            .catch(err => {
                console.log("here i am", err);
                res.status(500)
                    .json({ error: err, message: 'cannot retrieve users' })
            })
    });