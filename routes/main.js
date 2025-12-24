const router = require('express').Router();
const { mainRouter, aboutRouter ,searchRouter } = require('../controllers/main');

router.get('/' , mainRouter);
router.get('/about' , aboutRouter);
router.post('/search' , searchRouter);
module.exports = router;