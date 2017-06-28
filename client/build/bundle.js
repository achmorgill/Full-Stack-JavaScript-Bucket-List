/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 146);
/******/ })
/************************************************************************/
/******/ ({

/***/ 146:
/***/ (function(module, exports, __webpack_require__) {

var Countries = __webpack_require__(255)  

var onLoad = function() {

  var countries = new Countries();

  countries.all(function(countriesData){
    renderCountries(countriesData);
  })

  var url = 'https://restcountries.eu/rest/v2';
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.send();


  request.addEventListener('load', function() {
    var jsonString = request.responseText;
    var countries = JSON.parse(jsonString);
    
    dropDownCountries(countries);

  })
}//onLoad

var renderCountries = function(countries){
  var ul = document.getElementById('bucket-list-countries');

  countries.forEach(function(country){
    var li = document.createElement('li');
    li.innerText = country.name;
    ul.appendChild(li);
  })
}

var dropDownCountries = function(countries) {
  var dropDown = document.getElementById('country-selector');

  countries.forEach(function(country, index) {

    var option = document.createElement('option');
    option.value = country.name;
    option.text = country.name;
    dropDown.appendChild(option);
  })

  dropDown.addEventListener('change', function(event){
    console.log("country selected", event.target.value);

    var countryToAdd = event.target.value;
    console.log("about to add: ", countryToAdd);
    addCountryToDatabase(countryToAdd);
  });

}
  var addCountryToDatabase = function(countryToAdd){
    var countries = new Countries();
    countries.add(countryToAdd, function(updatedCountries){
      renderCountries(updatedCountries);
    });
  }

window.addEventListener('load', onLoad);

/***/ }),

/***/ 255:
/***/ (function(module, exports, __webpack_require__) {

var Country = __webpack_require__(256);

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

/***/ }),

/***/ 256:
/***/ (function(module, exports) {

var Country = function(options){
  this.name = options.name;
}

Country.prototype = {

}

module.exports = Country;

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map