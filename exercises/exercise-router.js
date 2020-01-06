
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


router.get('/:id',
    // restricted, 
    (req, res) => {
        Ex.findById(req.params.id)
            .then(journal => {
                res.status(200).json(journal)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    });

router.put('/:id',
    // restricted, 
    (req, res) => {
        const { id } = req.params
        let changes = req.body;
        if (!changes.name) {
            res.status(422).json({ message: "Missing: name" })
        }
        if (!changes.weight) {
            res.status(422).json({ message: "Missing: weight" })
        }
        if (!changes.reps) {
            res.status(422).json({ message: "Missing: reps" })
        }
        if (!changes.sets) {
            res.status(422).json({ message: "Missing: sets" })
        }
        if (!changes.journalId) {
            res.status(422).json({ message: "Missing: journalId" })
        }
        if (!changes.userId) {
            res.status(422).json({ message: "Missing: userId" })
        }
        Ex.update(id, changes)
            .then(updated => {
                if (updated) {
                    res.status(200).json({ success: true, updated })
                } else {
                    res.status(404).json({ message: "This item could not be updated" })
                }
            })
            .catch(err => {
                console.log('Ex PUT------>', err)
                res.status(500).json(err)
            })
    })

router.delete('/:id',
    // restricted, 
    (req, res) => {
        Ex.remove(req.params.id)
            .then(count => {
                if (count > 0) {
                    res.status(200).json({ message: "This item has been removed " })
                } else {
                    res.status(404).json({ message: "This item does not exist" })
                }
            })
            .catch(err => {
                console.log('Ex DELETE------>', err)
                res.status(500).json(err)
            })
    })

router.get('/journals/:journalId',
    // restricted, 
    (req, res) => {
        const { journalId } = req.params
        Ex.findByJournalId(journalId)
            .then(exercises => {
                if (exercises) {
                    res.status(200).json(exercises)
                } else {
                    res.status(404).json({ message: "Could not retrieve exercises by user" })
                }
            })
            .catch(err => {
                console.log('Ex ById------->', err)
                res.status(500).json(err)
            })
    });

module.exports = router;