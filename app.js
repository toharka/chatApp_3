//app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoute = require('./routes/user');
const tokenRoute = require('./routes/token');
const chatRoute = require('./routes/chat');
const customEnv = require('custom-env');
const { validateToken } = require('./middlewares/auth'); // Add this line

customEnv.env(process.env.NODE_ENV, './config');

console.log(process.env.CONNECTION_STRING);
console.log(process.env.PORT);

mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const app = express();

app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Routes that don't require token validation
app.use('/api/users', userRoute);
app.use('/api/tokens', tokenRoute);

// Apply the validateToken middleware for all the following routes
app.use(validateToken);

// Routes that require token validation
app.use('/api/chats', chatRoute);

app.listen(process.env.PORT);
