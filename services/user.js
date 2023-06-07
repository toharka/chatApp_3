//services/user
const User = require('../models/user');

const createUser = async ({ username, password, displayName, profilePic }) => {
    const user = new User({ username, password, displayName, profilePic });
    return await user.save();
};

const validateUser = async (username, password) => {
    const user = await User.findOne({ username, password });
    return user;
};

const getUserById = async (id) => {
    return await User.findById(id);
};

const getUserByUsername = async (username) => {
    const user = await User.findOne({ username });
    return user;
};

module.exports = { createUser, validateUser, getUserById, getUserByUsername };
