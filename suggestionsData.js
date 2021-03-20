/*
var MongoClient = require('mongodb').MongoClient;
var url="mongodb://localhost:27017/criczilla";

async  function getSuggestionData() {

    return new Promise ((resolve,reject)=>{
        let suggestionData=[];
        MongoClient.connect(url,function (err,db) {
            // console.log("calling databse");
            if(err) throw reject("something went wrong unable to fetch suggestions data");
            // if(err) reject(new Error("something went wrong unable to fetch suggestions data"));
            var count=1;
            db.collection("players").find({},function (err,players) {
                if(err) throw reject(new Error("something went wrong unable to fetch suggestions data"));
 
                players.forEach(player => {
                    let playerData={
                        "name": player.name,
                        "_id": player._id,
                        "full_name": player.full_name,
                        "date_of_birth": player.date_of_birth,
                        "country": player.country,
                        "photo": player.photo
                    }
                        suggestionData.push(playerData);
                    },
                    function ()
                    {                    
                        db.close();
                        console.log(suggestionData.length);
                        console.log(suggestionData.length);
                        if(suggestionData.length>0) resolve(suggestionData);
                        else reject(new Error("something went wrong unable to fetch suggestions data"));
                    })
            })
        })
    })
}

module.exports = getSuggestionData;

*/