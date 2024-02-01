const express = require('express');

const router = express.Router();

const { auth } = require('../middlewares/auth');

const { allEvents, getEvent, createEvent, updateEvent, deleteEvent, bookEvent } = require('../controllers/eventController');

const cacheMiddleware = require('../middlewares/cacheMiddleware');

router.post('/', cacheMiddleware(60), allEvents);

router.get('/:id', cacheMiddleware(60), getEvent);

router.post('/create', auth, createEvent);

router.post('/update', updateEvent);

router.delete('/delete/:id', deleteEvent);

router.post('/book-event', bookEvent);

module.exports = router;