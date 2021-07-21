const { sha512 } = require('crypto-hash');
const Users = require('../../models/User');

async function CreateUser(req, res, next) {
    const body = req.body;

    // Find existing users with the same username, if any, break
    const existingUsers = await Users.find({ username: req.body.username });
    if (existingUsers.length !== 0) {
        next(new Error('A user with that name already exists'));
        return;
    }

    try {
        const passwordHash = await sha512(body.password);
        const result = await Users.create({ ...body, password: passwordHash });

        res.send(result);
        next();
    } catch (e) {
        console.log(e);

        res.status(500).send('Whoops, something went wrong!');
    }
}

module.exports = CreateUser;
