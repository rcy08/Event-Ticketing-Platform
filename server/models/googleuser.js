const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const googleUserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: true
    },
    logs: [String],
}, {timestamps: true});

module.exports = mongoose.model('googleUser', googleUserSchema);