var express = require('express');
var router = express.Router();

const User = require('../modal/reg');

router.post('/register', async (req, res) => {
  try {
    console.log(req.body);
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.cookie('userId', savedUser._id, { httpOnly: true });
    res.json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/dashboard', function(req, res) {
  req.cookies.userId ? res.send('success') : res.redirect('/');
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
