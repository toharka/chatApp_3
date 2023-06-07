//services/chat
const Chat = require('../models/chat');
const Message = require('../models/message');

const getMaxChatId = async () => {
    const chat = await Chat.findOne().sort('-chatId');
    return chat ? chat.chatId : 0;
};

const getMaxMessageId = async () => {
    const message = await Message.findOne().sort('-messageId');
    return message ? message.messageId : 0;
};


const addMessageToChat = async (chatId, message) => {
    const chat = await Chat.findOne({chatId});
    if (!chat) {
        throw new Error('Chat not found');
    }
    chat.messages.push(message._id); // Store the message id instead of the entire message
    await chat.save();
    return await Chat.findById(chat._id).populate('messages').populate('users');
};


module.exports = { getMaxChatId, addMessageToChat, getMaxMessageId };