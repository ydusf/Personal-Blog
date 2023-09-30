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

    const posts = await Post.find();
      
    res.render('index', { locals, posts });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;