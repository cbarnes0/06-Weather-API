var apiKey = "e90ad556cc55926905eb32cc8f08f4f3";
var city = "Atlanta";
var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;

var geoCode = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + apiKey;

var data = fetch(geoCode);

console.log(data);