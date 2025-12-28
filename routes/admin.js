const router = require('express').Router();
const { admindashboard ,login, register} = require('../controllers/admin');
router.get('/' , admindashboard);
router.post('/' , login);
router.post('/register' , register);

module.exports = router;