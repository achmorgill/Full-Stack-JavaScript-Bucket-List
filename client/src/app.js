var onLoad = function() {
  

  var url = 'https://restcountries.eu/rest/v2';
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.send();


  request.addEventListener('load', function() {
    var jsonString = request.responseText;
    console.log("jsonString",jsonString)
    var countries = JSON.parse(jsonString);
    console.log("all countries", countries)

    dropDownCountries(countries);
  })
}

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
    console.log("dropDownCountries", country, index)
    var option = document.createElement('option');
    option.value = index;
    option.text = country.name;
    dropDown.appendChild(option);
  })

}

window.addEventListener('load', onLoad);