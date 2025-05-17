const express = require('express');
const router = express.Router();

// POST /api/save-user-data
router.post('/save-user-data', (req, res) => {
  const { userId, userData } = req.body;

  if (!userId || !userData) {
    return res.status(400).json({ message: 'Missing userId or userData' });
  }

  console.log(`✅ Received user data for ${userId}:`, userData);

  res.status(200).json({ message: 'User data received' });
});

module.exports = router;
