const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    Date: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        enum:['ADMIN','USER', 'MANAGER'],
        default: 'USER'
    },

    active: {
        type: String,
        enum: ['active', 'deactivated'],
        default: 'active'
    }

});

module.exports = mongoose.model('User', userSchema);