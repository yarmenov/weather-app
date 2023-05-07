let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();
let h2 = document.querySelector("h2");
if (minutes < 10) {
  minutes = `0${minutes}`;
}
if (hours < 10) {
  hours = `0${hours}`;
}
h2.innerHTML = `${day} ${hours}:${minutes}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = ``;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="row">
      <div class="col-4 monday">${formatDay(forecastDay.time)}</div>

          <div class="col-4"> <img
          src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
            forecastDay.condition.icon
          }.png"
          alt=""
         width="44"
        /></div>
          <div class="col-2">${Math.round(
            forecastDay.temperature.maximum
          )}℃</div></div>
          <hr />`;
    }
  });
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "3ea9t1312bbo2ff30fa1b499f43ab01f";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function showTemperature(response) {
  let celsiusTemperature = response.data.temperature.current;
  let temperature = Math.round(celsiusTemperature);
  let p = document.querySelector("p");
  p.innerHTML = `${temperature}`;
  document.querySelector(
    "h1"
  ).innerHTML = `<i class="fa-sharp fa-solid fa-location-dot"></i> ${response.data.city}`;
  let weatherAppDescription = response.data.condition.description;
  let description = document.querySelector("#description");
  description.innerHTML = `${weatherAppDescription}`;

  let wind = response.data.wind.speed;
  let windSpeed = Math.round(wind * 2.24);
  let details = document.querySelector("#wind");
  details.innerHTML = `Wind: ${windSpeed} mph`;

  let humidity = response.data.temperature.humidity;
  let rain = document.querySelector("#rain");
  rain.innerHTML = ` | Humidity: ${humidity}%`;
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
    );

  getForecast(response.data.coordinates);
}

function button(event) {
  event.preventDefault();
  let apiKey = "3ea9t1312bbo2ff30fa1b499f43ab01f";
  let city = document.querySelector("#search-text-input").value;
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

let searchButton = document.querySelector("#submit");

searchButton.addEventListener("click", button);

function searchCity(city) {
  let units = "metric";
  let apiKey = "3ea9t1312bbo2ff30fa1b499f43ab01f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function showPosition(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
  let apiKey = "3ea9t1312bbo2ff30fa1b499f43ab01f";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showCurrentTemp);
}

function showCurrentTemp(response) {
  let temperature = Math.round(response.data.temperature.current);
  let p = document.querySelector("p");
  p.innerHTML = `${temperature}`;
  document.querySelector(
    "h1"
  ).innerHTML = `<i class="fa-sharp fa-solid fa-location-dot"></i> ${response.data.city}`;

  let weatherAppDescription = response.data.condition.description;
  let description = document.querySelector("#description");
  description.innerHTML = `${weatherAppDescription}`;

  let wind = response.data.wind.speed;
  let windSpeed = Math.round(wind * 2.24);
  let details = document.querySelector("#wind");
  details.innerHTML = `Wind: ${windSpeed} mph`;

  let humidity = response.data.temperature.humidity;
  let rain = document.querySelector("#rain");
  rain.innerHTML = ` | Humidity: ${humidity}%`;

  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
    );
}

function showCurrentWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentButton = document.querySelector("#current");
currentButton.addEventListener("click", showCurrentWeather);

searchCity("London");
