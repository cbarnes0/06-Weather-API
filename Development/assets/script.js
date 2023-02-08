var apiKey = "e90ad556cc55926905eb32cc8f08f4f3";
var dayjs = dayjs();
let city;
// Geocode used for later api links
var geoCode = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + apiKey;
var currentTemp = $("#temp");
var currentHumid = $("#humid");
var currentWSpeed = $("#wind");
var cityName = $("#cityname");

// Event listener for previous buttons to make them functional
$(".previousCities").on("click", "button", function() {

city = $(this).text();
getWeatherdata(city);
fiveDayWeatherdata(city);
});

// how to get info from search bar
$("#search-form").on("submit", function(event) {
    event.preventDefault();

    city = $("#search-input").val();

    if (cityName === "" || cityName == null) {
        
        alert("Please enter name of city.");
        event.preventDefault();
    } else {
        
        addButton();
        getWeatherdata();
        fiveDayWeatherdata();
        storeInfo();
    }
});
    
// sets the storage when it is empty to then be filled and doesn't clear it if it's working
// statement kept to check functionallity later
function clearStorageInit() {
    if (localStorage.getItem("cities") === null) {
        localStorage.setItem("cities", "[]")
       // console.log ("yay!");
    } else {
       // console.log("It's working!");
    };
        
};

// calls this function
 clearStorageInit();

 // add
function addButton() {

   let newBtn = $("<button>").text(city);
   newBtn.addClass(".newbtn");
   $(".previousCities").append(newBtn);
};

// Local Storage .. storing and checking information
function storeInfo() {
    
 let history = localStorage.getItem('cities');

 let jsArr = JSON.parse(history);

 jsArr.push(city);

 let JSONarr = JSON.stringify(jsArr);

 localStorage.setItem('cities', JSONarr);
};

// once info is stored, this is used to keep them as buttons once the page is refreshed
function getButtons() {
    let history = localStorage.getItem('cities');
    listOfPrevCit = JSON.parse(history);

    for (i = 0; i < listOfPrevCit.length; i ++) {
        let newBtn = $("<button>").text(listOfPrevCit[i]);
        newBtn.addClass("newBtn");
        $(".previousCities").append(newBtn);
    }
}

// calls function on refresh
getButtons();

// used to get initial weather data
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

// this function shows the data that was just recived and adds the values
function showWeatherdata(data) {

    var weatherIcon = data.weather[0].icon;
    var weatherIconImg = $("<img>");
    weatherIconImg.attr("src", `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`);
    var todayTemp = data.main.temp;
    var todayWind = data.wind.speed;
    var todayHumid = data.main.humidity;
    currentTemp.text(todayTemp + " \u00B0F");
    currentWSpeed.text(todayWind + " MPH");
    currentHumid.text(todayHumid + "%");
    $("#cityname").text(city + ": ");
    $("#cityname").append(weatherIconImg);
};

// this function does something similar to the previous but once it retrieves the data it adds the features dynamically
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
        
        // clears weather when called so that dynamic elements dont stack
           $(".weatherFuture").empty();

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
};