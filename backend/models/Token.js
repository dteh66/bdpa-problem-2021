const mongoose = require('mongoose');

const TokenSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    expires: {
        type: Date,
        default: 'Never Expires',
    },
    created: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

module.exports = mongoose.model('Tokens', TokenSchema);
