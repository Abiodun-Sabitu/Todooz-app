const auth = require('express').Router();
const { register, login } = require('../controller/authController');

auth.post('/register', register);
auth.post('/login', login);


module.exports = auth;
// This code defines the authentication routes for user registration and login.