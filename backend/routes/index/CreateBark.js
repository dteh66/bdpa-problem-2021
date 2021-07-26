const Barks = require('../../models/Bark');

async function CreateBark(req, res, next) {
    try {
        const username = req.user.username;
        const content = req.body.content;
        if (!username || !content) {
            return res.status(400).send('Required fields not supplied.');
        }

        const bark = await Barks.create({ author: username, content });
        return res.status(200).send(bark);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Whoops, something went wrong.');
    }
}

module.exports = CreateBark;
