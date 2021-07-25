const mongoose = require('mongoose');

const ResetRequestSchema = mongoose.Schema({
    user: { type: String, required: true },
});

module.exports = mongoose.model('ResetRequest', ResetRequestSchema);
