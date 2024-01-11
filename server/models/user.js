const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    fname: {
        type: String,
        required: true,
    },
    lname: {
        type: String,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
    },
    dob: {
        type: Date,
        required: true,
    },
    bio: {
        type: String,
    },
    imgUrl: {
        type: String,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    authModes: [String],
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    events: {
        booked: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'event'
            }
        ],
        organized: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'event'
            }
        ],
        saved: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'event'
            }
        ],
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    },
    emailVerificationToken: String,
    emailVerificationExpire: Date,
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

module.exports = mongoose.model('user', userSchema);