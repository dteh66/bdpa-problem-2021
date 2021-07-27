const ResetRequests = require('../../models/ResetRequest');
const Users = require('../../models/User');

async function RequestReset(req, res, next) {
    try {
        const login = req.body.login;
        const user = await Users.findOne({
            $or: [{ username: login }, { email: login }],
        });

        // Check to make sure that the user with those login credentials exists
        if (!user) {
            return res.status(404).send();
        }

        // Create and authorize a reset request to change the password once accepted
        const resetRequest = await ResetRequests.create({ user: user.id });
        console.log(
            `You have requested a password reset. If this was not you then you may ignore this message. You can reset your password at http://localhost:3001/auth/reset-password/${resetRequest.id}`
        );
        return res.status(200).send();
    } catch (e) {
        console.log(e);
        return res.status(500).send('Whoops, something went wrong!');
    }
}

module.exports = RequestReset;
