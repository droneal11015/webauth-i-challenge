const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const session = require('express-session');

const SessionStore = require('connect-session-knex')(session);

const authRouter = require('./authentication/auth-router.js');
const usersRouter = require('./users/user-router.js');

const server = express();

const sessionConfig = {
  name: 'monkey',
  secret: 'fubar, banana',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false,
    httpOnly: true
  },
  store: new SessionStore({
    knex: require('./data/dbConfig.js'),
    tablename: 'sessions',
    sidfieldname: 'sid',
    createtable: true,
    clearInterval: 1000 * 60 * 60,
  }),
}

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

server.use('/api/auth', authRouter);

server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
    res.send("Server is running")
});

  

module.exports = server;