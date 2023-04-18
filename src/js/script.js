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

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let p = document.querySelector("p");
  p.innerHTML = `${temperature}℃`;
  document.querySelector(
    "h1"
  ).innerHTML = `<i class="fa-sharp fa-solid fa-location-dot"></i> ${response.data.name}`;
  let weatherAppDescription = response.data.weather[0].description;
  let description = document.querySelector("#description");
  description.innerHTML = `${weatherAppDescription}`;

  let wind = response.data.wind.speed;
  let windSpeed = Math.round(wind * 2.24);
  let details = document.querySelector("#wind");
  details.innerHTML = `Wind: ${windSpeed} mph`;

  let humidity = response.data.main.humidity;
  let rain = document.querySelector("#rain");
  rain.innerHTML = ` | Humidity: ${humidity}%`;
}

function button(event) {
  event.preventDefault();
  let apiKey = "502dc8f7ae36e57af1974e18d16a86f8";
  let city = document.querySelector("#search-text-input").value;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

let searchButton = document.querySelector("#submit");

searchButton.addEventListener("click", button);

function searchCity(city) {
  let apiKey = "502dc8f7ae36e57af1974e18d16a86f8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function showPosition(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
  let apiKey = "502dc8f7ae36e57af1974e18d16a86f8";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showCurrentTemp);
}

function showCurrentTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let p = document.querySelector("p");
  p.innerHTML = `${temperature}℃`;
  document.querySelector(
    "h1"
  ).innerHTML = `<i class="fa-sharp fa-solid fa-location-dot"></i> ${response.data.name}`;

  let weatherAppDescription = response.data.weather[0].description;
  let description = document.querySelector("#description");
  description.innerHTML = `${weatherAppDescription}`;

  let wind = response.data.wind.speed;
  let windSpeed = Math.round(wind * 2.24);
  let details = document.querySelector("#wind");
  details.innerHTML = `Wind: ${windSpeed} mph`;

  let humidity = response.data.main.humidity;
  let rain = document.querySelector("#rain");
  rain.innerHTML = ` | Humidity: ${humidity}%`;
}

function showCurrentWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let currentButton = document.querySelector("#current");
currentButton.addEventListener("click", showCurrentWeather);

searchCity("London");
