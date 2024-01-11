const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    start: {
        type: Date,
        required: true,
    },
    end: {
        type: Date,
        required: true,
    },
    reg_start: {
        type: Date,
        required: true,
    },
    reg_end: {
        type: Date,
        required: true,
    },
    mode: {
        type: String,
        enum: ['online', 'offline'],
        default: 'online'
    },
    venue: {
        name: {
            type: String,
        },
        address: {
            type: String,
        },
        country: {
            type: String,
        },
        coordinates: [
            {
                type: Number,
            }
        ]
    },
    description: {
        type: String,
        required: true
    },
    images: [
        {
            type: String,
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    bookedBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        }
    ],
    savedBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        }
    ],
    comments: [
        {
            text: {
                type: String
            },
            date: {
                type: Date,
                default: Date.now
            },
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            },
            likes:{
                type: Number,
                default: 0
            }
        }
    ],
    rating: {
        value: {
            type: mongoose.Schema.Types.Decimal128,
            default: 0.0
        },
        count: {
            type: Number,
            default: 0
        }
    },
    tags: [
        {
            type: String,
        }
    ]
});

module.exports = mongoose.model('event', eventSchema);