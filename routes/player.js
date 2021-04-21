var express = require('express');
var router = express.Router();
require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var assert =require("assert");
let uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.bgj4n.mongodb.net/test?authSource=admin&replicaSet=atlas-ewd88h-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true`;
const url = "mongodb://127.0.0.1:27017";
var errorHandler = require('errorhandler');

router.get("/:id",async(req,res) => {
 
    let _id=req.params.id;        
    let result=await findOne(_id);
    if(result)
    {
        //  result = Object.keys(result).map(function (key) { return result[key]; });
        // console.log(result);
        try {
            //... prepare context
            // return res.render('template.ejs', context);
            // return next(new MyCustomError('template failed:' + e.message));
                res.render("player",{searchedWord:"",player:result})

          }
          catch(e)
          {
              res.render("<h1>OPS...</h1>")
            // here you can analyze the cause of error and pass useful info to
            // error handler
          }
        res.render("player",{searchedWord:"",player:result})
    }
    else{
        // res.send("error")
        res.status(404).send("<h1>NOT FOUND</h1><p>Something Went Wrong :(</p>");
        // res.err(404);
        // next(err) // Pass errors to Express.
   
    }
})


async function findOne(_id) {

    const client = await MongoClient.connect(uri, { useNewUrlParser: true })
        .catch(err => { console.log(err); });

    if (!client) {
        return;
    }

    let result;
    try {

        const db = client.db("criczilla");

        let collection = db.collection('players');
         _id = new ObjectId(_id);
        let query = { _id: _id}

        result = await collection.findOne(query);
        // console.log(result);
    } catch (err) {
        console.log(err);
     
    } finally {
        client.close();
    }
    
    // console.log(result);
    
    return result;
    
}



module.exports = router 