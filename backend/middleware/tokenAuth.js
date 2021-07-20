const Users = require('../models/User');
const Tokens = require('../models/Token');

async function tokenAuth(req, res, next) {
    const token = req.query.token || req.body.token;
    if (!token) {
        res.status(400).send(
            'You did not send a valid token, are you sure you are who you think you are?'
        );
    }

    const result = await Tokens.findOne({ token });
    const username = result ? result.username : null;

    if (!result || new Date() - result.created > 900000) {
        await Tokens.deleteMany({ username });
        res.status(511);
        next(new Error('Session Expired'));
        return;
    }

    req.username = username;

    next();
}

module.exports = tokenAuth;
