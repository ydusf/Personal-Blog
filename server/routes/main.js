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

// GET - CREATE-POST
router.get('/create-post', async (req, res) => {
  try {
    const locals = LOCALS;

    res.render('create-post', { locals });
  } catch (err) {
    console.log(err);
  }
});

// POST - CREATE-POST
router.post('/create-post', async (req, res) => {
  try {
    await Post.create({ title: req.body.title, body: req.body.body })

    res.redirect('/');
  } catch (err) {
    console.log(err);
  }
})

// GET - EDIT POST - :id
router.get('/edit-post/:id', async (req, res) => {
  try {
    const locals = LOCALS;

    let slug = req.params.id

    const post = await Post.findOne({ _id: slug});

    res.render('edit-post', { locals, post });
  } catch (err) {
    console.log(err);
  }
});

// PUT - EDIT POST - :id
router.put('/edit-post/:id', async (req, res) => {
  try {
    let slug = req.params.id

    await Post.findByIdAndUpdate(slug, {
      title: req.body.title,
      body: req.body.body,
      updatedAt: new Date.now()
    });

    res.redirect('/');
  } catch (err) {
    console.log(err);
  }
});

// DELETE - DELETE POST - :id
router.delete('/delete-post/:id', async (req, res) => {
  try {
    let slug = req.params.id

    await Post.deleteOne( { _id: slug } );

    res.redirect('/');
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