const express = require('express');
var router = express.Router();

const basicAuth = require('../middleware/basicAuth');
const tokenAuth = require('../middleware/tokenAuth');

const GenerateToken = require('./auth/GenerateToken');
const DeleteToken = require('./auth/DeleteToken');
const CreateUser = require('./auth/CreateUser');
const RequestReset = require('./auth/RequestReset');
const ResetPassword = require('./auth/ResetPassword');

router.post('/create-user', CreateUser);
router.post('/generate-token', basicAuth, GenerateToken);
router.delete('/delete-token', tokenAuth, DeleteToken);
router.post('/reset-password', RequestReset);
router.patch('/reset-password/:resetRequest', ResetPassword);

module.exports = router;
