const Barks = require('../../models/Bark');

async function GetBookmarkedBarks(req, res, next) {
    try {
        const user = req.user;
        const bookmarks = user.bookmarked.map((bookmark) => bookmark.id);
        const barks = await Barks.find({
            _id: { $in: bookmarks },
            deleted: false,
        });
        const bookmarkedBarks = user.bookmarked.map((bookmark) => {
            return {
                timestamp: bookmark.timestamp,
                bark: barks.filter((bark) => bark.id === bookmark.id)[0],
            };
        });
        return res.status(200).send(bookmarkedBarks);
    } catch (e) {
        console.log(e);
        return res.status(500).send('Whoops, something went wrong!');
    }
}

module.exports = GetBookmarkedBarks;
