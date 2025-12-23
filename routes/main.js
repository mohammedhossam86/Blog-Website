const router = require('express').Router();
const { mainRouter } = require('../controllers/main');

router.get('/' , mainRouter);

module.exports = router;