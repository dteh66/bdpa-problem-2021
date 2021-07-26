const Users = require('../../models/User');
const Barks = require('../../models/Bark');

async function GetOneBark(req, res, next) {
    try {
        const id = req.params.id;

        const bark = await Barks.findById(id);
        if (!bark) {
            return res.status(404).send('Bark not found.');
        }

        return res.status(200).send(bark);
    } catch (e) {
        console.log(e);
        return res.status(500).send('Whoops, something went wrong!');
    }
}

module.exports = GetOneBark;
