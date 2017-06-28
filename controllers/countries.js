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
})


module.exports = countriesRouter;