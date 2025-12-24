const router = require('express').Router();
const { mainRouter, aboutrouter } = require('../controllers/main');

router.get('/' , mainRouter);
router.get('/about' , aboutrouter);
module.exports = router;