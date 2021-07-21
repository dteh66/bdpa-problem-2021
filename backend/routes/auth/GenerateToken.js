const { sha512 } = require('crypto-hash');

const Tokens = require('../../models/Token');

async function GenerateToken(req, res, next) {
    const token = await sha512(`${new Date()}${req.username}`); // Someone come up with something else to hash, this is probably not a good idea
    const username = req.body.username;

    // Delete previous/timed-out tokens and create a new one for that username
    await Tokens.deleteMany({ username });
    Tokens.create({ username, token });

    res.send(token);
}

module.exports = GenerateToken;
