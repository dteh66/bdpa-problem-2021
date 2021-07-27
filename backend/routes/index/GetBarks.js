const Barks = require('../../models/Bark');

function GetBarks(req, res, next) {
    const token = req.query.token;
    if (token) {
        // Find the user if the token is sent in a query
        const result = await Tokens.findOne({ token });
        const userId = result ? result.user : null;

        if (
            !result ||
            (result.expired !== null && new Date() < result.expired)
        ) {
            await Tokens.deleteMany({ user: userId });
            return res.status(511).send('Session Expired');
        }
        const user = await Users.findById(userId);
    }
}

module.exports = GetBarks;
