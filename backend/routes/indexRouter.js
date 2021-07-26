const express = require('express');
var router = express.Router();

const tokenAuth = require('../middleware/tokenAuth');

const GetBarks = require('./index/GetBarks');

router.get('/', GetBarks);
// router.get('/:id', () => {});
// router.post('/create', tokenAuth, () => {});
// router.delete('/:id/delete', tokenAuth, () => {});

module.exports = router;
