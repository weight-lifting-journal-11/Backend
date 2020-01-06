
const router = require('express').Router();

const Ex = require('./exercise-model');
// const restricted = require('../auth/restrict-middleware');

router.get('/',
    // restricted,
    (req, res) => {
        Ex.find()
            .then(exercise => {
                res.status(200).json({ exercise })
            })
            .catch(err => {
                console.log("exercise------>", err);
                res.status(500)
                    .json({ error: err, message: 'cannot retrieve exercises' })
            })
    });