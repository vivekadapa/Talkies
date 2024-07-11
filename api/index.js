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
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));


// app.post('/signup', async (req, res) => {

// })

// app.post('/login', async (req, res) => {

// })


app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/tmdb', tmdbRouter)


app.get('/', (req, res) => {
    res.json({
        message: "hello world"
    })
})


// app.get("/getbookmarks", auth, async (req, res) => {
//     try {
//         const user = await User.findById(req.user.userId);

//         if (!user) {
//             res.status(404).json({ error: 'User not found' });
//             return;
//         }
//         console.log(user);
//         console.log(user.bookmarks);

//         const bookmarksarr = [];

//         for (let i = 0; i < user.bookmarks.length; i++) {
//             let bookmar = await Bookmark.findById(user.bookmarks[i]);
//             console.log(bookmar);
//             bookmarksarr.push(bookmar);
//         }
//         console.log(bookmarksarr);
//         res.json({ bookmarksarr });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// })


// app.post('/addbookmark', auth, async (req, res) => {
//     console.log(req.body);
//     // console.log(req.user);
//     try {
//         const newBookmark = new Bookmark({
//             id: req.body.id,
//             poster_path: req.body.poster_path,
//             backdrop_path: req.body.backdrop_path,
//             title: req.body.title,
//         });

//         await newBookmark.save();
//         const user = await User.findByIdAndUpdate(
//             req.user.userId,
//             { $push: { bookmarks: newBookmark } },
//             { new: true }
//         );
//         console.log(user);
//         res.json(user);
//     } catch (error) {
//         console.error('Error adding bookmark:', error);
//         res.status(500).json({ message: "Already added to bookmark", error: 'Internal Server Error' });
//     }
// })






app.listen(server, () => {
    console.log(`Server is running at ${server}`);
})