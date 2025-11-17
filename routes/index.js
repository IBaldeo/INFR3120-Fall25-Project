var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home Page' });
});

/* GET submit page. */
router.get('/submit', function(req, res, next) {
  res.render('index', { title: 'Submit Page' });
});

/* GET incidents page. */
router.get('/incidents', function(req, res, next) {
  res.render('index', { title: 'Incidents Page' });
});

/* GET contact us page. */
router.get('/contactus', function(req, res, next) {
  res.render('index', { title: 'Contact Us' });
});

module.exports = router;
