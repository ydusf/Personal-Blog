const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// GET - HOME
router.get('/', async (req, res) => {
  const locals = {
    title: "Personal Blog",
    body: "Blog created using NodeJS, Express & MongoDB"
  }
    
  res.render('index', { locals })
})

module.exports = router;