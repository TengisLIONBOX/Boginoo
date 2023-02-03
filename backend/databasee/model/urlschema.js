const mongoose = require('mongoose');

const Url = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    origUrl: {
        type: String,
        required: true,
    },
    shortUrl: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        default: Date.now(),
    },
});

module.exports = mongoose.model('Url', Url);
