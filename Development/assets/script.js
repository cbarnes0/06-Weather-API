var apiKey = "e90ad556cc55926905eb32cc8f08f4f3";
var dayjs = dayjs();
let city;
var geoCode = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + apiKey;

var savedSearches = [];

var previousCityBox = document.querySelector(".previousCities")
previousCityBox.addEventListener("click", function() {
    var buttontext = $(".newbtn").text();
    city = buttontext
    
    console.log(city);
    // getWeatherdata();
    // fiveDayWeatherdata();
});

var currentTemp = $("#temp");
var currentHumid = $("#humid");
var currentWSpeed = $("#wind");
var cityName = $("#cityname")

function prevCityWeather() {
    
};

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
        storeInfo(city);
    }
});
    
   // Initialize our Dataset (KEY)
  // localStorage.setItem("cities", "[]")

function addButton() {

   let newBtn = $("<button>").text(city);
   newBtn.addClass(".newbtn");
   $(".previousCities").append(newBtn);
};

function storeInfo(city) {
    // LOCAL STORAGE //
     // Add the New City to Local Storage
 // 1) Is there existing data? 
 let history = localStorage.getItem('cities');
//  console.log("History: ", history);
//  console.log("History Type: ", typeof history);
 
 // 2) Convert the STRING DATA to an JS OBJECT
 let jsArr = JSON.parse(history);
//  console.log("Object: ", jsArr);
//  console.log("Object Type: ", typeof jsArr);

 // 3) Add our NEW DATA
 jsArr.push(city);

 // -- TESTING / VERIFY -- //
 // console.log(jsArr);
 
 // 4) CONVERT js tp JSON
 let JSONarr = JSON.stringify(jsArr);
 // console.log(JSONarr);

 // 5) UPDATE / SAVE to local Storage
 localStorage.setItem('cities', JSONarr);
}

function getButtons() {
    let history = localStorage.getItem('cities');
    listOfPrevCit = JSON.parse(history);
    console.log(listOfPrevCit);

    for (i = 0; i < listOfPrevCit.length; i ++) {
        let newBtn = $("<button>").text(listOfPrevCit[i]);
        $(".previousCities").append(newBtn);
    }
}

getButtons();

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

           $(".weatherFuture").empty();
          //  $(".weatherFuture").remove();

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

// -- NOTES -- //


    // -- OPERATIONS on Dynmaic Content -- // 
    // WE create a Button 
        // button content to have CITY NAME
        // event listener
        
    // ADD the new Button (append to our container) -- DRY -- 


/*
    // use Local Storage (order of operations)

    localStorage.getItem('key')
    localStorage.setItem('key', "{ "name": "Bill", "age": "23"}")
    localStorage.clear()

    let arr = []
    arr.push(2);

    // Parsing Methods
    JSON.parse()   // convert JSON into JS object
    JSON.stringify(arr)  // convert JS into JSON

 {
    "key": "value"
 }

 {
    Key: 37
 }
*/ 

