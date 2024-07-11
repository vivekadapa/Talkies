const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const dbConnect = require('./dbConnect')
const User = require('./models/userModel');
const Bookmark = require('./models/bookmarkModel')
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const auth = require('./auth');

const { authRouter, userRouter, tmdbRouter } = require('./routes/index')

const server = process.env.server;
dbConnect();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors({ credentials: true, origin: 'https://talkies-frontend.onrender.com' }));


app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/tmdb', tmdbRouter)


app.get('/', (req, res) => {
    res.json({
        message: "hello world"
    })
})


app.listen(server, () => {
    console.log(`Server is running at ${server}`);
})