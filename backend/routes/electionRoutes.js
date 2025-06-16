const express = require('express');
const router = express.Router();
const {
  createElection,
  cancelElection,
  rescheduleElection,
  getAllElections,
} = require('../controllers/electionController');

const { authenticateToken } = require('../middleware/auth');

router.post('/create', authenticateToken, createElection);
router.post('/cancel/:id', authenticateToken, cancelElection);
router.put('/reschedule/:id', authenticateToken, rescheduleElection);
router.get('/', authenticateToken, getAllElections);

module.exports = router;