var Country = require('./country');

var Countries = function(){
  this.url = 'http://localhost:3001/api/countries';
}

Countries.prototype = {

  all: function(callback){
    this.makeRequest(this.url, function(bucketListCountries){
      callback(bucketListCountries);
    })
  },

  makeRequest: function(url, callback){
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.addEventListener('load', function(){
      if (request.status !== 200 ) return;

      var jsonString = request.responseText;
      var resultsData = JSON.parse(jsonString);
      callback(resultsData); 
    })
    request.send();
  },

  add: function(countryToAdd, callback){
    console.log("**** countries *** add", countryToAdd)
    var jsonString = JSON.stringify(countryToAdd);
    console.log( "****countries**. jsonString", jsonString)
    this.makePostRequest(this.url, callback, jsonString);
  },

  makePostRequest: function(url, callback, payload){
    console.log("makepostrequest payload",  payload, url)
    var request = new XMLHttpRequest();
    console.log("request", request)
    request.open('POST', url);
     request.setRequestHeader('Content-Type', 'application/json');

    request.addEventListener('load', function(){
      console.log(" ******addeventlistener")
      var jsonString = request.responseText;
      console.log('jsonString: ', jsonString);
      var updatedCountries = JSON.parse(jsonString);
      callback(updatedCountries);
    });
    request.send(payload);
  },
  add: function(countryToAdd, callback){
    console.log("**** countries *** add", countryToAdd)
    var jsonString = JSON.stringify(countryToAdd);
    console.log( "****countries**. jsonString", jsonString)
    this.makePostRequest(this.url, callback, jsonString);
  },

}

module.exports = Countries;