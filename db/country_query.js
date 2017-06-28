var MongoClient = require('mongodb').MongoClient;

var CountryQuery = function(){
  this.url = 'mongodb://localhost:27017/bucket_list';
}

CountryQuery.prototype = {

  all: function(callback){

    MongoClient.connect(this.url, function(err, db){
      if (db){
        console.log("connected to bucket_list db");
        var collection = db.collection('countries');
        collection.find().toArray(function(err, docs){
          if (docs){
            callback(docs);
          }
        });
      }
    });
  }, //all

  add: function(countryToAdd, callback){

    MongoClient.connect(this.url, function(err, db){
      if (db){
        console.log("connected to bucket_list: add");
        var collection  = db.collection('countries');
        collection.insert(countryToAdd);
        collection.find().toArray(function(err, docs){
          if (docs){
            callback(docs);
          }
        });
      }

    });

  }//add
}

module.exports = CountryQuery;