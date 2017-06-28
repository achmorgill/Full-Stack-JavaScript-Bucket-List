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
    // var jsonString = JSON.stringify(countryToAdd);
    this.makePostRequest(this.url, callback, countryToAdd);
  },

  makePostRequest: function(url, callback, payload){
    var request = new XMLHttpRequest();
    request.open('POST', url);
    request.setRequestHeader('Content-Type', 'application/json');

    request.addEventListener('load', function(){
      var jsonString = request.responseText;
      console.log('jsonString: ', jsonString);
      var updatedCountries = JSON.parse(jsonString);
      callback(updatedCountries);
    });
    request.send(payload);
  }

}

module.exports = Countries;