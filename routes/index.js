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

router.get("/",function (req,res) {
  let content="text content"

  // console.log(players);
  let playersTodayBirthday=[];
  let searchLimit=players.length;//no limit

  
  var today = new Date();
  currentDate=today.getDate();
  currentMonth=today.getMonth()+1;
   for(let i=0;i<players.length && playersTodayBirthday.length<searchLimit ;i++)
    {
      if(players[i].date_of_birth && players[i].date_of_birth!="null" )
      {
            let date=new Date(players[i].date_of_birth);
            let playerBirthDate=date.getDate();
            let playerBirthMonth=date.getMonth()+1;
            if(playerBirthDate==currentDate && playerBirthMonth==currentMonth)
            {
              playersTodayBirthday.push(players[i]);
            }
      }   
    }
    // playersTodayBirthday

    function compare( a, b ) {
      if ( a.name < b.name ){
        return -1;
      }
      if ( a.name > b.name ){
        return 1;
      }
      return 0;
    }
    
    playersTodayBirthday.sort( compare );
    // console.log(playersTodayBirthday);

    // console.log(playersTodayBirthday.length);
    res.render("index",{players:playersTodayBirthday,searchedWord:""})
  
  // var searchQuery=
  // const username = req.body.username
  //...
  // res.end()
})

router.post("/",(req,res)=>{
  // res.
  // console.log(req.baseUrl);

  // console.log(req.body.);
  // res.send("hello")


})


router.post("/searchSuggestionQuery",function(req,res){
  let wordToMatch=req.body.wordToMatch;
  let searchObject=processMatchArray(wordToMatch,5);//wordToMatch,limit
  res.send(searchObject);
})

router.get("/search",function(req,res){
   
  // let wordToMatch=req.body.search__input;
  let wordToMatch=req.query.search__input;
  wordToMatch=wordToMatch.replace(/\s+/g, ' ').trim();

  var start = new Date()
  let limit=players.length;
  // let limit=100;
  
  // execution time for processMatchArray function
  let searchObject=processMatchArray(wordToMatch,limit);//wordToMatch,limit=first 100 players  
  let noOfResults=Object.keys(searchObject).length;
  // console.log(typeof searchObject);
  // searchObject
  var end = (new Date() - start)/1000;//to convert ms to s 
  // console.info('Execution time:%ds', (end/1000)) 
    // res.send("hello")
    var resultStats={
      noOfResults:noOfResults,
      time:end
    }

    // console.log(resultStats.noOfResults+" "+resultStats.time);
    

    res.render("searchPage",{players:searchObject,title:"Test Heading",searchedWord:wordToMatch,resultStats:resultStats})
 })



function processMatchArray(wordToMatch,searchLimit) {
   let matchArray=[];
  
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
  }
      return  matchArray;
}



// router.all("/live",function (req,res) {
//   var xhr = new XMLHttpRequest();
//   let content="Live Score HERE"
//   // console.log(players);
//   res.render("index",{content:content,title:"LIVE MATCH",searchedWord:""})
// })

// router.all("/buzz",function (req,res) {
//   throw new Error('BROKEN');
//   let content="BUZZ"
//   // console.log(players);
//   res.render("index",{content:content,title:"BUZZ",searchedWord:""})

// })


// router.all("/news",function (req,res) {
//   let content="NEWS"
//   // console.log(players);
//   res.render("index",{content:content,title:"NEWS...",searchedWord:""})

// })





module.exports = router;



