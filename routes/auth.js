const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/UserProfile');

router.get('/register', (req, res) => {
    res.render('register', {
        errors: [],
        name: '',
        email: '',
        password: '',
        password2: ''
    });
});

// get login page
router.get('/login', (req, res) => {
    res.render('login');
});
// return login info and checks validity
router.post('/register', async (req, res) => {
    const { name, email, password, password2 } = req.body;

    let errors = [];

    if (!name || !email || !password || !password2) {
        errors.push({ msg: 'Please fill in all fields' });
    }

    if (password !== password2) {
        errors.push({ msg: 'Passwords do not match' });
    }

    if (password.length < 6) {
        errors.push({ msg: 'Password must be at least 6 characters' });
    }

    if (errors.length > 0) {
        return res.render('register', { errors, name, email, password, password2 });
    }

    try {
        // Makes sure no duplicate user already exists
        const userFound = await User.findOne({ email });

        if (userFound) {
            errors.push({ msg: 'Email already registered' });
            return res.render('register', { errors, name, email, password, password2 });
        }

        // Create new user
        const newUser = new User({ name, email, password });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password, salt);

        await newUser.save();

        res.redirect('/login');
    } catch (err) {
        console.log(err);
        res.send("Error creating user");
    }
});

// Login authenticater
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login'
    })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/login');
    });
});

module.exports = router;