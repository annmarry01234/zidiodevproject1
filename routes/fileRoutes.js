// fileRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const authenticate = require('../middleware/authenticate');
const {
  uploadAndParseExcel,
  getUserFileHistory
} = require('../controllers/fileController');

// Ensure uploads directory exists
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, `${Date.now()}${path.extname(file.originalname)}`)
});
const upload = multer({ storage });

// Upload Excel file (authenticated)
router.post('/upload', authenticate, upload.single('file'), uploadAndParseExcel);

// Fetch upload history (authenticated)
router.get('/history', authenticate, getUserFileHistory);

module.exports = router;
