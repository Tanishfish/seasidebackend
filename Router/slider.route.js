const express = require('express');
const { getAllSlider } = require('../controllers/slider.controller');
const router = express.Router();

router.get('/getAllSlider', getAllSlider);

module.exports = router;