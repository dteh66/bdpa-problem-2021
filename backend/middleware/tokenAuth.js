const Users = require('../models/User');
const Tokens = require('../models/Token');

async function tokenAuth(req, res, next) {
    try {
        // Check if token exists, if not, break before making database queries
        const token = req.query.token || req.body.token;
        if (!token) {
            return res
                .status(400)
                .send(
                    'You did not send a valid token, are you sure you are who you think you are?'
                );
        }

        // Find token, then get username from result
        const result = await Tokens.findOne({ token });
        const userId = result ? result.user : null;

        // Check whether token is expired or if there was no result
        if (
            !result ||
            (result.expired !== null && new Date() < result.expired)
        ) {
            await Tokens.deleteMany({ user: userId });
            return res.status(511).send('Session Expired');
        }

        const user = await Users.findById(userId);

        // Connect user to request for use in other routes
        req.user = user;

        return next();
    } catch (e) {
        console.log(e);
        return res.status(500).send('Whoops, something went wrong!');
    }
}

module.exports = tokenAuth;
