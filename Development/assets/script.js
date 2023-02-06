var apiKey = "e90ad556cc55926905eb32cc8f08f4f3";
var city;

// var geoCode = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + apiKey;

var savedSearches = [];

// var date
// var weatherIcon
var currentTemp = $("#temp");
var currentHumid = $("#humid");
var currentWSpeed = $("#wind");
var cityName = $("#cityname")

// how to get info from search bar
$("#search-form").on("submit", function(event) {
    event.preventDefault();

    city = $("#search-input").val();

    if (cityName === "" || cityName == null) {
        
        alert("Please enter name of city.");
        event.preventDefault();
    } else {
        
        getWeatherdata();
        fiveDayWeatherdata();
    }
})

// Function to get weather data from api after getting coords
function getWeatherdata() {
    var geoCode = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + apiKey;
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
    var queryURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;

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


function showWeatherdata(data) {
    
    var todayDate = dayjs();
    var weatherIcon = data.weather[0].icon;
    var weatherIconImg = $("<img>");
    weatherIconImg.attr("src", `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`);
    console.log(todayDate);
    var todayTemp = data.main.temp;
    var todayWind = data.wind.speed;
    var todayHumid = data.main.humidity;
    
    $("#date").text(todayDate.format('MMM D, YYYY'));
    
    currentTemp.text(todayTemp + " \u00B0F");
    currentWSpeed.text(todayWind + " MPH");
    currentHumid.text(todayHumid + "%");
    $("#cityname").text(city + ": ");
    $("#cityname").append(weatherIconImg);
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
            getFiveDayWeatherData();

        })
    });
}
fiveDayWeatherdata();

function getFiveDayWeatherData() {
    // Day + 1 Date Stuff
    
}