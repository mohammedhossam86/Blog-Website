const Post = require('../models/posts');
const adminLadyout = '../views/layouts/admin';

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

const singlePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId);
        const locals = {
            title: post.title,
        }
        res.render('posts', { locals, post });
    } catch (error) {
        console.log(error);
    }
};

const getaddPostRouter = async (req, res) => {
    try {
        const locals = {
            title: 'Add Post',
            layout: adminLayout
        };
        res.render('admin/add-post', { locals, layout: adminLadyout  });
    } catch (error) {
        console.log(error);
    }
}

const addPostRouter = async (req, res) => {
    try {
        const locals = {
            title: 'Add Post'
        };
        const { title, body } = req.body;
        await Post.create({ title, body });
        res.redirect('/dashboard');
    } catch (error) {
        console.log(error);
    }
}

const dashboard = async (req, res) => { 
    try {
    const locals = {
        title: 'Dashboard'
    };
    const posts = await Post.find({}).sort({ updatedAt: -1 });
    res.render('admin/dashboard', { locals, posts, layout: adminLadyout });

  } catch (error) {
    console.log(error);
  }
}

const geteditPostRouter = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId);
        res.render('admin/edit-post', { post , layout: adminLadyout});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const editPostRouter = async (req, res) => {
    try {

        await Post.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        body: req.body.body,
        updatedAt: Date.now()
        });

        res.redirect('/dashboard');

  } catch (error) {
        console.log(error);
  } 

};

const deletePostRouter = async (req, res) => {
    try {
        await Post.deleteOne({ _id: req.params.id });
        res.redirect('/dashboard');
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const logout = (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
};

module.exports = {
    mainRouter,
    aboutRouter,
    searchRouter,
    singlePost,
    dashboard,
    editPostRouter,
    deletePostRouter,
    geteditPostRouter,
    getaddPostRouter,
    addPostRouter,
    logout
};