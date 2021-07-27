const Barks = require('../../models/Bark');
const Tokens = require('../../models/Token');
const Users = require('../../models/User');

/* SORTING ALGORITHM */
// Filter for followed (AUTHED ONLY)
// 1. Destructure the created field and to a $group on years.
// 2. Then do a $group on months.
// 3. Then do a $group on days.
// 4. Then, you could do a $group on individual hours.
// 5. Do a sort on all groups using likes as the reference.
// 6. Recombine all groups.
// 7. (AUTHED ONLY) Append separate query sorted by 1-6 from non-followed users.

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
