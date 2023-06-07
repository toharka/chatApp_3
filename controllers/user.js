//controller/user.js
const userService = require('../services/user');

const createUser = async (req, res) => {
    try {
        await userService.createUser(req.body);
        res.status(200).send();
    } catch (error) {
        // handle the error as needed
        console.error(error);
        res.status(500).send();
    }
};

module.exports = { createUser };
