const HttpError = require('../models/http-error');

const uuid = require('uuid').v4;

const USERS = [
  {
    id: 'u1',
    name: 'n1',
    email: 'u1@test.com',
    password: 'p1',
  }
];

const getUsers = (req, res, next) => {
  res.status(200);
  res.json({ users: USERS });
};

const signup = (req, res, next) => {
  const { name, email, password } = req.body;
  const createdUser = {
    id: uuid(),
    name,
    email,
    password
  };
  const userPresent = USERS.find(user => user.email === email);
  if (userPresent) {
    throw new HttpError('Email already exists!', 402);
  }
  USERS.push(createdUser);
  res.status(201);
  res.json({ user: createdUser });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  const filteredUser = USERS.find(user => user.email === email);
  if (!filteredUser || filteredUser.password !== password) {
    throw new HttpError('Could not identify the user', 401);
  }
  res.json({ message: 'Login Success!' });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
