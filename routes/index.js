// const { assert } = require('console');
var express = require('express');
var router = express.Router();
var path = require('path');
const fs = require('fs');

var MongoClient = require('mongodb').MongoClient;
var assert =require("assert");
const url = "mongodb://127.0.0.1:27017";

var rawData = fs.readFileSync(path.join(__dirname,"..","data", 'players.json'));
// var rawData = fs.readFileSync(path.join(__dirname,"..","data", 'sample_search_2.json'));
var players = JSON.parse(rawData);

router.all("/",function (req,res) {
  let content="text content"

  // console.log(players);
  res.render("index",{content:content,title:"Test Heading",players:players})
})


router.all("/live",function (req,res) {
  let content="Live Score HERE"
  // console.log(players);
  res.render("index",{content:content,title:"LIVE MATCH",players:players})
})

router.all("/buzz",function (req,res) {
  throw new Error('BROKEN');
  let content="BUZZ"
  // console.log(players);
  res.render("index",{content:content,title:"BUZZ",players:players})

})


router.all("/news",function (req,res) {
  let content="NEWS"
  // console.log(players);
  res.render("index",{content:content,title:"NEWS...",players:players})

})





module.exports = router;



