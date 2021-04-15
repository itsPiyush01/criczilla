var express = require('express');
var router = express.Router();
var path = require('path');
const fs = require('fs');
var rawData = fs.readFileSync(path.join(__dirname,"..","data", 'players.json'));
var players = JSON.parse(rawData);

/* GET live listing. */
router.get('/', function(req, res) {
/*
        /live
*/

  console.log(req.originalUrl);//  /live
  let content="live Page";
  let title="Live content Heading ";
  let pContent="HI"

  res.render("live",{content:content,title:title,searchedWord:"",pContent:pContent})
   
});

router.get('/hello', function(req, res) {
/*
    /live/hello
*/

    // res.(req.originalUrl);// /live/hello
    res.send("<h1>Hi /live/hello</h1>");
});

module.exports = router;
