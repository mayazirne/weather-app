let currentTime = new Date();

let h3 = document.querySelector("h3");
let hours = currentTime.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = currentTime.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

function searchCity(city) {
  let apiKey = "777f2ae51fd48d180efbcfe9388ca9cb";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function showTemperature (response) {
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#description").innerHTML = response.data.weather[0].main;
  document.querySelector("#main-icon").setAttribute("src",`icons/${response.data.weather[0].icon}.svg`);
  document.querySelector("#main-icon").setAttribute("alt",`${response.data.weather[0].description}`);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation (position) {
  let apiKey = "777f2ae51fd48d180efbcfe9388ca9cb"; 
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`; 
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation (event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation)
}

let currentDay = days[currentTime.getDay()];
h3.innerHTML = `last updated: ${currentDay} | ${hours}:${minutes}`;
  
let cityName = document.querySelector("#search-city");
cityName.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("New York");