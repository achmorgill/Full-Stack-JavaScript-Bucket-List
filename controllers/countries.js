//Our countries API!

var express = require('express')
var app = express();
var countriesRouter = express.Router();

//models
var Country = require('../client/src/models/country');
var CountryQuery = require('../db/country_query.js');

var query = new CountryQuery();

//country index 
countriesRouter.get('/', function(req, res) {
  query.all(function(countries) {
    console.log("countries.js")
    res.json(countries);
  })
}),

//write data to the database
countriesRouter.post('/', function(req, res) {
  var newCountry = new Country( {
    name: req.body.name
  }) 
console.log("adding new country", newCountry)
  query.add(newCountry, function(allCountries) {
    res.json(allCountries);
  })
})



module.exports = countriesRouter;