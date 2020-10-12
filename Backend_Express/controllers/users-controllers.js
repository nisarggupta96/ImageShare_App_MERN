const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');

const User = require('../models/user');

const USERS = [
  {
    id: 'u1',
    name: 'n1',
    email: 'u1@test.com',
    password: 'p1',
  }
];

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, '-password');
  } catch (e) {
    return next(new HttpError('Cannot get users', 500));
  }
  res.status(200);
  res.json({
    users: users.map(user => user.toObject({
      getters: true
    }))
  });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.warn(errors);
    return next(new HttpError('Invalid inputs passed, please check data', 422));
  }

  const { name, email, password, places } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (e) {
    return next(new HttpError('Sign Up Failed', 500));
  }
  if (existingUser) {
    return next(new HttpError('Email exists already. Please Login', 422));
  }

  const createdUser = new User({
    name,
    email,
    password,
    image: 'https://via.placeholder.com/300',
    places
  });

  try {
    await createdUser.save();
  } catch (e) {
    return next(new HttpError('Sign Up Failed', 500));
  }

  res.status(201);
  res.json({ user: createdUser.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.warn(errors);
    return next(new HttpError('Invalid inputs passed, please check data', 422));
  }

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (e) {
    return next(new HttpError('Sign Up Failed', 500));
  }
  if (!existingUser || existingUser.password !== password) {
    return next(new HttpError('Invalid Login', 401));
  }
  res.json({ message: 'Login Success!' });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
