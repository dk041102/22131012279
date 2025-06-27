const express = require('express');
const router = express.Router();
const {createShortUrl, redirectToOriginalUrl} = require('../controllers/urlController');
router.post('/shorturls', createShortUrl);
router.get('/:code' , redirectToOriginalUrl);
module.exports = router;