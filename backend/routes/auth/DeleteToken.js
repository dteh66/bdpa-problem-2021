const Tokens = require('../../models/Token');

async function DeleteToken(req, res, next) {
    try {
        const username = req.username;
        result = await Tokens.deleteMany({ username });
    } catch (error) {
        console.log(error);
        res.status(500).send('Whoops, something went wrong!');
    }

    res.send(result);
}

module.exports = DeleteToken;
