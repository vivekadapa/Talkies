const mongoose = require('mongoose');


const bookmarkScehma = mongoose.Schema({
    id:{
        type:Number,
    },
    poster_path: {
        type: String
    },
    backdrop_path: {
        type: String
    },
    title: {
        type: String
    },
})

module.exports = mongoose.model("Bookmark",bookmarkScehma);
