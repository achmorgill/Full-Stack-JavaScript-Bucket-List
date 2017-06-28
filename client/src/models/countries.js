var Country = require('./country');

var Countries = function(){}

Countries.prototype = {

  all: function(callback){
    this.makeRequest('http://localhost:3001/api/countries', function(bucketListCountries){
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
  }

}