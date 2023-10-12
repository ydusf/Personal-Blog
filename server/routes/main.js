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
    const locals = LOCALS;

    let limit = 10;
    let page = req.query.page || 1;

    const data = await Post.aggregate([ { $sort: { updatedAt: -1 } } ])
    .skip(limit * page - limit)
    .limit(limit)
    .exec();

    const count = await Post.count();
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / limit);
      
    res.render('index', { 
      locals, 
      data,
      current: page,
      nextPage: hasNextPage ? nextPage : null 
    });
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