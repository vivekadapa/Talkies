const mongoose = require('mongoose');
const Bookmark = require('./bookmarkModel');


const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    genres: {
        type: [String],
        // required: true
    },
    bookmarks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Bookmark',
        },

    ]
})

UserSchema.pre('save', function (next) {
    const user = this;
    // Ensure bookmarks are unique within the user's list
    if (user.bookmarks && user.bookmarks.length > 0) {
        const uniqueBookmarks = [...new Set(user.bookmarks.map(b => b.toString()))];
        if (uniqueBookmarks.length !== user.bookmarks.length) {
            return next(new Error('Duplicate bookmarks are not allowed.'));
        }
    }
    next();
});


module.exports = mongoose.model("Users", UserSchema);