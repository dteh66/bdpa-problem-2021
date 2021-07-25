const mongoose = require('mongoose');

const TokenSchema = mongoose.Schema({
    user: { type: String, required: true },
    token: { type: String, required: true },
    expires: { type: Date, default: null },
    created: { type: Date, required: true, default: Date.now },
});

module.exports = mongoose.model('Tokens', TokenSchema);
