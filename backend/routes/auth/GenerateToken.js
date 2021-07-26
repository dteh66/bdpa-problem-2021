const { sha512 } = require('crypto-hash');
const { v4: uuidv4 } = require('uuid');

const Tokens = require('../../models/Token');

async function GenerateToken(req, res, next) {
    try {
        const token = await sha512(`${uuidv4()}${req.username}`);
        const user = req.user;
        const remember = req.body.remember;
        const expires = remember ? null : Date.now() + 3600000;

        // Delete previous/timed-out tokens
        await Tokens.deleteMany({ login: user.id });

        const result = await Tokens.create({
            user: user.id,
            token,
            expires,
        });
        return res.send({
            token: result.token,
            expires: result.expires,
        });
    } catch (e) {
        console.log(e);

        return res.status(500).send('Whoops, something went wrong.');
    }
}

module.exports = GenerateToken;
