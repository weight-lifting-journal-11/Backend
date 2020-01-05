require('dotenv').config();

const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/user-model');

// for endpoints beginning with /api/auth
router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;

    Users.insert(user)
        .then(saved => {
            res.status(201).json({ status: 201, message: saved });
        })
        .catch(error => {
            res.status(500).json({ error: error, message: 'registration failed' });
        });
});

router.post('/login', (req, res) => {
    let { username, password } = req.body;

    Users.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                // sign in token
                const token = signToken(user);
                //send the token
                res.status(200).json({
                    token,
                    message: `Welcome ${user.username}!`,
                });
            } else {
                res.status(401).json({ message: 'Invalid Credentials' });
            }
        })
        .catch(error => {
            res.status(500).json({ error: "Unable to Login User", error });
        });
});

router.get("/logout", (req, res) => {
    if (req.session) {
        req.session.destroy(error => {
            if (error) {
                res.status(500).json({
                    message:
                        "you can checkout any time you like, but you can never leave!!!!!",
                });
            } else {
                res.status(200).json({ message: "logged out" });
            }
        });
    } else {
        res.status(200).end();
    }
});

function signToken(user) {
    const payload = {
        // header payload and verify signature
        // payload -> username, id, roles, exp date
        username: user.username,
        subject: user.id,
        // role: user.role,
    }
    const secret = process.env.SECRET || "this is my secret, i sleep eyes wide open.";
    const options = {
        expiresIn: '1h',
    };
    return jwt.sign(payload, secret, options)
}

module.exports = router;