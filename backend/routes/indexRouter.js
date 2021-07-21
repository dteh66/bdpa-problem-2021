const express = require('express');
var router = express.Router();

const tokenAuth = require('../middleware/tokenAuth');

// Import index routes
// const ExampleRoute = require('./index/ExampleRoute')
// router.method('<path>', ExampleRoute) -- Add tokenAuth middleware if not home page

module.exports = router;
