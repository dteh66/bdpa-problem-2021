const Tokens = require('../../models/Token');

async function DeleteToken(req, res, next) {
    try {
        const user = req.user;
        const result = await Tokens.deleteMany({ user: user.id });
        return res.send(result);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Whoops, something went wrong!');
    }
}

module.exports = DeleteToken;
