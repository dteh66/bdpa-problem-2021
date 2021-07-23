const Tokens = require('../../models/Token');

async function DeleteToken(req, res, next) {
    try {
        const user = req.user;
        result = await Tokens.deleteMany({ username: user.username });
    } catch (error) {
        console.log(error);
        res.status(500).send('Whoops, something went wrong!');
    }

    res.send(result);
}

module.exports = DeleteToken;
