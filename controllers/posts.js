const Post = require('../models/posts');

const singlePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId);
        const locals = {
            title: post.title,
        }
        res.render('post', { locals, post });
    } catch (error) {
        console.log(error);
    }
};

module.exports = { singlePost };