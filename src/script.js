//current date
let currentTime = new Date();
let dateNow = document.querySelector("#current-date");
let timeNow = document.querySelector("#current-time");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[currentTime.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "Desember",
];
let month = months[currentTime.getMonth()];

let hour = currentTime.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}

let minute = currentTime.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}

let date = currentTime.getDate();
dateNow.innerHTML = `${day}, ${date} ${month}`;
timeNow.innerHTML = ` ⏰ ${hour}:${minute}`;

// temperature and geoposition

function showTemperature(response) {
  let currentTemperature = document.querySelector("#current-temperature");
  let currentDescription = document.querySelector("#description");
  let currentHumidity = document.querySelector("#humidity");
  let currentSpeed = document.querySelector("#wind");
  let desiredCity = document.querySelector("#desired-city");
  let iconWeather = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  cityName = response.data.name;
  humidity = response.data.main.humidity;
  speed = response.data.wind.speed;
  description = response.data.weather[0].description;

  currentTemperature.innerHTML = Math.round(celsiusTemperature);
  currentHumidity.innerHTML = humidity;
  currentSpeed.innerHTML = speed;
  currentDescription.innerHTML = description;
  desiredCity.innerHTML = cityName;
  iconWeather.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconWeather.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "1bc31ae99edca4b6ba3766063c71acb9";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

function searchSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  search(cityInput.value);
}

function geoPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "1bc31ae99edca4b6ba3766063c71acb9";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

function getCurPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(geoPosition);
}

let currentCityButton = document.querySelector("button");
currentCityButton.addEventListener("click", getCurPosition);

// C/F

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#current-temperature");

  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  currentTemperature.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-temperature");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-temperature");
fahrenheitLink.addEventListener("click", displayCelsiusTemperature);

search("Dnipro");
