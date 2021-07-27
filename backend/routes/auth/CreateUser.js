const { sha512 } = require('crypto-hash');
const Users = require('../../models/User');

async function CreateUser(req, res, next) {
    try {
        const body = req.body;

        // Find existing users with the same username or email, if any, break
        const existingUsers = await Users.find({
            $or: [{ username: req.body.username }, { email: req.body.email }],
        });
        if (existingUsers.length !== 0) {
            return res
                .status(409)
                .send('A user with that username or email already exists');
        }

        const passwordHash = await sha512(body.password);
        const result = await Users.create({ ...body, password: passwordHash });

        return res.send(result);
    } catch (e) {
        console.log(e);
        return res.status(500).send('Whoops, something went wrong!');
    }
}

module.exports = CreateUser;
