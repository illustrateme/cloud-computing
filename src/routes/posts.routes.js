const router = require('express').Router();
const {addPost, searchByTag, getAllUserPost, getAllPost} = require('../controllers/posts.controller')

router.get('/posts', (getAllPost))
router.post('/addpost', (addPost));
router.get('/search', (searchByTag))
router.get('/:username', (getAllUserPost))


module.exports = router;