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
  res.render("index",{content:content,title:"Test Heading"})
})

router.all("/searchSuggestionQuery",function(req,res){
  let wordToMatch=req.body.wordToMatch;
  console.log(wordToMatch);
  let matchArray=[];
  let searchLimit=5;
    if(undefined=!wordToMatch || wordToMatch!="")
    {
        const regex= new RegExp(wordToMatch,'gi');
        for(let i=0;i<players.length && matchArray.length<searchLimit ;i++)
        {
            let playerFullName=players[i].full_name;
            let playerName=players[i].name;
            if(playerFullName==null)playerFullName="";
            if(playerName==null)playerName="";
            
            if(matchArray.length<searchLimit && 
            (playerFullName.match(regex) || 
            playerName.match(regex)))
            {matchArray.push(players[i])};      
          }
      res.send(matchArray)
    }
    else{
      res.send([])
    }
  }
)





router.all("/live",function (req,res) {
  var xhr = new XMLHttpRequest();
  let content="Live Score HERE"
  // console.log(players);
  res.render("index",{content:content,title:"LIVE MATCH"})
})

router.all("/buzz",function (req,res) {
  throw new Error('BROKEN');
  let content="BUZZ"
  // console.log(players);
  res.render("index",{content:content,title:"BUZZ"})

})


router.all("/news",function (req,res) {
  let content="NEWS"
  // console.log(players);
  res.render("index",{content:content,title:"NEWS..."})

})





module.exports = router;



