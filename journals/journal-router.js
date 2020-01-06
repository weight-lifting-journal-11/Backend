
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

module.exports = router;
