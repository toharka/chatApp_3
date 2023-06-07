// routes/chat.js
const { getChat } = require('../controllers/chatController');

const express = require('express');
const router = express.Router();
const { createChat, createMessage, getChats } = require('../controllers/chatController');

router.post('/', createChat);
router.post('/:id/Messages', createMessage);
router.get('/', getChats); 
router.get('/:id', getChat);
module.exports = router;
