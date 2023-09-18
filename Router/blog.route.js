const express = require('express');
const { getAllBlog } = require('../controllers/blog.controller');
const router = express.Router();

router.get('/getAllBlog', getAllBlog);

module.exports = router;