const express = require('express');
const { getAllContent, getSpecificContent } = require('../controllers/content.controller');
const router = express.Router();

router.get('/getAllContent', getAllContent);

router.get('/getSpecificContent/:id', getSpecificContent);

module.exports = router;