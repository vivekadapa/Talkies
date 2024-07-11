const express = require('express')
const router = express.Router();
const { getUser, getBookmarks, addBookmark, removeBookmark } = require('../controllers/userController.js')
const auth = require('../auth.js')


router.get("/getuser", auth, getUser);
router.get('/getbookmarks', auth, getBookmarks)
router.post('/addbookmark', auth, addBookmark)
router.post('/removebookmark/:id',auth,removeBookmark)



module.exports = router
