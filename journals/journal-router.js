
const router = require('express').Router();

const UJ = require('./journal-model');
// const restricted = require('../auth/restrict-middleware');

router.get('/',
    // restricted,
    (req, res) => {
        UJ.find()
            .then(journal => {
                res.status(200).json({ journal })
            })
            .catch(err => {
                console.log("journal------>", err);
                res.status(500)
                    .json({ error: err, message: 'cannot retrieve journals' })
            })
    });

router.post('/',
    // restricted, 
    (req, res) => {
        let newjournal = req.body;
        if (!newjournal.userId) {
            res.status(422).json({ message: "Missing: userId" })
        }
        if (!newjournal.region) {
            res.status(422).json({ message: "Missing: region" })
        }
        if (!newjournal.date) {
            res.status(422).json({ message: "Missing: date" })
        }
        UJ.add(newjournal)
            .then(item => {
                res.status(201).json(item);
            })
            .catch(err => {
                console.log("journal------>", err);
                res.status(500).json(err);
            })
    });

router.get('/:id',
    // restricted, 
    (req, res) => {
        UJ.findById(req.params.id)
            .then(journal => {
                res.status(200).json(journal)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    });

router.get('/users/:userId',
    // restricted, 
    (req, res) => {
        const { userId } = req.params
        UJ.findByUserId(userId)
            .then(journal => {
                if (journal) {
                    res.status(200).json(journal)
                } else {
                    res.status(404).json({ message: "Could not retrieve journal by user" })
                }
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
        if (!changes.region) {
            res.status(422).json({ message: "Missing: region" })
        }
        if (!changes.date) {
            res.status(422).json({ message: "Missing: date" })
        }
        UJ.update(id, changes)
            .then(updated => {
                if (updated) {
                    res.status(200).json({ success: true, updated })
                } else {
                    res.status(404).json({ message: "This journal could not be updated" })
                }
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
    });

router.delete('/:id',
    // restricted, 
    (req, res) => {
        UJ.remove(req.params.id)
            .then(count => {
                if (count > 0) {
                    res.status(200).json({ message: "This journal has been removed " })
                } else {
                    res.status(404).json({ message: "This journal does not exist" })
                }
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
    })

// router.get('/exercises/:userId/:id', restricted, (req, res) => {
//         })


module.exports = router;
