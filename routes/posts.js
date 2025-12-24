const router = require('express').Router();
const {singlePost} = require('../controllers/posts');

router.get('/:id', singlePost);

module.exports = router;
    