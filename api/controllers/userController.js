const User = require('../models/userModel')
const Bookmark = require('../models/bookmarkModel')

exports.getUser = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user.userId });
        res.json({ user, success: true, message: "You are authorized to access me" });
    } catch (error) {
        res.status(500).json({
            message: error?.msg,
            success: false
        })
    }
}


exports.addGenre = async (req, res) => {
    const { userId } = req.user
    
    try {
        const user = await User.findByIdAndUpdate(userId, {
            genres: req.body
        }, { new: true })
        console.log(user)
        res.status(201).json({
            message: "Genres Updated",
            data: user
        })
    } catch (error) {
        res.status(500).json({
            message: error?.msg,
            success: false
        })
    }
}

exports.getBookmarks = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).populate('bookmarks');

        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        console.log("user: " + user);
        // console.log(user.bookmarks);

        // const bookmarksarr = [];

        // for (let i = 0; i < user.bookmarks.length; i++) {
        //     let bookmar = await Bookmark.findById(user.bookmarks[i]);
        //     console.log(bookmar);
        //     bookmarksarr.push(bookmar);
        // }
        console.log(user.bookmarks);
        res.json({ data: user.bookmarks });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}



exports.addBookmark = async (req, res) => {
    try {
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
}




exports.removeBookmark = async (req, res) => {
    const userId = req.user.userId; // Assuming the user ID is stored in req.user.userId
    const bookmarkId = req.params.id; // The ID of the bookmark to remove

    try {
        // Find the user by their ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Remove the bookmark ID from the user's bookmarks array
        user.bookmarks = user.bookmarks.filter(bookmark => bookmark.toString() !== bookmarkId);

        // Save the updated user document
        await user.save();

        return res.status(200).json({ user, message: "Bookmark removed successfully" });
    } catch (error) {
        return res.status(500).json({ message: "An error occurred", error: error.message });
    }
}