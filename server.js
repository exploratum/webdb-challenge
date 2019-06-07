const express = require('express');
const server = express();

const projectsRouter = require('./data/routers/projectsRouter');
const actionsRouter = require('./data/routers/actionsRouter');



server.use(express.json());
server.use(logger);


server.get('/', (req,res) => {
    res.status(200).json({Cooking: "rocks!!!"})
})

server.use('/projects', projectsRouter);
server.use('/actions', actionsRouter);



/**************************************/
/*      Custom Middleware             */
/**************************************/

function logger(req, res, next) {
    console.log(`Method: ${req.method} requested at URL: ${req.url} on ${new Date().toISOString()}`);
    next();
} 


module.exports = server;