const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

const LOCALS = {
  title: "Personal Blog",
  description: "Blog created using NodeJS, Express & MongoDB"
}

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
    const locals = LOCALS;
      
    res.render('about', { locals });
  } catch (err) {
    console.log(err);
  }
});

// GET - CONTACT
router.get('/contact', async (req, res) => {
  try {
    const locals = LOCALS;
      
    res.render('contact', { locals });
  } catch (err) {
    console.log(err);
  }
});

// GET - POST - :id
router.get('/post/:id', async (req, res) => {
  try {
    const locals = LOCALS;

    let slug = req.params.id

    const data = await Post.findById({ _id: slug })
      
    res.render('post', { locals, data });
  } catch (err) {
    console.log(err);
  }
})

module.exports = router;