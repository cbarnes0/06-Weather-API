var apiKey = "e90ad556cc55926905eb32cc8f08f4f3";
var city = "Atlanta";

var geoCode = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + apiKey;

var savedSearches = [];

// var date
// var weatherIcon
var currentTemp = $("#temp");
var currentHumid = $("#humid");
var currentWSpeed = $("#wind");
var cityName = $("#cityname")

// how to get info from search bar


// Function to get weather data from api after getting coords
function getWeatherdata() {
fetch(geoCode, {
    method: 'GET',
})
.then(function(response) {
    return response.json();
  })
  .then(function(data) {
    
    latitude = data[0].lat;
    longitude = data[0].lon;
    
    return latitude, longitude;
  })
  .then(function() {
    var queryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;

    fetch(queryURL, {
        method: 'GET',
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        showWeatherdata(data);
    })
  });
};
  getWeatherdata();

function showWeatherdata(data) {
    var todayDate = data.list[0].dt_txt.slice(0, 10);
    
    var weatherIcon = data.list[0].weather[0].icon;
    var weatherIconImg = $("<img>");
    weatherIconImg.attr("src", `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`);
    console.log(todayDate);
    var todayTemp = data.list[0].main.temp;
    var todayWind = data.list[0].wind.speed;
    var todayHumid = data.list[0].main.humidity;

    cityName.append(todayDate);
    cityName.append(weatherIconImg);

    currentTemp.text(todayTemp + " \u00B0F");
    currentWSpeed.text(todayWind + " MPH");
    currentHumid.text(todayHumid + "%");
};


function fiveDayWeatherdata() {
    fetch(geoCode, {
        method: 'GET',
    })

    .then(function(response) {
        return response.json();
    })
    .then(function(data) {

        latitude = data[0].lat;
        longitude = data[0].lon;

        return { latitude, longitude };
    })
    .then(function({ latitude, longitude}) {
        var fiveDays = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

        fetch(fiveDays, {
            method: 'GET',
        })

        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            console.log(response);


        })
    });
}
fiveDayWeatherdata();