// const { assert } = require('console');
var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var assert =require("assert");
const url = "mongodb://127.0.0.1:27017";

// async function main(){
//   const client = new MongoClient(uri,{ useUnifiedTopology: true});
//   try {
//       // Connect to the MongoDB cluster
//       await client.connect();
     
//       // Make the appropriate DB calls

//       await  router.listDatabases(client);
//       // await list(client);
//   } catch (e) {
//       console.error(e);
//   } finally {
//       await client.close();
//   }
// }

// main().catch(console.error);





// router.all("/").get("/",(req,res,next)=>{

// })

/* GET home page. */
router.all('/', function(req, res, next) {
  var resultArray=[];
  
  var url = "mongodb://localhost:27017/iccDB";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  db.collection("Search").find({}, function(err, result) {
    if (err) throw err;
    // console.log(result.Country);
    result.forEach(  (r)=>{
      resultArray.push(r);
      // console.log(r.NAME);
    },  
    
    function ()
    {
      db.close();
      res.render("all",{item:resultArray})
    })
;''  });
});
    


router.all("/all",(req,res)=>{
    res.send("<h1>HELLO</h1>")
})
})
  

module.exports = router;



