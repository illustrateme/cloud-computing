const router = require('express').Router();
const {addPost} = require('../controllers/posts.controller')

router.post('/newpost', (addPost));
