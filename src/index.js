var ctx = document.getElementById("myChart");

var temperatures = [12, 14, 15, 17, 16, 14];
var hourlyTemperature = ["12°C", "14°C", "15°C", "17°C", "16°C", "14°C"];

var myChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: hourlyTemperature,
    datasets: [
      {
        label: "Hourly forecast",
        data: temperatures,
        backgroundColor: ["rgba(255, 167, 38, 0.2)"],
        borderColor: ["rgba(255, 167, 38, 1)"],
        borderWidth: 2,
        fill: false
      }
    ]
  },

  options: {
    legend: {
      display: false
    },

    scales: {
      yAxes: [
        {
          display: false
        }
      ],
      xAxes: [
        {
          display: false
        }
      ]
    },

    maintainAspectRatio: false
  }
});

function showTempCurrentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let key = "fa27ddae4afd9c1650df98c1c1153f7f";
  let apiEndpoint = "api.openweathermap.org/data/2.5/weather";
  let unit = "metric";
  let apiUrl = `https://${apiEndpoint}?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${key}`;
  axios.get(apiUrl).then(displayTemperature);
}

function retrieveCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showTempCurrentLocation);
}

function showCelsius() {
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = 12;
}

function showFahrenheit() {
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = Math.round((12 * 9) / 5 + 32);
}

function displayTemperature(response) {
  let temperature = document.querySelector("#current-temperature");
  let minTemp = document.querySelector("#min-temp");
  let maxTemp = document.querySelector("#max-temp");
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind-speed");
  let mainCity = document.querySelector("#searched-city");  
  let weatherIcon = document.querySelector("#current-weather-icon");
  let roundedTemp = Math.round(response.data.main.temp);
  let minimum = Math.round(response.data.main.temp_min);
  let maximum = Math.round(response.data.main.temp_max);
  let humidityLevel = response.data.main.humidity;
  let speed = Number(response.data.wind.speed);
  let wind = Math.round(speed * 3.6);
  let city = response.data.name;
  let currentIcon = response.data.weather[0].icon;
  let description = response.data.weather[0].description;
  temperature.innerHTML = roundedTemp;
  minTemp.innerHTML = minimum;
  maxTemp.innerHTML = maximum;
  humidity.innerHTML = humidityLevel;
  windSpeed.innerHTML = wind;
  mainCity.innerHTML = city;
  weatherIcon.setAttribute("src", `http://openweathermap.org/img/wn/${currentIcon}@2x.png`);
 weatherIcon.setAttribute("alt", `${description}`);

}

function searchCity(city) {
  if (city) {
    let key = "fa27ddae4afd9c1650df98c1c1153f7f";
    let apiEndpoint = "api.openweathermap.org/data/2.5/weather";
    let unit = "metric";
    let apiUrl = `https://${apiEndpoint}?q=${city}&units=${unit}&appid=${key}`;
    axios.get(apiUrl).then(displayTemperature);
  } else {
    alert("Please type a city");
  }
}

function handleSubmit(event) {
  let search = document.querySelector("#city-search-bar");
  let city = search.value;
  searchCity(city);
}

function validate(key) {
  if (key.keyCode === 13) {
    handleSubmit();
  }
}

let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tueday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let currentDay = days[now.getDay()];

let currentDate = now.getDate();

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
  "December"
];
let currentMonth = months[now.getMonth()];

let currentYear = now.getFullYear();

let currentHour = now.getHours();
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let today = document.querySelector("#today-date");
today.innerHTML = `${currentDay}, ${currentDate} ${currentMonth} ${currentYear}`;

let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = `${currentHour}:${minutes}`;

let search = document.querySelector("#city-search-bar");

search.addEventListener("keyup", validate);

let celsius = document.querySelector("#celsius");

celsius.addEventListener("click", showCelsius);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", showFahrenheit);

let currentLocation = document.querySelector("#current-location-button");

currentLocation.addEventListener("click", retrieveCurrentLocation);

searchCity("Amsterdam");