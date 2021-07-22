const { sha512 } = require('crypto-hash');
const Users = require('../models/User');

async function basicAuth(req, res, next) {
    try {
        const login = req.body.login;
        const password = req.body.password;

        // Check that the username and password exists before spending time creating a hash
        if (!login || !password) {
            next(new Error('Unauthorized User'));
            return;
        }
        const passwordHash = await sha512(req.body.password);

        const result = await Users.findOne({
            $or: [{ username: login }, { email: login }],
        });

        // Checking if there is a result from the login query
        if (result.length === 0) {
            next(new Error('Unauthorized User'));
            return;
        }

        // Checking if submitted password is the same
        if (passwordHash === result.password) {
            // Connect user to request for use in other routes
            req.user = result;
            next();
            return;
        } else {
            next(new Error('Unauthorized User'));
            return;
        }
    } catch (e) {
        console.log(e);

        const err = new Error('You are missing something');
        next(err);
    }
}

module.exports = basicAuth;
