const express = require('express');
const app = express();
require('dotenv').config();
const dbConnect = require('./dbConnect')
const cors = require('cors');
const auth = require('./auth')

const { authRouter, userRouter, tmdbRouter } = require('./routes/index')

const server = process.env.server;
dbConnect();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors({ credentials: true, origin: process.env.CORS_ORIGIN }));


app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/tmdb', auth, tmdbRouter)


app.get('/', (req, res) => {
    res.json({
        message: "hello world"
    })
})


app.listen(server, () => {
    console.log(`Server is running at ${server}`);
})