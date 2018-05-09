var express = require('express');
var router = express.Router();


var fireAdmin = require('firebase-admin');
  // Initialize Firebase
  var config = {
    credential: fireAdmin.credential.cert({
      "type": "service_account",
      "project_id": "kcoderguide",
      "private_key_id": "e9372bc0a2ee5be78ce0484f454dfb3463d4c7ad",
      "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEugIBADANBgkqhkiG9w0BAQEFAASCBKQwggSgAgEAAoIBAQC8eegg2orVsCb2\nIvn3FDB7UZsQCGvDYHrB0hRzQAknhjVHJFKwT973sHsQV8hDoSr9iWTpTdnSGLWp\niFpnXX9aRnXo3XjGkjT91j/D3w2KsQqpXjMSksAqGXceTrZvqtX5xv9eW30GzYWp\nkjx0dzLfY9MBJBZbJ5c/tJ8CzzvUnozprZjnXOJBk5prECQvfRUl8BVPniobnT+l\nLagfZPsp7lR50GTl1raOPlHtqNklh0aU0HOQ0SGfaWQ4r4oKyOAxxbazlvtKMUVI\nmYRDBc/fxXO833aHS/KEg0LHRkjAKP1MOknaThQtMRLoRiKyl+0SuaFJidSB2boi\nHIBO3+tPAgMBAAECgf9MMv0mSzTWL+GQoZNt0TvIn7WRRdZLpzX6JnUeI0WQNTJV\nENpdbe03NqKKePL+ZKp81o91w4PM7TCE2huyrppOZS5Gd0PdBD9oYLZm+kb/S5SD\n5RHA8JPAcYs3NZuMigT4dvvHqjViCrV/WSAX9hkbN8CXNX/UWq1LlDq1aBNIYh+O\njWTLau30BzFSQhQT5SLFtbWG5+IdRPWtGI0q46mo/f28HheaBA2Ho5ogS1Zv3M3K\n6jNzkJd2SvT/PNI91NFG3oKMeyiYkWGp7WmKEywr2iorhFXOn8Vd/gze41KjQxmd\nAwkXB6qLk9a0tm4Jiq76qQjzcxFHRxIY13nGnIECgYEA6zaqBHGWY+GmYBayUt+9\n6GDf5WMJJ8k38mESTUhclEwfIvU/tZeGqKe1Pz/74betADi3A23jv4GMLNpoSNXb\nDoCgoTM8srqaFiDg8U6y/5t9myQhSO7PgFERsql+gcgpbecofDA6jNLo2gqrgeP7\nOrR1Y42Y3a62hfKCwhd2+IECgYEAzSHiT5Uo4GT6eImqve4coxSYRZlwITCgeyjC\n/DKyQGfwNec7x3+DnT8ardk3kXJN7itTlFT5pNUvCiEyrhbe1SJ1/3GIxAqzrzNS\n+a8ZZol5uGMdZHI/p2a7+FbSbdyUnU6IKO3vB8j71To7ELrlHekqPDjjUIqN7z1r\nzgDHe88CgYA1gyQ/CpCKfMXbSo6baCfOfGuzxkpI8PB3hjohtvrJCmBzFZS+/ZA3\nQqBrmWT2v1DuofiRISkVYqW/dpkPKQhDTmQ9CGkgyG9R5X0HqT30BS4YY6nm693t\ndYQvP3x2jlFOna6KQnavnzQ2lwLZ9EIt4uxqD8bdeGgyJTA2dBwvAQKBgAOnGc+O\n+WZdhfRFh0vQhKQGxtteaxe8NO9cf3RcNr5c23MqRe88fwx6xi/YUVv+rBKUpO1c\nQgHEZg0JIEznTVqAPZep3uSWyDJTeKPHkW04/3jgEvLp8eY6Nxip+x9HsUHH1zbb\nXclGs+1NFyYqHdBViZH+9VVG0lYzQsstSmATAoGACLwxfhePDKtL5uWBbvPSpjr1\nm94PNpiYHLagCmKXzuziCnWxHDarGdWwCxP+eRWUkmTt+DPiTlWjpEQp3Lmt19BB\nZ/ku39E6LyFAibyuEpmM83fFAItbZiiVAni9dp4h5GbuIlh/mIvqvVY/zwO9YSkK\nCm/v1THp6d18htOUSfE=\n-----END PRIVATE KEY-----\n",
      "client_email": "firebase-adminsdk-sxxrx@kcoderguide.iam.gserviceaccount.com",
      "client_id": "111376821111107079801",
      "auth_uri": "https://accounts.google.com/o/oauth2/auth",
      "token_uri": "https://accounts.google.com/o/oauth2/token",
      "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
      "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-sxxrx%40kcoderguide.iam.gserviceaccount.com"
    }
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
  var q = fireAdmin.database().ref("TEST/"+urlCode+"/TEST");
  q.set({lol:"32x23"});
  res.render('articles/'+urlCode, {show_tags:true, tag_info:["TESTING"]});
  
  
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
