
const express = require('express');

const apiRouter = require('./api-router.js');
const configureMiddleware = require('./config-middleware');

const server = express();

configureMiddleware(server);

server.use('/api', apiRouter);

server.get('/', (req, res) => {
    const message = process.env.MSG || "Hello World"
    res.json({ message });
});

module.exports = server;