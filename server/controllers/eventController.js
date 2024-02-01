const Event = require('../models/events');
const User = require('../models/user');
const mongoose = require('mongoose');
const redisClient = require('../utils/redisClient');
const client = redisClient;

let errors = "";

const allEvents = async (req, res) => {

    let { q, sort, pageNumber, pageLimit, mode, country } = req.query;

    const skipAmount = (pageNumber - 1) * pageLimit;

    let query = {}, sortQuery = { start: -1, createdAt: -1 };

    q = q.split(' ').join('');

    if(q) {
        query = {...query, 
            $or: [ 
                { title: { $regex: q, $options: 'i' } }, 
                { description: { $regex: q, $options: 'i' } },
                { mode: { $regex: q, $options: 'i' } },
                { 'venue.name': { $regex: q, $options: 'i' } },
            ],
        }
    }

    if(mode) query = {...query, mode};

    if(country){
        query = {...query, 
            'venue.country': country,
        }
    }

    switch (sort) {
        case 'registered':
            // sortQuery = { bookedBy: -1 }
        case 'title':
            sortQuery = { title: -1, createdAt: -1 };
        
        default:
            break;
    }

    const events = await Event
        .find(query)
        .sort(sortQuery)
        .skip(skipAmount)
        .limit(pageLimit)
        .populate({
            path: 'createdBy',
            model: 'user',
            select: 'fname lname username email imgUrl'
        })
        .populate({
            path: 'bookedBy',
            model: 'user',
            select: 'fname lname username email imgUrl'
        })

    const count = await Event.find(query).count();

    const key = req.originalUrl || req.url;
    const responseData = { events, count };

    client.setex(key, 3600, JSON.stringify(responseData)); // Cache for 1 hour

    res.status(200).json({ events, count });

};

const getEvent = async (req, res) => {
    
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        errors = "No such event";
        return res.status(404).json({ errors });
    }

    const event = await Event
        .findById(id)
        .populate({
            path: 'createdBy',
            model: 'user',
            select: 'fname lname username email imgUrl'
        })
        .populate({
            path: 'bookedBy',
            model: 'user',
            select: 'fname lname username email imgUrl'
        });

    if(!event){
        errors = "No such event";
        return res.status(404).json({ errors });
    }

    const key = req.originalUrl || req.url;
    const responseData = { event };

    client.setex(key, 3600, JSON.stringify(responseData)); // Cache for 1 hour

    res.status(200).json({ event });
};

const createEvent = async (req, res) => {

    const { title, start, end, reg_start, reg_end, mode, venue, description } = req.body;

    let venueInput = {};

    if(mode === 'offline'){
        venueInput = {
            name: venue.name,
            address: venue.address,
            country: venue.country,
            coordinates: [venue.latitude, venue.longitude]
        };
    }

    const eventExists = await Event.findOne({ title, start, end, reg_start, reg_end, mode, venue: venueInput, description });

    if(eventExists){
        errors = "An Event with the same details already exists";
        return res.status(401).json({ errors });
    }

    const userId = req.user._id;

    const event = await Event.create({
        title, start, end, reg_start, reg_end, mode, venue: venueInput, description, createdBy: userId
    });

    const user = await User.findOne({ _id: userId });

    user.events.push(event._id);

    await user.save();

    res.status(200).json({ event, message: "Event Created Successfully" });

};

const updateEvent = async (req, res) => {

    const { oldtitle, newtitle, start, end, reg_start, reg_end, venue, description } = req.body;

    const event = await Event.findOne({ title: oldtitle });

    if(!event){
        return res.status(401).json({
            "message" : "No such event found"
        });
    }

    event.title = newtitle; 
    if(start) event.start = start; 
    if(end) event.end = end; 
    if(reg_start) event.reg_start = reg_start; 
    if(reg_end) event.reg_end = reg_end; 
    if(venue) event.venue = venue; 
    if(description) event.description = description; 

    await event.save();

    res.status(200).json({
        "message" : "Event Updated Successfully"
    });
};

const deleteEvent = async (req, res) => {

    const { id } = req.params;

    await Event.findByIdAndDelete(id);

    res.status(200).json({
        message : "Event Deleted Successfully"
    });

};

const bookEvent = async (req, res) => {

    const { userId, eventId } = req.query;

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
        errors = "No such event";
        return res.status(404).json({ errors });
    }

    const event = await Event.findById(eventId);

    if (!event) {
        errors = "Event not found or already ended";
        return res.status(404).json({ errors });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        errors = "Invalid user";
        return res.status(404).json({ errors });
    }

    if (event.bookedBy.includes(userId)) {
        errors = "You've already booked this event";
        return res.status(401).json({ errors });
    }

    event.bookedBy.push(userId);
    await event.save();

    res.status(200).json({
        message: "Event Booked Successfully"
    });

}


module.exports = {
    allEvents,
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent,
    bookEvent,
}