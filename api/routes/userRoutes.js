const express = require('express')
const router = express.Router();
const { getUser, getBookmarks, addBookmark, removeBookmark, addGenre } = require('../controllers/userController.js')
const auth = require('../auth.js')


router.get("/getuser", auth, getUser);
router.post("/addgenre", auth, addGenre)
router.get('/getbookmarks', auth, getBookmarks)
router.post('/addbookmark', auth, addBookmark)
router.post('/removebookmark/:id', auth, removeBookmark)



module.exports = router
