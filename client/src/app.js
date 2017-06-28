var Countries = require('./models/countries.js')  

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