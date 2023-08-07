const postContoller = require('../controller/posts');
const express = require('express');
const router = express.Router();

router.get('/', postContoller.getPosts);
router.get('/:id', postContoller.getPost);
router.post('/', postContoller.addPost )
router.delete('/:id', postContoller.deletePost)
router.put('/:id', postContoller.updatePost)

module.exports = router;