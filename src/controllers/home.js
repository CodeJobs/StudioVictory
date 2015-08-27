var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  var visits = res.session('visits') || 0;

  res.session('visits', ++visits);

  res.render('home/welcome', {
    siteName: 'StudioVictory',
    visits: visits
  });
});

module.exports = router;
