const mongoose = require('mongoose');

const User = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true, minlength: [8, 'min character'] },
    admin: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now() },
});

User.index({ email: 1 }, { unique: true });

const UserModel = mongoose.model('User', User);

module.exports = UserModel;
