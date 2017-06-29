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
    console.log("makerequest", request)
    request.open('GET', url);
    request.addEventListener('load', function(){
      if (request.status !== 200 ) return;

      var jsonString = request.responseText;
      var resultsData = JSON.parse(jsonString);
      callback(resultsData); 
    })
    request.send();
  },
  

  makePostRequest: function(url, callback, payload){
    var request = new XMLHttpRequest();
    console.log("request", request)
    request.open('POST', url);
     request.setRequestHeader('Content-Type', 'application/json');

    request.addEventListener('load', function(){
      console.log(" ******addeventlistener")
      var jsonString = request.responseText;
      console.log('jsonString: ');
      var updatedCountries = JSON.parse(jsonString);
      console.log('JSON parse', updatedCountries)
      callback(updatedCountries);
    });
    request.send(payload);
  },

  add: function(country, callback){
      countryObject = { name: country };
      console.log("country to add: ", countryObject)
      var jsonString = JSON.stringify(countryObject);
      console.log("jsonString made from country: ", jsonString)
      this.makePostRequest(this.url, callback, jsonString);
    },

}

module.exports = Countries;