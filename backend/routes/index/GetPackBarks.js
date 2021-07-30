const Barks = require('../../models/Bark');

async function GetPackBarks(req, res, next) {
    try {
        const user = req.user;
        const barks = await Barks.find({
            author: { $in: user.pack },
            deleted: false,
        });
        return res.status(200).send(barks);
    } catch (e) {
        console.log(e);
        return res.status(500).send('Whoops, something went wrong!');
    }
}

module.exports = GetPackBarks;
