const mongoose = require('mongoose');

const Url = new mongoose.Schema({
    userId: {
        type: String,
    },
    origUrl: {
        type: String,
    },
    shortUrl: {
        type: String,
    },
    date: {
        type: String,
        default: Date.now(),
    },
});

const UrlModel = mongoose.model('Url', Url);

module.exports = UrlModel;
