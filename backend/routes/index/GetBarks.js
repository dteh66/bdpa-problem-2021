const Barks = require('../../models/Bark');
const Tokens = require('../../models/Token');
const Users = require('../../models/User');

async function GetBarks(req, res, next) {
    try {
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

            const barks = await Barks.find({
                author: { $in: user.followedUsers },
                deleted: false,
            });
            const unfollowedBarks = await Barks.find({
                author: { $not: { $in: user.followedUsers } },
                deleted: false,
            });
            return res.status(200).send({ barks, unfollowedBarks });
        } else {
            const barks = await Barks.find();
            return res.status(200).send(barks);
        }
    } catch (e) {
        console.log(e);
        return res.status(500).send('Whoops, something went wrong!');
    }
}

module.exports = GetBarks;
