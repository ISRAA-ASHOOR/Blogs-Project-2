const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.render('users/index.ejs', { 
            users : users,
        } );
    } catch (err) {
        console.log(error);
        res.redirect('/')
    }
});

router.get('/:userId', async (req, res) => {
    try {
        const users = await User.findById(req.params.userId);
        res.render('users/show.ejs', { 
            users : users, 
        });
    } catch (err) {
        console.log(error);
        res.redirect('/')
    }
});

router.get('/:userId/blog/:blogsId', async (req, res) => {
    try {
        const users = await User.findById(req.params.userId);
        const blogs = users.blogs.id(req.params.blogsId);
        res.render('users/blog.ejs', { 
            users: users, 
            blogs: blogs,
        });
    } catch (err) {
        console.log(error);
        res.redirect('/')
    }
});



module.exports = router;