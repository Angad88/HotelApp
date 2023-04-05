const express = require('express');
const router = express.Router();
const RoomController = require('../controllers/hotel');

// API's for hotel
// Create a room
router.post('/', RoomController.createRoom);

// Get a room by ID 
router.get('/:id', RoomController.getRoomById);

// Delete a room
router.delete('/:id', RoomController.deleteRoom);

// Update a room
router.put('/:id', RoomController.updateRoom);

// Get All Rooms
router.get('/', RoomController.getAllRoom);

module.exports = router;