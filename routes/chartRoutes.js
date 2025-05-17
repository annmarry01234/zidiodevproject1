const express = require('express');
const router = express.Router();
const chartController = require('../controllers/chartController');

// Route to generate charts based on uploaded data
router.post('/generate', chartController.generateChart);

// Route to get chart history for a user
router.get('/history', chartController.getChartHistory);

module.exports = router;