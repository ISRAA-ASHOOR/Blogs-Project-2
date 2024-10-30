const express = require('express');
const router = express.Router();
const imgur = require('imgur')
const fs = require('fs');
const path = require('path')

const User = require('../models/user.js');

router.get('/', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      res.render('blogs/index.ejs', {
        blogs : currentUser.blogs,
      });
    } catch (error) {
      console.log(error)
      res.redirect('/')
    }
});

router.get('/new', (req, res) => {
    res.render('blogs/new.ejs');
});

router.post('/', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
        req.body.date = new Date(req.body.date)
        currentUser.blogs.push(req.body);
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/blogs`);
      } catch (error) {
      console.log(error);
      res.redirect('/')
    }
});

router.get('/:blogsId', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      const blogs = currentUser.blogs.id(req.params.blogsId);
      res.render('blogs/show.ejs', {
        blogs: blogs,
      });
    } catch (error) {
      console.log(error);
      res.redirect('/')
    }
});

router.delete('/:blogsId', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      currentUser.blogs.id(req.params.blogsId).deleteOne();
      await currentUser.save();
      res.redirect(`/users/${currentUser._id}/blogs`);
    } catch (error) {
      console.log(error);
      res.redirect('/')
    }
});

router.get('/:blogsId/edit', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      const blogs = currentUser.blogs.id(req.params.blogsId);
      res.render('blogs/edit.ejs', {
        blogs: blogs,
      });
    } catch (error) {
      console.log(error);
      res.redirect('/')
    }
});

router.put('/:blogsId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const blogs = currentUser.blogs.id(req.params.blogsId);
    blogs.set(req.body);
    await currentUser.save();
    res.redirect(
      `/users/${currentUser._id}/blogs/${req.params.blogsId}`
    );
  } catch (error) {
    console.log(error);
    res.redirect('/')
  }
});

module.exports = router;