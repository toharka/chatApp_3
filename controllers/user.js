const jwt = require('jsonwebtoken'); 
const userService = require('../services/user');

const createUser = async (req, res) => {
    try {
        await userService.createUser(req.body);
        res.status(200).send();
    } catch (error) {
        console.error(error);
        res.status(500).send();
    }
};

const getUserDetails = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    try {
        jwt.verify(token, 'your_jwt_secret'); // Verify token first
        const user = await userService.getUserByUsername(req.params.username);
        if (!user) {
            return res.status(401).json({
                type: "https://tools.ietf.org/html/rfc7235#section-3.1",
                title: "Unauthorized",
                status: 401,
                traceId: "00-6976b401b61f601ac1c278c1557598a8-aa3a1c5609c9c51b-00"
            });
        }
        return res.status(200).json({
            username: user.username,
            displayName: user.displayName,
            profilePic: user.profilePic
        });
    } catch (err) {
        return res.status(401).json({
            type: "https://tools.ietf.org/html/rfc7235#section-3.1",
            title: "Unauthorized",
            status: 401,
            traceId: "00-6976b401b61f601ac1c278c1557598a8-aa3a1c5609c9c51b-00"
        });
    }
};

module.exports = { createUser, getUserDetails };
