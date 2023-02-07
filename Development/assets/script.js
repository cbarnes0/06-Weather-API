var apiKey = "e90ad556cc55926905eb32cc8f08f4f3";
var city;
var dayjs = dayjs();
var geoCode = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + apiKey;

var savedSearches = [];

var previousCityBox = $(".previousCities");

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
        localStoreage.setItem("cities", JSON.stringify(city));
        fiveDayWeatherdata();
    }
});

function renderSavedSearches() {
    for (var i = 0; i < savedSearches.length; i++) {
        var pastcity = savedSearches[i];

        var button = document.createElement("button");
        button.textContent = pastcity;
        li.setAttribute("data-index", i);

        previousCityBox.append(button);
    }
};
// init
function storedCityNames() {

    var storedCities = JSON.parse(localStorage.getItem("cities"));

    if (storedCities !== null) {
        savedSearches = storedCities;
    }

    renderSavedSearches();
};

storedCityNames();

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
    
   // var todayDate = dayjs();
    var weatherIcon = data.weather[0].icon;
    var weatherIconImg = $("<img>");
    weatherIconImg.attr("src", `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`);
    // console.log(todayDate);
    var todayTemp = data.main.temp;
    var todayWind = data.wind.speed;
    var todayHumid = data.main.humidity;
    
  //  $("#date").text(todayDate.format('MMM D, YYYY'));
    
    currentTemp.text(todayTemp + " \u00B0F");
    currentWSpeed.text(todayWind + " MPH");
    currentHumid.text(todayHumid + "%");
    $("#cityname").text(city + ": ");
    $("#cityname").append(weatherIconImg);
};


function fiveDayWeatherdata() {
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

        return { latitude, longitude };
    })
    .then(function({ latitude, longitude}) {
        var fiveDays = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;

        fetch(fiveDays, {
            method: 'GET',
        })

        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
           // getFiveDayWeatherData(data);

            for (var i = 1; i <= 5; i++) {

                var futureCard = document.createElement("div");
                futureCard.setAttribute("class", "weatherblock-details");
                $(".weatherFuture").append(futureCard);

                var futureDate = document.createElement("p");
                futureDate.textContent = dayjs.add(i, "d").format('MMM D, YYYY');
                futureCard.append(futureDate);

                var weatherIcon = data.list[i].weather[0].icon;
                var weatherIconImg = document.createElement("img");
                weatherIconImg.setAttribute("src", "https://openweathermap.org/img/wn/"+weatherIcon+"@2x.png");
                futureCard.append(weatherIconImg);
                
                var tempInfo = document.createElement("p");
                tempInfo.textContent ="Temp: " + data.list[i].main.temp + " \u00B0F";
                futureCard.append(tempInfo);

                var windInfo = document.createElement("p");
                windInfo.textContent ="Wind: " + data.list[i].wind.speed + " MPH";
                futureCard.append(windInfo);

                var humidInfo = document.createElement("p");
                humidInfo.textContent="Humidity: " + data.list[i].main.humidity + " %";
                futureCard.append(humidInfo);
            };
        })
    });
}
fiveDayWeatherdata();

// function getFiveDayWeatherData() {}
