const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user');

// API's for USER ROUTES

// Create user (Angad)
router.post('/', UserController.createUser);

// Get a user by ID (Angad)
router.get('/:id', UserController.getUserById);

// Get a user by email and password (Eden)
router.post('/login', UserController.userLogin);

// Delete a user (Eden)
router.delete('/:id', UserController.deleteUser);

// Update a user (Bin)
router.put('/:id', UserController.updateUser);

// Get All Users (Bin)
router.get('/', UserController.getAllUsers);


module.exports = router;