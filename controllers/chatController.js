const jwt = require('jsonwebtoken');
const userService = require('../services/user');
const chatService = require('../services/chat');
const Message = require('../models/message');
const Chat = require('../models/chat');

const createChat = async (req, res) => {
    const maxChatId = await chatService.getMaxChatId();

    // get the current user from the token
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, 'your_jwt_secret');
    const currentUser = await userService.getUserByUsername(decoded.username);

    if (!currentUser) {
        return res.status(400).send('Current user not found.');
    }

    // get the other user from the username in the request body
    const otherUser = await userService.getUserByUsername(req.body.username);

    if (!otherUser) {
        return res.status(400).send('Other user not found.');
    }

    const chat = new Chat({
        chatId: maxChatId + 1,
        users: [currentUser, otherUser], // current user and other user
        messages: []
    });

    try {
        await chat.save();
        res.status(201).json({
            id: chat.chatId,
            user: {
                username: otherUser.username,
                displayName: otherUser.displayName,
                profilePic: otherUser.profilePic
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to create chat.');
    }
};



const createMessage = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, 'your_jwt_secret');
    const user = await userService.getUserByUsername(decoded.username);

    if (!user) {
        return res.status(400).send('User not found.');
    }

    const { msg: content } = req.body;  // Use the msg property from the request body
    const maxMessageId = await chatService.getMaxMessageId();

    const message = new Message({
        messageId: maxMessageId + 1,
        created: new Date(),
        sender: user,  // save user details, not reference
        content: content,
        chatId: req.params.id
    });

    try {
        await message.save();
        const populatedMessage = await Message.findById(message._id).populate('sender');
        const updatedChat = await chatService.addMessageToChat(req.params.id, message);
        res.status(200).json({
            id: populatedMessage.messageId,
            created: populatedMessage.created,
            sender: {
                username: populatedMessage.sender.username,
                displayName: populatedMessage.sender.displayName,
                profilePic: populatedMessage.sender.profilePic
            },
            content: populatedMessage.content
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to add message to chat.');
    }
};



const getChats = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, 'your_jwt_secret');
    const currentUser = await userService.getUserByUsername(decoded.username);

    if (!currentUser) {
        return res.status(400).send('Current user not found.');
    }

    const chats = await chatService.getChatsByUsername(currentUser.username);

    const result = await Promise.all(chats.map(async (chat) => {
        const otherUser = chat.users.find(user => user.username.toString() !== currentUser.username.toString());

        if (!otherUser) {
            console.error('No other user found in chat:', chat);
            return null;
        }

        const lastMessage = chat.messages.sort((a, b) => b.created - a.created)[0];
        if (!lastMessage) {
            return null;
        }

        return {
            id: chat.chatId,
            user: {
                username: otherUser.username,
                displayName: otherUser.displayName,
                profilePic: otherUser.profilePic
            },
            lastMessage: {
                id: lastMessage.messageId,
                created: lastMessage.created,
                content: lastMessage.content
            }
        };
    }));

    const filteredResult = result.filter(chat => chat !== null); // Filter out chats with no lastMessage or other user

    res.status(200).json(filteredResult);
};




const getChat = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, 'your_jwt_secret');
    const currentUser = await userService.getUserByUsername(decoded.username);

    if (!currentUser) {
        return res.status(400).send('Current user not found.');
    }

    const chat = await chatService.getChatById(req.params.id);

    if (!chat) {
        return res.status(404).send('Chat not found.');
    }

    // Check if the current user is a member of the chat
    const isMember = chat.users.some(user => user._id.toString() === currentUser._id.toString());

    if (!isMember) {
        return res.status(401).send({
            type: 'https://tools.ietf.org/html/rfc7235#section-3.1',
            title: 'Unauthorized',
            status: 401,
            traceId: '00-381f606a917f31e9620513e22322d70f-5bbc2079bf999ea8-00'
        });
    }

    const users = chat.users.map(user => ({
        username: user.username,
        displayName: user.displayName,
        profilePic: user.profilePic
    }));

    const messages = await Promise.all(chat.messages.map(async message => {
        const sender = await userService.getUserById(message.sender);
        return {
            id: message.messageId,
            created: message.created,
            sender: {
                username: sender.username,
                displayName: sender.displayName,
                profilePic: sender.profilePic
            },
            content: message.content
        };
    }));

    res.status(200).json({
        id: chat.chatId,
        users,
        messages
    });
};


module.exports = { createChat, createMessage, getChats, getChat };

