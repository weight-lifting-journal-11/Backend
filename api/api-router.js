
const router = require('express').Router();

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/user-router');
const journalsRouter = require('../journals/journal-router');
const exercisesRouter = require('../exercises/exercise-router');

router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/journals', journalsRouter);
router.use('/exercises', exercisesRouter);

// router.get('/', (req, res) => {
//     const message = process.env.MSG || "Hello World"
//     res.json({ message });
// });

module.exports = router;