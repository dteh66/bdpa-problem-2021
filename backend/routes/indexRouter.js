const express = require('express');
var router = express.Router();

const tokenAuth = require('../middleware/tokenAuth');

const GetBarks = require('./index/GetBarks');
const GetPackBarks = require('./index/GetPackBarks');
const GetBookmarkedBarks = require('./index/GetBookmarkedBarks');
const GetOneBark = require('./index/GetOneBark');
const CreateBark = require('./index/CreateBark');
const DeleteBark = require('./index/DeleteBark');

router.get('/', GetBarks);
router.get('/pack', tokenAuth, GetPackBarks);
router.get('/bookmarks', tokenAuth, GetBookmarkedBarks);
router.get('/:id', GetOneBark);
router.post('/create', tokenAuth, CreateBark);
router.delete('/:id/delete', tokenAuth, DeleteBark);

module.exports = router;
