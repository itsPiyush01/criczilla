// const { assert } = require('console');
var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var assert =require("assert");
const url = "mongodb://127.0.0.1:27017";



router.all("/",function (req,res) {
  let content="text content"
  res.render("index",{content:content,title:"Test Heading"})
})




module.exports = router;



