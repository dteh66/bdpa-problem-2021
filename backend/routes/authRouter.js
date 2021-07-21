const express = require('express');
var router = express.Router();

const basicAuth = require('../middleware/basicAuth');
const tokenAuth = require('../middleware/tokenAuth');

const GenerateToken = require('./auth/GenerateToken');
const DeleteToken = require('./auth/DeleteToken');
const CreateUser = require('./auth/CreateUser');

router.post('/create-user', CreateUser);
router.post('/generate-token', basicAuth, GenerateToken);
router.delete('/delete-token', tokenAuth, DeleteToken);

module.exports = router;
