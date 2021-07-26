const Barks = require('../../models/Bark');

async function DeleteBark(req, res, next) {
    console.log('hello');
    const user = req.user;
    const bark = await Barks.findById(req.params.id);
    if (!bark) {
        res.status(404).send('Bark not found.');
        return;
    }
    if (user.username !== bark.author) {
        res.status(403).send('You are not authorized to delete that bark.');
        return;
    }

    await Barks.findByIdAndUpdate(req.params.id, { deleted: true });
    res.status(200).send();
}

module.exports = DeleteBark;
