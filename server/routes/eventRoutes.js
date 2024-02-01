const express = require('express');

const router = express.Router();

const { auth } = require('../middlewares/auth');

const { allEvents, getEvent, createEvent, updateEvent, deleteEvent, bookEvent } = require('../controllers/eventController');

const { cacheMiddleware } = require('../utils/cacheMiddleware');

router.post('/', cacheMiddleware, allEvents);

router.get('/:id', cacheMiddleware, getEvent);

router.post('/create', auth, createEvent);

router.post('/update', updateEvent);

router.delete('/delete/:id', deleteEvent);

router.post('/book-event', bookEvent);

module.exports = router;