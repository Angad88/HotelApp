const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/admin');

// API's for admin
// Create admin
router.post('/', AdminController.createAdmin);

// Get an admin by ID 
router.get('/:id', AdminController.getAdminById);

// Get a admin by email and password
router.post('/login', AdminController.adminLogin);

// Delete an admin
router.delete('/:id', AdminController.deleteAdmin);

// Update an admin
router.put('/:id', AdminController.updateAdmin);

// Get All Admin
router.get('/', AdminController.getAllAdmin);

module.exports = router;