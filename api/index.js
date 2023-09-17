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

const server = process.env.server;
dbConnect();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));


app.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    try {
        const hashedPass = await bcrypt.hash(password, 10);
        const user = new User({
            email: email,
            password: hashedPass
        })
        try {
            await user.save()
            res.status(200).send({
                message: "User Created Successfully",
                user
            });
        } catch (error) {
            res.status(500).send({
                message: "Email already Exists"
            })
        }

    } catch (error) {
        res.status(500).send({
            message: "Password Not Hashed Properly"
        })
    }

})

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
        return (
            res.status(404).send({
                message: "email Not found",
            })
        )
    }
    const passCheck = await bcrypt.compare(password, user.password);
    if (!passCheck) {
        return (
            res.status(400).send({
                message: "Incorrect Password",
            })
        )
    }
    const token = jwt.sign({
        userId: user._id,
        userEmail: user.email
    },
        "RANDOM-TOKEN",
        { expiresIn: "24h" }
    )

    res.status(200).send({
        message: "login Successfull",
        email: user.email,
        token
    })
})



app.get("/getuser", auth, async (req, res) => {
    console.log(req.user);
    const user = await User.findOne({ _id: req.user.userId });
    res.json({ user, message: "You are authorized to access me" });
});


app.get("/getbookmarks", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);

        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        console.log(user);
        console.log(user.bookmarks);

        const bookmarksarr = [];

        for (let i = 0; i < user.bookmarks.length; i++) {
            let bookmar = await Bookmark.findById(user.bookmarks[i]);
            console.log(bookmar);
            bookmarksarr.push(bookmar);
        }
        console.log(bookmarksarr);
        res.json({ bookmarksarr });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


app.post('/addbookmark', auth, async (req, res) => {
    console.log(req.body);
    // console.log(req.user);
    try {
        //  const user = await User.findOne({ _id: req.user.userId });
        const newBookmark = new Bookmark({
            id: req.body.id,
            poster_path: req.body.poster_path,
            backdrop_path: req.body.backdrop_path,
            title: req.body.title,
        });

        await newBookmark.save();
        const user = await User.findByIdAndUpdate(
            req.user.userId,
            { $push: { bookmarks: newBookmark } },
            { new: true }
        );
        console.log(user);
        res.json(user);
    } catch (error) {
        console.error('Error adding bookmark:', error);
        res.status(500).json({ message: "Already added to bookmark", error: 'Internal Server Error' });
    }

})



app.listen(server, () => {
    console.log("Server is running at 4000");
})