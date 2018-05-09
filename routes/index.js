var express = require('express');
var router = express.Router();




var fireAdmin = require('firebase-admin');

var fireConfig = require('../firebaseData.json');
  // Initialize Firebase
  var config = {
    credential: fireAdmin.credential.cert(fireConfig
    ),
    databaseURL: "https://kcoderguide.firebaseio.com",
    };
  fireAdmin.initializeApp(config);


  /* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { });
});


router.get('/articles', function(req, res, next) {
  res.render('articles', { });
});


router.get('/TESTER', function(req, res, next) {
  let urlCode=req.params.code;
  if (!(/^[a-zA-Z\-0-9]+$/.test(urlCode))) {
    res.render('invalidurl',{});
  }
  var q = fireAdmin.database().ref("TEST/testo");
  q.set({lol:"32x23"});
  res.render('index', {show_tags:true, tag_info:["TESTING"]});
  
  
});
router.get('/:code', function(req, res, next) {
    let urlCode=req.params.code;
    if (!(/^[a-zA-Z\-0-9]+$/.test(urlCode))) {
      res.render('invalidurl',{});
    }
    var q = fireAdmin.database().ref("articles/"+urlCode+"/tags");
    q.on("value",function(snapshot) {

    res.render('articles/'+urlCode, {show_tags:true, tag_info:snapshot.val()});
    });
    
  });
module.exports = router;
