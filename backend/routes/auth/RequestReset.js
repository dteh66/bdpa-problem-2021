const ResetRequests = require('../../models/ResetRequest');
const Users = require('../../models/User');

async function RequestReset(req, res, next) {
    const login = req.body.login;
    const user = await Users.findOne({
        $or: [{ username: login }, { email: login }],
    });

    if (!user) {
        res.status(200);
        return;
    }

    const resetRequest = await ResetRequests.create({ user: user.id });
    console.log(
        `You have requested a password reset. If this was not you then you may ignore this message. You can reset your password at http://localhost:3001/auth/reset-password/${resetRequest.id}`
    );
    res.status(200).send();
}

module.exports = RequestReset;
