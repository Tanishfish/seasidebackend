const express = require('express');
const { getformdata, formdata } = require('../controllers/form.controller');
// const multer = require('multer');
const path = require('path');

const router = express.Router();




// Configure multer storage
// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, './uploads');
//   },
//   filename: (req, file, callback) => {
//     const ext = path.extname(file.originalname);
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random());
//     callback(null, file.fieldname + '-' + uniqueSuffix + ext);
//   },
// });

// Create a multer instance with the configured storage
// const upload = multer({ storage: storage });

router.get('/getformdata', getformdata);
router.post('/formdata', formdata);

// Use upload.fields([{ name: 'photo', maxCount: 1 }, { name: 'photo2', maxCount: 1 }, { name: 'photo3', maxCount: 1 }]) to handle file uploads for multiple photo fields
// router.post('/formdata', upload.fields([
//   { name: 'photo', maxCount: 1 },
//   { name: 'photo2', maxCount: 1 },
//   { name: 'photo3', maxCount: 1 }
// ]), formdata);

module.exports = router;
