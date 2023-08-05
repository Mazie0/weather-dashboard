var weatherCol = document.querySelector(".col-right");
var searchCol = document.getElementById('saved-locations');
var savedCities = [];

// Load existing cities
loadCities()

// On clicking enter with search box submit form
const entry = document.getElementById('entry');
entry.addEventListener('keyup', function(event) {
    if (event.code === "Enter") {
        event.preventDefault();
        document.getElementById('form-sub').click();
    }
});

var btnClk = document.querySelector("#saved-locations");
    btnClk.addEventListener("click", function(e){
        var city = document.querySelector('[city-num="' + e.target.getAttribute("city-num") + '"]').innerHTML;
        var lat = "";
        var lon = "";
        for (var i = 0; i < savedCities.length; i++) {
            if (savedCities[i].city == city) {
                lat = savedCities[i].lat;
                lon = savedCities[i].lon;
            }
        }
        addCity(city,lat,lon);
    });

function loadCities() {
    savedCities = JSON.parse(localStorage.getItem("saved-cities"));
    if(savedCities) {
        searchCol.innerHTML = "";
        for (var i = 0; i < savedCities.length; i++) {
            var cityEl = document.createElement("button");
            cityEl.setAttribute("class", "city-btn");
            cityEl.setAttribute("city-num", i);
            cityEl.innerHTML = savedCities[i].city;
            searchCol.appendChild(cityEl);
        }
        if (weatherCol.childElementCount < 2) {
            populateWeather(savedCities[0].city,savedCities[0].lat,savedCities[0].lon)
        }
    }
}

function addCity(city,lat,lon) {
    if(savedCities) {
        for (var i = 0; i < savedCities.length; i++) {
            if (savedCities[i].city == city) {
                savedCities.splice(i, 1);
            }
        }
        if (savedCities.length >= 10) {
            savedCities.pop();
        }
        savedCities.unshift({"city": city, "lat": lat, "lon": lon});
    }
    else {
        savedCities = [{"city": city, "lat": lat, "lon": lon}]
    }
    localStorage.setItem("saved-cities", JSON.stringify(savedCities));
    loadCities();
    populateWeather(city,lat,lon);
}

function populateWeather(city,latitude,longitude) {
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude=minutely,hourly,alerts&units=imperial&appid=0363791b62fbc50307564f26f0822ead")
        .then(response => response.json())
        .then(function(data) {
            // Clear out old data
            weatherCol.innerHTML = "";

            // Populate current weather
            var currentWeather = document.createElement("div");
            currentWeather.setAttribute("id", "current-weather");
            var uvi_level = "";
            if (data.current.uvi < 3) {
                uvi_level = "safe";
            }
            else if (data.current.uvi < 8) {
                uvi_level = "moderate";
            }
            else {
                uvi_level = "danger";
            }
            currentWeather.innerHTML = 
                "<h2>" + 
                city + " (" + moment().format("L") + ") " + 
                '<img style="line-height: 100%;" src="https://openweathermap.org/img/wn/' + data.current.weather[0].icon + '@2x.png" width="50px" height="50px" alt="">' +
                "</h2>" +
                "<p>Temperature: " + data.current.temp + " °F</p>" +
                "<p>Humidity: " + data.current.humidity + "%</p>" +
                "<p>Wind Speed: " + data.current.wind_speed + " MPH</p>" +
                '<p>UV Index: <span class="' + uvi_level + '">' + data.current.uvi + "</span></p>";
            weatherCol.appendChild(currentWeather);

            // Populate 5 day forcast
            var forcastWeather = document.createElement("div");
            forcastWeather.setAttribute("class", "forcast-box");
            forcastWeather.innerHTML = '<h2>5 Day Forcast</h2><div id="forcast-weather"></div>';
            weatherCol.appendChild(forcastWeather);
            var flexEl = document.getElementById('forcast-weather');
            for (var day = 1; day < 6; day++) {
                var dayEl = document.createElement("div");
                dayEl.setAttribute("class", "daily");
                dayEl.innerHTML = 
                    "<h3>" + moment.unix(data.daily[day].dt).format("MM/DD/YYYY") + "</h3>" +
                    '<img src="https://openweathermap.org/img/wn/' + data.daily[day].weather[0].icon + '@2x.png" width="50px" height="50px" alt="">' +
                    "<p>Temp: " + data.daily[day].temp.max + " °F</p>" +
                    "<p>Humidity: " + data.daily[day].humidity + "%</p>";
                flexEl.appendChild(dayEl);
            }
        });
}

document.getElementById('form-sub').addEventListener('click', function() {
    if (entry.value) {

        // Google API example: https://developers.google.com/maps/documentation/javascript/examples/places-queryprediction
        var autocompleteService = new google.maps.places.AutocompleteService();
        autocompleteService.getPlacePredictions({
            input: entry.value,
            types: ['(cities)']
        },
        function(predictions, status) {
            console.log(status);
            placeName = predictions[0].description;

            // Google API example: https://developers.google.com/maps/documentation/geocoding/overview
            fetch("https://maps.googleapis.com/maps/api/geocode/json?&address=" + placeName + "&key=AIzaSyBt8py5NagvvwnvqX8xH78p6ZFSBeSBd-o")
                .then(response => response.json())
                .then(function(data) {
                    var latitude = data.results[0].geometry.location.lat;
                    var longitude = data.results[0].geometry.location.lng;
                    var city = data.results[0].address_components[0].long_name;
                    // Add city to storage
                    addCity(city,latitude,longitude);
                });
        })
        entry.value = "";
    }
})

// Autocomplete html search field.
// Google API example: https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete-addressform
function initAutocomplete() {
    // Create the autocomplete object, restricting the search predictions to
    // geographical location types.
    autocomplete = new google.maps.places.Autocomplete(
        document.getElementById("entry"),
        { types: ['(cities)'] }
    );
}