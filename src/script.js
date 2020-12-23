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

function formatHours(timestamp) {
  let currentTime = new Date(timestamp);
  let hours = currentTime.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
}
  let minutes = currentTime.getMinutes();
  if (minutes < 10) {
  minutes = `0${minutes}`;
}
  return `${hours}:${minutes}`;
}

function displayForecast (response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 4; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += ` 
  <div class="col-3">
                <p> ${formatHours(forecast.dt * 1000)} <br />
                <img class="small-icon" alt="" src="icons/${forecast.weather[0].icon}.svg" /><br />
                <strong id="temperature" class="forecast-temp">${Math.round(forecast.main.temp)}°</strong></p>
            </div>
  `;
  }
}

function searchCity(city) {
  let apiKey = "777f2ae51fd48d180efbcfe9388ca9cb";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
  axios(apiUrl).then(displayForecast);
}

function showTemperature (response) {
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#description").innerHTML = response.data.weather[0].main;
  document.querySelector("#main-icon").setAttribute("src",`icons/${response.data.weather[0].icon}.svg`);
  document.querySelector("#main-icon").setAttribute("alt",`${response.data.weather[0].description}`);
  celciusTemperature = response.data.main.temp;
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
  let apiUrlForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`; 
  axios.get(apiUrlForecast).then(displayForecast);

}

function getCurrentLocation (event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function convertToFahreinheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
}

let celciusTemperature = null;

let currentDay = days[currentTime.getDay()];
h3.innerHTML = `${currentDay} | ${hours}:${minutes}`;
  
let cityName = document.querySelector("#search-city");
cityName.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahreinheit);
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

searchCity("London");