// routes/chat.js

const express = require('express');
const router = express.Router();
const { createChat, createMessage } = require('../controllers/chatController');

router.post('/', createChat);
router.post('/:id/Messages', createMessage);

module.exports = router;
