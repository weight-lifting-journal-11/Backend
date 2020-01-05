
const router = require('express').Router();

const Users = require('./user-model');
const restricted = require('../auth/restrict-middleware');

router.get('/',
    restricted,
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

router.get('/:id', async (req, res) => {
    await Users.findById(req.params.id)
        .then(user => {
            // console.log(res)
            res.status(200).json(user)
        })
        .catch(err => {
            console.log(err)
        })
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    Users.update(id, changes)
        .then(updated => {
            res.status(200).json(updated);
        })
        .catch(err => {
            console.log(err);
        });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Users.findById(id)
        .then(user => {
            if (!user) {
                res
                    .status(404)
                    .json({ message: "The user with the specified ID does not exist." })
            } else {
                Users.remove(id)
                    .then(user => {
                        res
                            .status(201)
                            .json(user)
                    })
                    .catch(error => {
                        console.log('error on DELETE /users/:id', error);
                        res
                            .status(500)
                            .json({ error: "The user could not be removed." });
                    });
            };
        });
});




module.exports = router;

