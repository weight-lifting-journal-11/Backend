
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

router.post('/',
    // restricted, 
    (req, res) => {
        let newExercise = req.body;
        if (!newExercise.name) {
            res.status(422).json({ message: "Missing: name" })
        }
        if (!newExercise.weight) {
            res.status(422).json({ message: "Missing: weight" })
        }
        if (!newExercise.reps) {
            res.status(422).json({ message: "Missing: reps" })
        }
        if (!newExercise.sets) {
            res.status(422).json({ message: "Missing: sets" })
        }
        if (!newExercise.journalId) {
            res.status(422).json({ message: "Missing: journalId" })
        }
        if (!newExercise.userId) {
            res.status(422).json({ message: "Missing: userId" })
        }
        Ex.add(newExercise)
            .then(item => {
                res.status(201).json(item);
            })
            .catch(err => {
                console.log('Ex route--------->', err)
                res.status(500).json(err)
            })
    })

module.exports = router;