const adminLadyout = '../views/layouts/admin';
const User = require('../models/admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

const admindashboard = async (req, res) => { 
    
    try {
        const locals = {
            title: 'Admin Dashboard',
        }    
        res.render('admin/index', { locals, layout: adminLadyout });
    }
    catch (error) {
        console.log(error);
    }

}

const login = async (req, res) => {
    
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }
        const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });
        res.redirect('/dashboard');
    }       
    catch (error) {
        console.log(error);
    }
}

const register = async (req, res) => {
    
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, password: hashedPassword });        
        res.status(201).json({ message: 'User registered successfully', user });
    }       
    catch (error) {
        if(error.code === 11000) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        res.status(500).json({ message: 'Internal server error' });
        console.log(error);
    }
}

module.exports = { admindashboard ,login, register };