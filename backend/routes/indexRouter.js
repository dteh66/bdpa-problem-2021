const express = require('express');
var router = express.Router();

const tokenAuth = require('../middleware/tokenAuth');

const GetBarks = require('./index/GetBarks');
const GetOneBark = require('./index/GetOneBark');
const CreateBark = require('./index/CreateBark');
const DeleteBark = require('./index/DeleteBark');

router.get('/', (req, res, next) => {
    res.status(404).send();
});
router.get('/:id', GetOneBark);
router.post('/create', tokenAuth, CreateBark);
router.delete('/:id/delete', tokenAuth, DeleteBark);

module.exports = router;
