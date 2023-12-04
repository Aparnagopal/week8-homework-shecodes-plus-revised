function getForecast(city) {
  let apiKey = "201754e4b18f8a33bt8cf15a0f7c5oa4";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}
function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${formatDay(day.time)}</div>

        <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature">
            <strong>${Math.round(day.temperature.maximum)}º</strong>
          </div>
          <div class="weather-forecast-temperature">${Math.round(
            day.temperature.minimum,
          )}º</div>
        </div>
      </div>
    `;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

function refreshWeather(response) {
  let weatherDiv = document.querySelector("#weather");
  let temperature = Math.round(response.data.temperature.current);
  let tempform = document.querySelector("#currtemp");
  tempform.innerHTML = temperature + " °C";
  getForecast(response.data.city);
}
function signUp(event) {
  event.preventDefault();
  let input = document.querySelector("#search-city");

  let cityform = document.querySelector("#cityval");

  cityform.innerHTML = input.value;

  let city = input.value;

  let apiKey = "201754e4b18f8a33bt8cf15a0f7c5oa4";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

let form = document.querySelector("form");
form.addEventListener("submit", signUp);
