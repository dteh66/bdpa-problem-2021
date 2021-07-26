const { sha512 } = require('crypto-hash');
const Users = require('../models/User');

async function basicAuth(req, res, next) {
    try {
        const login = req.body.login;
        const password = req.body.password;

        // Check that the username and password exists before spending time creating a hash
        if (!login || !password) {
            return res
                .status(400)
                .send(
                    'We did not recieve the required data, please check your information and try again.'
                );
        }
        const passwordHash = await sha512(req.body.password);

        const result = await Users.findOne({
            $or: [{ username: login }, { email: login }],
        });

        // Checking if there is a result from the login query
        if (!result) {
            return res
                .status(400)
                .send(
                    'Are you sure you have an account? Usernames might be case-sensitive.'
                );
        }

        // Checking if submitted password is the same
        if (passwordHash === result.password) {
            // Connect user to request for use in other routes
            req.user = result;
            return next();
        } else {
            return res
                .status(400)
                .send(
                    'Your request did not succeed, check your information and try again.'
                );
        }
    } catch (e) {
        console.log(e);
        return res.status(500).send('Whoops, something went wrong!');
    }
}

module.exports = basicAuth;
