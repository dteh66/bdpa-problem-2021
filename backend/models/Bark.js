const mongoose = require('mongoose');

const BarksSchema = mongoose.Schema({
    author: { type: String, required: true },
    content: { type: String, required: true },
    deleted: { type: Boolean, required: true, default: false },
    liked: { type: Number, required: true, default: 0 },
    barkBacks: { type: Number, required: true, default: 0 },
    rebarks: { type: Number, required: true, default: 0 },
    barkBackTo: { type: String, default: null },
    rebarkOf: { type: String, default: null },
    created: { type: Date, required: true, default: Date.now },
});

module.exports = mongoose.model('Barks', BarksSchema);
