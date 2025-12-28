const router = require('express').Router();
const {
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
} = require('../controllers/main');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/' , mainRouter);
router.get('/about' , aboutRouter);
router.get('/posts/:id', singlePost);
router.get('/dashboard', authMiddleware, dashboard);
router.get('/add-post', authMiddleware, getaddPostRouter);
router.post('/search', searchRouter);
router.post('/add-post', authMiddleware, addPostRouter);
router.post('/delete-post/:id', authMiddleware, deletePostRouter);
router.get('/edit-post/:id', authMiddleware, geteditPostRouter);
router.post('/edit-post/:id', authMiddleware, editPostRouter);
router.get('/logout', authMiddleware, logout); 
module.exports = router;