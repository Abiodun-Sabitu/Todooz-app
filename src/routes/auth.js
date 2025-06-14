const auth = require('express').Router();
const { register, login, logout } = require('../controller/authController');

auth.post('/register', register);
auth.get('/register', register);// to render the registration form for browser requests
auth.post('/login', login);
auth.get('/logout', logout) // Logout route to handle user for browser requests and API requests


module.exports = auth;
// This code defines the authentication routes for user registration and login.