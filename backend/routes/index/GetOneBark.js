const Users = require('../../models/User');
const Barks = require('../../models/Bark');

async function GetOneBark(req, res, next) {
    const id = req.params.id;

    const bark = await Barks.findById(id);
    if (!bark) {
        res.status(404).send(bark);
        return;
    }

    res.status(200).send(bark);
}

module.exports = GetOneBark;
