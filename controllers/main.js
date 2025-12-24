const Post = require('../models/posts');
const mainRouter = async (req, res) => {
    try {
        const locals = {
            title: "Nodejs Blog"
        }
        let perPage = 10;
        let page = req.query.page || 1;

        const posts = await Post.aggregate([ { $sort: { createdAt: -1 } } ])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec();

        // Count is deprecated - please use countDocuments
        // const count = await Post.count();
        const count = await Post.countDocuments({});
        const nextPage = parseInt(page) + 1;
        const hasNextPage = nextPage <= Math.ceil(count / perPage);

        res.render('index', { 
        locals,
        posts,
        current: page,
        nextPage: hasNextPage ? nextPage : null,
        currentRoute: '/'
        });

    } catch (error) {
        console.log(error);
    }
};


const aboutRouter = async (req, res) => {
    const locals = {
            title: 'About Page',
        }
    res.render('about', { locals });
}

const searchRouter = async (req, res) => {
    try {
        const locals = {
            title: 'Search Page',
        }
        let searchTerm = req.body.searchTerm;
        const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "")

        const data = await Post.find({
            $or: [
                { title: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
                { body: { $regex: new RegExp(searchNoSpecialChar, 'i') } }
            ]
        });

        res.render("search", {
            data,
            locals,
            currentRoute: '/'
        });
    } catch (error) {
        console.log(error);
    }
}
module.exports = { mainRouter, aboutRouter, searchRouter };