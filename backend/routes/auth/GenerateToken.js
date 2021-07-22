const { sha512 } = require('crypto-hash');
const { v4: uuidv4 } = require('uuid');

const Tokens = require('../../models/Token');

async function GenerateToken(req, res, next) {
    const token = await sha512(`${uuidv4()}${req.username}`);
    const user = req.user;
    const remember = req.body.remember;
    const expires = remember ? null : Date.now() + 3600000;

    // Delete previous/timed-out tokens and create a new one for that username
    await Tokens.deleteMany({ username: user.username });

    try {
        const result = await Tokens.create({
            username: user.username,
            token,
            expires,
        });

        res.send({
            token: result.token,
            expires: result.expires,
        });
    } catch (e) {
        console.log(e);

        res.status(500).send('Whoops, something went wrong.');
    }
}

module.exports = GenerateToken;
