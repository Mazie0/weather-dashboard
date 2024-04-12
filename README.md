# weather-dashboard
TITLE: CodTech IT Solutions Internship - Task Documentation: “Weather Forecast” Using CSS, HTML, JAVASCRIPT.
INTERN INFORMATION: 
Name: Sai Kumar Thota
ID: ICOD6501
INTRODUCTION
To provide users with an interface to search for the current weather conditions and forecast for a specific city.
Potentially store a list of previously searched locations for easy reference.
Technologies:
HTML: The foundation of the webpage's structure.
CSS: Used for styling the page's appearance (styles.css file).
JavaScript: For handling user input, fetching weather data, and dynamically updating the webpage (main.js file).
Font Awesome: Provides icons (e.g., the search icon).
Google Maps API: Potentially used to integrate a map display of the searched location (note the API key placeholder).
Moment.js: A library for formatting and working with dates and times.
File Structure:
index.html: The main HTML file containing the dashboard structure.
styles.css: The external stylesheet for defining the look and feel of the dashboard.
main.js: The JavaScript file responsible for the dashboard's logic and interaction with weather data.
HTML Breakdown:
Header:
Contains a simple <h1> title "Weather Dashboard."
Main Content (Row-based layout):
Left Column (col-left)
Search Bar: Input field (id="entry") and search button with Font Awesome icon.
Saved Locations: A section (id="saved-locations") to potentially display a list of previous searches.
Right Column (col-right)
Weather Display: This is where the fetched current weather and forecast data for the searched city would be displayed.

Dependencies:
Google Maps JavaScript API: Requires a valid API key.
Font Awesome: Loaded from a CDN.
Moment.js: Loaded from a CDN.
Functionality (Inferred from the code):
User Input: User enters a city name into the search bar.
Data Fetching: JavaScript (main.js) would likely use an API like OpenWeatherMap (https://openweathermap.org/) to fetch weather data based on the entered city.
Dynamic Updates: The right column would be populated with:
Current conditions (temperature, humidity, wind speed, etc.)
A multi-day forecast.
Search History: Potentially, save searched locations into the saved-locations section for quick access.

CONCLUSION:
In conclusion, the provided HTML code is for a web application called “Weather Dashboard”. This application allows users to search for weather information by city. It’s built with HTML, CSS, and JavaScript, and uses the Google Maps JavaScript API for location autocomplete and places library. The application’s functionality is primarily contained in the main.js file, which is linked in the HTML file. However, the actual implementation details of fetching and displaying weather data would depend on the code in this main.js file.








OUTPUT
 

 



