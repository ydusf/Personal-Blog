const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// GET - HOME
router.get('', async (req, res) => {
  try {
    const locals = {
      title: "Personal Blog",
      description: "Blog created using NodeJS, Express & MongoDB"
    }

    const data = await Post.find();
      
    res.render('index', { locals, data });
  } catch (err) {
    console.log(err);
  }
});

// GET - ABOUT
router.get('/about', async (req, res) => {
  try {
    const locals = {
      title: "Personal Blog",
      description: "Blog created using NodeJS, Express & MongoDB"
    }
      
    res.render('about', { locals });
  } catch (err) {
    console.log(err);
  }
});

// GET - CONTACT
router.get('/contact', async (req, res) => {
  try {
    const locals = {
      title: "Personal Blog",
      description: "Blog created using NodeJS, Express & MongoDB"
    }
      
    res.render('contact', { locals });
  } catch (err) {
    console.log(err);
  }
});

// POST - CREATE-POST


// GET - POST - ID
router.get('/post/:id', async (req, res) => {
  try {
    const locals = {
      title: "Personal Blog",
      description: "Blog created using NodeJS, Express & MongoDB"
    }

    let slug = req.params.id

    const data = await Post.findById({ _id: slug })
      
    res.render('post', { locals, data });
  } catch (err) {
    console.log(err);
  }
})

module.exports = router;