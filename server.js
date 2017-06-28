var express = require('express');
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(require('./controllers/index'));
app.use(express.static('client/build'));

app.listen(3001, function() {
  console.log("app is running on port ", this.address().port);
})